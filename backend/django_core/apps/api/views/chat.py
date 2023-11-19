from django.db.models import OuterRef, Subquery, Q

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.api.serializers import ChatMessageSerializer
from apps.user.models import CustomUser
from apps.chat.models import ChatMessage


class InboxView(generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs.get("pk")
        messages = ChatMessage.objects.filter(
            id__in=Subquery(
                CustomUser.objects.filter(
                    Q(sender__reciever=user_id) | Q(reciever__sender=user_id)
                )
                .distinct()
                .annotate(
                    last_msg=Subquery(
                        ChatMessage.objects.filter(
                            Q(sender=OuterRef("id"), reciever=user_id)
                            | Q(reciever=OuterRef("id"), sender=user_id)
                        )
                        .order_by("-id")[:1]
                        .values_list("id", flat=True)
                    )
                )
                .values_list("last_msg", flat=True)
                .order_by("-id")
            )
        ).order_by("-id")
        return messages


class MessagesView(generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        sender_id = self.kwargs["sender_id"]
        reciever_id = self.kwargs["reciever_id"]

        messages = ChatMessage.objects.filter(
            sender__in=[sender_id, reciever_id], reciever__in=[sender_id, reciever_id]
        )
        return messages
