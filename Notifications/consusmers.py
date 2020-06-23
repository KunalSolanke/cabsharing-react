import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Notification
from Humrahi.models import User
from django.db.models import Q
from user.models import Booked_rides,Bookings 







#Todo change backend for multiple users sharing ride 

class NoteConsumer(WebsocketConsumer) :

    def fetch_notifications(self,data):
        user = User.objects.filter(username=data['username'])
        notifications = Notification.objects.filter(To__in = user
        ).order_by('-publish_time')[:20]

        print(data['username'])
        print(notifications)

      
        context ={
            'command': 'notifications',
            'notifications' : self.messages_to_json(notifications)
        }
        self.send_message(context)
      
    

    def new_notification(self,data) :
        print(data['notification'])
        



         #Todo this is for multiple users in the ride 


            # else :
            #     ride=Booked_rides.objects.create(is_complete=False)
            #     ride.bookings.add(bokings1)
            #     to_user = User.objects.get(username=data['to'])
            #     rides.bookings.add(bookings2)
            #     ride.users.add(author_user,to_user)
            #     ride.save()



        author_user = User.objects.get(username = data['from'])
        notification = Notification.objects.create(From=author_user
        ,notification =data['notification'],notification_type = data['type'])


        if data['type'] == 'confirm':
            print(data)
            if Booked_rides.objects.filter(pk=data['booktoid']).exists() :
                 try:
                    ride=Booked_rides.objects.get(pk=data['booktoid'])
                    to=ride.users 
                    u=User.objects.get(username=data['to'])
                    ride.users.add(u)
                    book=Bookings.objects.get(pk=data['bookfromid'])
                    ride.bookings.add(book)
                    notification.To.add(to)
                    notification.save()
                    ride.total+=1
                    if ride.total==4 :
                       ride.is_complete=True ;
                    ride.save()
                 except:
                     return 
            else :
                to_user = User.objects.get(username=data['to'])
                bookings1= Bookings.objects.get(pk =  data['bookfromid'])
                bookings2= Bookings.objects.get(pk =  data['booktoid'])
                ride =Booked_rides.objects.create(is_complete=False)
                ride.users.add(to_user)
                ride.users.add(author_user)
                ride.bookings.add(bookings1)
                ride.bookings.add(bookings2)
                ride.total=2 
                if ride.total==4:
                    ride.is_complete=True

                ride.save()
                bookfrom = Bookings.objects.get(pk = data['bookfromid'])
                bookfrom.is_booked= True
                bookfrom.save()
                bookto= Bookings.objects.get(pk = data['booktoid'])
                bookto.is_booked= True
                bookto.save() 
                notification.To.set(ride.users.all().exclude(username=data['from']))
                notification.save()
        else :
                if Booked_rides.objects.filter(pk=data['booktoid']).exists():
                    ride=Booked_rides.objects.get(pk=data['booktoid'])
                    to=ride.users 
                    for u in ride.users.all() :
                        notification.To.add(u)
                    notification.save()

                else :
                    print(data['to'])
                    to_user = User.objects.get(username=data['to'])
            
                    notification.To.add(to_user)
                    notification.save()

            


        data_send = self.message_to_json(notification)
        data_send.update({
            'bookfromid':data['bookfromid'],
            'booktoid' : data['booktoid']})
      
        content={
            'command':'new_notification',
            
            'notification':data_send
        }

        
        

        return self.send_chat_message(content)
        

    def messages_to_json(self,notifications) :
        result = []
        for  notification in notifications :
            result.append(self.message_to_json(notification))
        return result
    

    def message_to_json(self,notification):
        sendingto=[]
        print(notification.To.all())
        for user in notification.To.all():
            
            sendingto.append(user.username)
        print(sendingto)
        return {
            'id':notification.id,
            'to':sendingto,
            'author':notification.From.username ,
            'content':notification.notification,
            'timestamp':str(notification.timestamp),
            'type':notification.notification_type
        }

    commands ={
            'fetch_notifications': fetch_notifications,
            'new_notification'  : new_notification
    }


    def connect(self):
        self.room_name = 'IITG'
        self.room_group_name = 'notfs_%s' % self.room_name

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
   
 
    def receive(self, text_data):
        data = json.loads(text_data)
        
        self.commands[data['command']](self,data)



    def send_chat_message(self,notification) :
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_notification',
                'notification': notification
            }
        )
      

    def send_message(self,context) :  
         self.send(text_data=json.dumps(context
        ))


    # Receive message from room group
    def chat_notification(self, event):
      
        notification = event['notification']

      
        self.send(text_data=json.dumps({
            'message':notification
        }
        ))