
"""
Django settings for _main project.

Generated by 'django-admin startproject' using Django 1.11.7.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os
import dj_database_url
from decouple import config
import django_heroku


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG',default=False)

ALLOWED_HOSTS = ['humraahi-iitg.herokuapp.com' ,'127.0.0.1','http://127.0.0.1:8000','0.0.0.0','localhost','ec2-54-175-117-212.compute-1.amazonaws.com','*.example.com','192.168.43.132']

# 640857218379-3qjvelmqgnpvd8k4k868s66mtrrbr2u8.apps.googleusercontent.com


# Application definition

INSTALLED_APPS = [
    'channels',
    'django_heroku',
    'channels_redis' ,
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',


     'Humrahi',
     'user',
     'chatService',
     'Notifications',
    
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken', 
    'social_django',
    'rest_social_auth',

    'oauth2_provider', 





    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'rest_auth.registration',
    'allauth.socialaccount',


    'whitenoise.runserver_nostatic'
    # 'rest_framework_social_oauth2',
    

   
]

#keys
# print(config('SECRET_KEY'))
SOCIAL_AUTH_RAISE_EXCEPTIONS = True

SOCIAL_AUTH_GITHUB_KEY=config('GITHUB_KEY')
SOCIAL_AUTH_GITHUB_SECRET=config('GITHUB_SECRET')
SOCIAL_AUTH_FACEBOOK_KEY=config('FACEBOOK_KEY')
SOCIAL_AUTH_FACEBOOK_SECRET=config('FACEBOOK_SECRET')
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY =config('GOOGLE_KEY')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET=config('GOOGLE_SECRET')


SOCIAL_AUTH_URL_NAMESPACE = '/'


#cors

CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE=False
# CSRF_COOKIE_HTTPONLY=False
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = False
DRFSO2_URL_NAMESPACE = 'social'
SOCIAL_AUTH_REDIRECT_IS_HTTPS= True
CORS_REPLACE_HTTPS_REFERER=True
CSRF_TRUSTED_ORIGINS=[
    'http://localhost:8000',
    'http://localhost:3000',
    '192.168.43.132',
    'humraahi-iitg.herokuapp.com'
]


AUTHENTICATION_BACKENDS = (
    'social_core.backends.facebook.FacebookOAuth2',
    'social_core.backends.google.GoogleOAuth2',
   
    'django.contrib.auth.backends.ModelBackend',

    'social_core.backends.github.GithubOAuth2',
    'social_core.backends.twitter.TwitterOAuth',
    'social_core.backends.open_id.OpenIdAuth',
    'social_core.backends.google.GoogleOpenId',
    # 'allauth.account.auth_backends.AutheticationBackend'
  
)

MIDDLEWARE = [
     
     'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'corsheaders.middleware.CorsPostCsrfMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
    
   
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'Cabsharing.urls'



# template serttings

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',


            ],
        },
    },
]


# this is wsgi application for our main appservice 

WSGI_APPLICATION = 'Cabsharing.wsgi.application'



# mysite/settings.py
# Channels
ASGI_APPLICATION = 'Cabsharing.routing.application'
CHANNEL_LAYERS = {
    'default': {

        # the chat messages will stored in the redis server 
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
               #localhost,port
        },
    },
}
REDIS_HOST = 'localhost'
REDIS_PORT = 6379





SITE_ID = 1
ACCOUNT_AUTHENTICATION_METHOD ='username'
ACCOUNT_EMAIL_REQUIRED =False
ACCOUNT_USERNAME_REQUIRED =True
ACCOUNT_EMAIL_VERIFICATION = 'none'
LOGIN_REDIRECT_URL='/users'



EMAIL_HOST='smtp.gmail.com'
EMAIL_HOST_USER=config('EMAIL')
EMAIL_HOST_PASSWORD=config("EMAIL_PASSWORD")
EMAIL_PORT=config("EMAIL_PORT")
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=config("EMAIL")
SERVER_EMAIL=config("EMAIL")



# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases


# setting my backend as postgres

DATABASES={
     'default': dj_database_url.config(
        default=config('DATABASE_URL')
    )
}
# DATABASES = {
#      'default': {
#         #'ENGINE': 'django.db.backends.sqlite3',
#         #'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#         'ENGINE': 'django.db.backends.postgresql',
#         # 'NAME': 'd5694qn4pfsgnb',
#         'NAME':'cabsharing',
#         # 'USER' : 'pkozjzangfvkux' ,
#         'USER':'postgres',
#         # 'PASSWORD': '95932083794db167040e65833aca9d7a96eefe691df7e330d649f483d49749bd' ,
#         'PASSWORD':'1234',
        
#         # 'TEST': {
#         #     'NAME': 'chattests'
#         # },
#         # 'HOST':'ec2-54-175-117-212.compute-1.amazonaws.com'
#         'HOST':'localhost'
#     }
# }



# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

 




# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators




# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_L10N = True

USE_TZ = True

django_heroku.settings(locals())
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

AUTH_USER_MODEL='Humrahi.User'
STATIC_URL = '/static/'
STATICFILES_DIRS=[
    os.path.join(BASE_DIR,'build/static')
]
STATIC_ROOT =os.path.join(BASE_DIR,'assets')
#MEDIA  FILES 
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


MEDIA_URL = '/media/'
MEDIA_ROOT =os.path.join(BASE_DIR,'media')



REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
    #     # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
        'rest_framework.permissions.IsAuthenticated'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES' : (
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework.authentication.TokenAuthentication',
         'rest_framework.authentication.SessionAuthentication',
         'rest_framework.authentication.BasicAuthentication'
        #  'rest_framework_social_oauth2.authentication.SocialAuthentication '
    ),
    'DEFAULT_PARSER_CLASSES': (
    'rest_framework.parsers.JSONParser',
    'rest_framework.parsers.FormParser',
    'rest_framework.parsers.MultiPartParser',
),
}

REST_AUTH_SERIALIZERS={
    "USER_DETAILS_SERIALIZER":'user.userapi.serializers.UserDetailserializer'
}
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
LOGOUT_ON_PASSWORD_CHANGE=False






