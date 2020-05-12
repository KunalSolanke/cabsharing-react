from rest_framework import viewsets
from chatService.models import Contact,Chats,Messages
from .serializers import ChatSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication,BasicAuthentication,SessionAuthentication
from django.shortcuts import get_object_or_404
from django.conf import settings
from Humrahi.models import User

# User = settings.AUTH_USER_MODEL

def get_user_contact(username):
    user = get_object_or_404(User,username = username)
    Contacts = get_object_or_404(Contact,user=user)

    return Contacts


class ChatView(viewsets.ModelViewSet) :
    authentication_classes = [BasicAuthentication,SessionAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class= ChatSerializer
    

    def get_queryset(self) :
        username = self.kwargs['username']
        # username = self.request.query_params.get('username',None)
       
        contact = get_user_contact(username)
        queryset= contact.chats.all() 
       
        return queryset