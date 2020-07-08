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
        #print("hi")
        for username in participants :
            contact = get_user_contact(username)
           # print(contact)
            chat.participants.add(contact)

        chat.save()

        return chat

    def update(self,instance,validated_data) :
        participants = validated_data.pop('participants') 
        # print(participants)
        for p in instance.participants.all() :
            if p.user.username in participants :
                continue 
            else :
                instance.participants.remove(p)
        # print(instance.participants.all())
        instance.save()
        return instance




class MessagesSerializer(ModelSerializer) :
    class Meta : 
        model =  Messages
        fields =("__all__")