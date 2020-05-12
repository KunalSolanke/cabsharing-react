# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from chatService.models import Messages
from django.conf import settings
from .views import get_last_10_messages,get_user_contact,get_curent_chat
# from user.models import Message


#User=settings.AUTH_USER_MODEL

class ChatConsumer(WebsocketConsumer):




    def fetch_messages(self,data):
        messages=get_last_10_messages(data['chatId'])
        context ={
            'command': 'messages',
            'messages' : self.messages_to_json(messages)
        }
        self.send_message(context)
      
    







    def new_messages(self,data) :
        
        user_contact = get_user_contact(data['from'])
        
        # author_user=User.objects.filter(username=contact)[0]
        message = Messages.objects.create(contact=user_contact,content=data['message'])
       
        content={
            'command':'new_message',
            'message':self.message_to_json(message)
        }
        current_chat = get_curent_chat(data['chatId'])
        current_chat.messages.add(message)
        current_chat.save()
         
        # print(data['message'])

        return self.send_chat_message(content)
        


    def messages_to_json(self,messages) :
        result = []
        for  message in messages :
            result.append(self.message_to_json(message))
        return result
    

    def message_to_json(self,message):
        return {
            'id':message.id,
            'author':message.contact.user.username,
            'content':message.content,
            'timestamp':str(message.timestamp)
        }

    commands ={
            'fetch_messages': fetch_messages,
            'new_message'  : new_messages
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
            # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
    # Receive message from WebSocket
    
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self,data)


    def send_chat_message(self,message) :
     
        #message =data_json['message']

        # Send message to room group
      
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )
        print(self.room_group_name)
        # async_to_sync(self.channel_layer.group_send( self.room_group_name,{
        #     'message':message['message']
        # }
        # ))
        # print(async_to_sync(self.channel_layer.group_receive( self.room_group_name)
            
        # ))

        # async_to_sync(self.send(text_data=json.dumps({
        #     'message':message
        # })))

        
       
    

        # print("sent")

    def send_message(self,context) :
       
         self.send(text_data=json.dumps(context
        ))


    # Receive message from room group
    def chat_message(self, event):
        # print('on chat.message worked')
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message':message
        }
        ))