from rest_framework.routers import DefaultRouter
from .views import ChatView
from django.urls import path,re_path,include
from django.conf.urls import url
router = DefaultRouter()
router.register(r'(?P<username>.+)/chats',ChatView,basename='chats')
urlpatterns = [url('',include(router.urls))]