"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 4.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

import os
from pathlib import Path

import django_stubs_ext

# https://github.com/wemake-services/wemake-django-template/blob/5bf1569e2710e11befc6991893f94419136d74bd/%7B%7Bcookiecutter.project_name%7D%7D/server/settings/__init__.py#L14-L19
django_stubs_ext.monkeypatch()


from dotenv import load_dotenv

# Load env variables
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True if os.getenv("DEBUG") == "on" else False

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]


# Application definition

INSTALLED_APPS = [
    # Django websockets
    "daphne",
    # Django apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # 3rd party django apps
    "django_cleanup.apps.CleanupConfig",
    # Django rest
    "rest_framework",
    # CORS
    "corsheaders",
    # Custom apps
    "apps.user",
    "apps.chat",
    # Cloud storage
    "cloudinary_storage",
    "cloudinary",
]

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
    ),
}

MIDDLEWARE = [
    # CORS
    "corsheaders.middleware.CorsMiddleware",
    # Django
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("POSTGRES_NAME"),
        "USER": os.getenv("POSTGRES_USER"),
        "PASSWORD": os.getenv("POSTGRES_PASSWORD"),
        "HOST": os.getenv("POSTGRES_HOST"),
        "PORT": os.getenv("POSTGRES_PORT"),
    }
}

# Channel Layers
# https://channels.readthedocs.io/en/latest/topics/channel_layers.html#redis-channel-layer

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],
        },
    },
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"

# Media files ( Images, Videos )
# https://docs.djangoproject.com/en/4.2/howto/static-files/#serving-uploaded-files-in-development

MEDIA_URL = "/media/"
MEDIA_ROOT = Path(BASE_DIR, "media")
# Cloud Storage
DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Custom user model
# https://docs.djangoproject.com/en/5.0/ref/settings/#std-setting-AUTHENTICATION_BACKENDS

AUTH_USER_MODEL = "user.CustomUser"
AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "apps.user.backends.PasswordlessAuthBackend",
]

# Session-cookie Auth
# https://testdriven.io/blog/django-spa-auth/#backend_3

CSRF_COOKIE_SAMESITE = "Lax"
SESSION_COOKIE_SAMESITE = "Lax"
CSRF_COOKIE_HTTPONLY = True
SESSION_COOKIE_HTTPONLY = True
CSRF_TRUSTED_ORIGINS = [
    "http://127.0.0.1:3000",
]

# PROD ONLY
# CSRF_COOKIE_SECURE = True
# SESSION_COOKIE_SECURE = True

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:3000",
]
CORS_EXPOSE_HEADERS = ["Content-Type", "X-CSRFToken"]
CORS_ALLOW_CREDENTIALS = True

# EMAIL Config

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")

# https://channels.readthedocs.io/en/latest/tutorial/part_1.html
# Daphne Config

ASGI_APPLICATION = "core.asgi.application"

# Cloud Storage
# https://dev.to/successhycenth/uploading-images-to-cloudinary-storage-from-a-django-drf-application-c40

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": os.getenv("CLOUDINARY_NAME"),
    "API_KEY": os.getenv("CLOUDINARY_NAME_API_KEY"),
    "API_SECRET": os.getenv("CLOUDINARY_NAME_API_SECRET"),
}
