import json

from django.http import HttpRequest, JsonResponse
from django.contrib.auth import login
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.middleware.csrf import get_token
from rest_framework import status

from apps.api.serializers import RegisterSerializer
from apps.user.models import CustomUser
from apps.user.utils import generate_otp, send_otp


@ensure_csrf_cookie
def csrf_view(request):
    response = JsonResponse({"detail": "CSRF cookie set!"})
    response["X-CSRFToken"] = get_token(request)
    return response

def check_session(request):
    if request.user.is_authenticated:
        return JsonResponse({"isAuthenticated": True})
    return JsonResponse({"isAuthenticated": False})

@require_POST
def verify_email_view(request: HttpRequest):
    data = json.loads(request.body)
    email = data.get("email")

    if not email:
        raise ValueError("Email is required")

    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        user = CustomUser.objects.create(email=email)
        user.set_unusable_password()
    
    otp = generate_otp()
    user.otp = otp
    user.save()

    send_otp(email, otp)
    return JsonResponse({ "detail": "OTP has been send to your email"}, status=status.HTTP_200_OK)

@require_POST
def verify_otp_view(request: HttpRequest):
    data = json.loads(request.body)
    email = data.get("email")
    otp = data.get("otp")

    try:
        user = CustomUser.objects.get(email=email, otp=otp)
    except CustomUser.DoesNotExist:
        return JsonResponse({ "detail": "Invalid OTP!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return JsonResponse({ "detail": "OTP verification complete!" }, status=status.HTTP_200_OK)

@require_POST
def complete_verification_view(request: HttpRequest):
    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    try:
        user = CustomUser.objects.get(email=email)
        if user.has_usable_password():
            if user.check_password(password):
                login(request, user)
                return JsonResponse({ "detail": "Password match!" }, status=status.HTTP_200_OK)
            else:
                return JsonResponse({ "detail": "Password doesn't match" }, status=status.HTTP_400_BAD_REQUEST)
        else:
            user.set_password(password)
            login(request, user)
            return JsonResponse({ "detail": "Password set!" }, status=status.HTTP_200_OK)
    except:
        return JsonResponse({ "detail": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)