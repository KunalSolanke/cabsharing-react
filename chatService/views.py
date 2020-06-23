
# chat/views.py
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils.safestring import mark_safe 
import json
from django.shortcuts import get_object_or_404
from .models import Chats,Contact
from Humrahi.models import User
# from django.shortcuts import get_object_or_404



def get_curent_chat(chatId):
    return get_object_or_404(Chats,id=chatId)



def get_user_contact(username) : 
    user = get_object_or_404(User,username=username)
    contact,_=Contact.objects.get_or_create(user=user)
    return contact


def get_last_10_messages(chatId):
    
    chat = get_object_or_404(Chats,id=chatId)
    return chat.messages.order_by('-timestamp')[:10]

def indexchat(request):
    return render(request, 'chatService/chat.html')
# Create your views here.


@login_required
def room(request, room_name):
    return render(request, 'chatService/room.html', {
        'room_name':mark_safe(json.dumps(room_name)),
        'username' : mark_safe(json.dumps(request.user.username))
    })