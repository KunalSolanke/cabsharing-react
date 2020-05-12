from django.urls import path

from . import views
app_name = "chatSevice"
urlpatterns = [
    path('', views.indexchat, name='indexchat'),
    path('<str:room_name>/', views.room, name='room'),
]