from rest_framework.serializers import ModelSerializer ,StringRelatedField


from chatService.models import Messages,Contact,Chats
from chatService.views import get_user_contact


class ContactSerializer(StringRelatedField) :
    def to_internal_value(self,value) :
        return value


class ChatSerializer(ModelSerializer) :
    participants = ContactSerializer(many=True)
    class Meta:
        model = Chats
        fields = ('id','messages','participants')


    def create(self,validated_data):
        participants = validated_data.pop('participants')
        chat= Chats()
        chat.save()
        for username in participants :
            contact = get_user_contact(username)
            chat.participants.add(contact)

        chat.save()

        return chat



class MessagesSerializer(ModelSerializer) :
    class Meta : 
        model =  Messages
        fields =("__all__")