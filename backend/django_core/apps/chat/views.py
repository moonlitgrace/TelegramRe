from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework import mixins, generics, status
from rest_framework.response import Response
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .models import ChatRoom
from ..user.models import OnlineUser
from .serializers import ChatRoomSerializer, ChatMessageSerializer, OnlineUserSerializer


# Create your views here.
class ChatRoomListView(ListAPIView):
    serializer_class = ChatRoomSerializer
    model = ChatRoom

    def get_queryset(self):
        user = self.request.user
        chat_rooms = self.model.objects.filter(
            members=user, chat_message__isnull=False
        ).distinct()
        return chat_rooms


class ChatMessageView(mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = ChatMessageSerializer

    def get(self, request, *args, **kwargs):
        try:
            room_id = self.kwargs["room_id"]
            chat_room = ChatRoom.objects.get(id=room_id)
            chat_messages = chat_room.chat_message.all().order_by("created_at")

            serialize_chat_room = ChatRoomSerializer(chat_room, many=False)
            serialize_chat_messages = ChatMessageSerializer(chat_messages, many=True)

            return Response(
                data={
                    "chat_room": serialize_chat_room.data,
                    "chat_messages": serialize_chat_messages.data,
                }
            )
        except ChatRoom.DoesNotExist:
            return Response(
                data={"detail": "ChatRoom not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def post(self, request, *args, **kwargs):
        response = self.create(request, *args, **kwargs)
        """
        201 status code means: request successfully create resources in server
        if response is 201:
            get created message details and send socket message to that room
        """
        if response.status_code == 201:
            channel_layer = get_channel_layer()
            new_message = response.data
            room = ChatRoom.objects.get(pk=new_message["room"])

            async_to_sync(channel_layer.group_send)(
                room.id,
                {
                    "type": "send_message",
                    "message": {
                        "action": "message",
                        "message": new_message,
                    },
                },
            )

        return response


# TODO: add socket support to this as well
class ReadRoomChatMessages(APIView):
    def get(self, request, *args, **kwargs):
        room_id = self.kwargs["room_id"]
        chat_room = ChatRoom.objects.get(id=room_id)
        unread_messages = chat_room.chat_message.filter(is_read=False)
        for message in unread_messages:
            message.is_read = True
            message.save()
        return Response({"detail": "Messages Readed"})


class OnlineUsersView(ListAPIView):
    queryset = OnlineUser.objects.all()
    serializer_class = OnlineUserSerializer
