import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Notification
from Humrahi.models import User
from django.db.models import Q
from user.models import Booked_rides,Bookings 
from .models import ConnectionHistory
from django.utils import timezone
from chatService.views import get_user_contact
from user.models import Profile
# from channels.db import database_sync_to_async



#Todo change backend for multiple users sharing ride 

class NoteConsumer(WebsocketConsumer) :
    # @database_sync_to_async
    def fetch_notifications(self,data):
        user = User.objects.get(username=data['username'])
        # print(user)
        if 'id' in data.keys():
            notification=Notification.objects.get(pk=data['id'])
            notification.read_by.add(user)
        notifications = Notification.objects.filter(To= user
        ).exclude(read_by=user).order_by('-publish_time')[:10]

        # print(data['username'])
        print(notifications)

      
        context ={
            'command': 'notifications',
            'notifications' : self.messages_to_json(notifications)
        }
        
        self.send_message(context)
      
    
    # @database_sync_to_async
    
    def new_notification(self,data) :
        # print(data['notification'])
        



         



        author_user = User.objects.get(username = data['from'])
        notification = Notification.objects.create(From=author_user
        ,notification =data['notification'],notification_type = data['type'])


        if data['type'] == 'confirm':
            # print(data)
            if data['typeb'] =='group':
                 try:
                    ride=Booked_rides.objects.get(pk=data['booktoid'])
                    to=ride.users.all()
                    u=User.objects.get(username=data['to'])
                    ride.users.add(u)
                    book=Bookings.objects.get(pk=data['bookfromid'])
                    notification.bookfromid=data['bookfromid']
                    notification.booktoid=data['booktoid']
                    if book not in ride.bookings.all() and book.is_booked == False and ride.total+book.no_friends<=3:
                                ride.bookings.add(book)
                                book.is_booked=True
                                ride.users.remove(author_user)
                                notification.To.set(ride.users.all())
                                ride.users.add(author_user)
                                notification.save()
                                ride.total+=1+book.no_friends
                                if ride.total==4 :
                                     ride.is_complete=True
                                book.save() 
                                ride.save()
                    else :
                        notification.To.add(author_user)
                        notification.notification = "This bookings is already created or ended"
                        notification.save()
                 except:
                    print('errr')
                    notification.To.add(author_user)
                    notification.notification = "There was error in creating booking maybe caused by network error or That booking is already completed"
                    notification.save()
                     
            elif data['typeb']=='individual' :
                try :
                        to_user = User.objects.get(username=data['to'])
                        bookings1= Bookings.objects.get(pk =  data['bookfromid'])
                        bookings2= Bookings.objects.get(pk =  data['booktoid'])
                        if not bookings1.is_booked  or not bookings2.is_booked :
                                    bookings1.is_booked=True
                                    bookings2.is_booked=True
                                    bookings1.save()
                                    bookings2.save()
                                    ride =Booked_rides.objects.create(is_complete=False)
                                    ride.users.add(to_user)
                                    ride.users.add(author_user)
                                    ride.bookings.add(bookings1)
                                    ride.bookings.add(bookings2)
                                
                                    ride.total=bookings1.no_friends+bookings2.no_friends+2
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
                                    notification.bookformid=data['bookfromid']
                                    notification.booktoid=data['booktoid']
                                    notification.save()
                        else :
                                notification.To.add(author_user)
                                notification.bookfromid =data['bookfromid']
                                notification.booktoid=data['booktoid']
                                notification.notification = "This booking can not be made .Either your or the other person's booking is done."
                                notification.save()
                        
                except :
                    notification.To.add(author_user)
                    notification.notification = "There was error in creating booking maybe caused by network error or That booking is already completed"
                    notification.save()
            elif data['typeb']=='gtg' :
                try :
                    ride1=Booked_rides.objects.get(pk=data['bookfromid'])
                    ride2=Booked_rides.objects.get(pk=data['booktoid'])

                    if not( ride1.is_complete or ride2.is_complete or ride1.total+ride2.total>4) :
                                ride = Booked_rides.objects.create(is_complete=False)

                            
                                for u in ride1.users.all() :
                                    if u not in ride.users.all() :
                                        ride.users.add(u)
                                for p in ride2.users.all() :
                                        if p not in ride.users.all() :
                                           ride.users.add(p)
                                for b in ride1.bookings.all() :
                                    if b not in ride.bookings.all() :
                                        ride.bookings.add(b)
                                for b in ride2.bookings.all() :
                                    if b not in ride.bookings.all() :
                                        ride.bookings.add(b)

                                ride.total = ride1.total+ride2.total
                                
                                if ride.total == 4 :
                                    ride.is_complete=True
                                ride.save()

                                for u in ride1.users.all() :
                                    notification.To.add(u)
                                notification.bookfromid=data['bookfromid']
                                notification.booktoid=data['booktoid']
                                ride1.delete()
                                ride2.delete()
                                notification.save()
                    else :
                         notification.To.add(author_user)
                         notification.bookfromid =data['bookfromid']
                         notification.booktoid=data['booktoid']
                         notification.notification = "This booking is not possible as either your or the other booking is done or completed"
                         notification.save()
                except :
                    notification.To.add(author_user)
                    notification.notification = "There was error in creating booking maybe caused by network error or That booking is already completed"
                    notification.save()
            
            elif data['typeb']=='gti' :
                try :
                   
                    ride=Booked_rides.objects.get(pk=data['bookfromid'])
                    booking = Bookings.objects.get(pk=data['booktoid'])
                    notification.bookfromid =data['bookfromid']
                    notification.booktoid=data['booktoid']
                    
                    if not booking.is_booked and not ride.total+booking.no_friends>3:
                                    
                                    booking.is_booked=True
                                    ride.users.add(booking.user)
                                    ride.bookings.add(booking)
                                    
                                    notification.To.set(ride.users.all().exclude(username=booking.user.username))
                                    
                                    
                                   
                                    ride.total=ride.total+booking.no_friends+1
                                    if ride.total==4 :
                                        ride.is_complete=False
                                    ride.save()
                                    notification.save()
                                    booking.save()
                    else :
                         notification.To.add(author_user)
                         notification.notification = "Not Possible .As either your booking is complete or the requested booking is"
                         notification.save()
                except :
                    notification.To.add(author_user)
                    notification.notification = "There was error in creating booking maybe caused by network error or That booking is already completed"
                    notification.save()
                    


        elif data['type']=='request':
                if data['typeb']=='group':
                    ride=Booked_rides.objects.get(pk=data['booktoid'])
                    to=ride.users 
                    for u in ride.users.all() :
                        notification.To.add(u)
                    notification.bookfromid=data['bookfromid']
                    notification.booktoid=data['booktoid']
                    notification.save()

                elif data['typeb']=='individual' :
                    # print(data['to'])
                    to_user_profile = Profile.objects.get(Name=data['to'])
                    to_user=to_user_profile.user
            
                    notification.To.add(to_user)
                    notification.bookformid=data['bookfromid']
                    notification.booktoid=data['booktoid']
                    notification.save()

                elif data['typeb']== 'gtg' :
                    ride=Booked_rides.objects.get(pk=data['booktoid'])
                    # to=ride.users 
                    for u in ride.users.all() :
                        notification.To.add(u)
                    notification.bookfromid=data['bookfromid']
                    notification.booktoid=data['booktoid']
                    notification.save()

                elif data['typeb'] == 'gti' :
                    to_user_profile = Profile.objects.get(Name=data['to'])
                    to_user=to_user_profile.user
            
                    notification.To.add(to_user)
                    notification.bookformid=data['bookfromid']
                    notification.booktoid=data['booktoid']
                    notification.save()



        elif data['type']=='read' :
              notification_id=data['id']
              current = Notification.objects.get(pk=id)
              user = User.objects.get(pk=data['from'])
              current.read_by.add(user)

        elif data['type']=='cancel':
            
            ride=Booked_rides.objects.get(pk=data['booktoid'])
            
           
            #  ride.users.remove(author_user)
            # for b in ride.bookings.all():
            #     if b.user==author_user :
            #         ride.bookings.remove(b)
            #         break
            
            # ride.total-=1
            # ride.save()
            
            notification.To.set(ride.users.all())

            # ride.users.add(author_user)
            ride.save()
            # if(len(ride.users.all())==1) :
            #     book=ride.bookings.all()[0]
            #     book.is_booked=False 
            #     book.save()
            #     ride.delete()
            print('here')

        # elif data['type']=='link' :
        #     ride=Booked_rides.objects.get(pk=data['booktoid'])
        #     ride1=Booked_rides.objects.get(pk=data['bookfromid'])
        #     ride.users.remove(author_user)
        #     ride1.users.remove(author_user)
        #     # for b in ride.bookings.all():
        #     #     if b.user==author_user :
        #     #         ride.bookings.remove(b)
        #     #         break
            
        #     # ride.total-=1
        #     # ride.save()
           
        #     notification.To.set(ride.users.all())
        #     ride.users.add(author_user)
        #     ride.save()
        #     # if(len(ride.users.all())==1) :
        #     #     book=ride.bookings.all()[0]
        #     #     book.is_booked=False 
        #     #     book.save()
        #     #     ride.delete()
        #     print('here')

            

        

            


        data_send = self.message_to_json(notification)
        data_send.update({
            'bookfromid':data['bookfromid'],
            'booktoid' : data['booktoid']})

       
        data_send.update({
                'typeb':data['typeb']
        })
      
        content={
            'command':'new_notification',
            
            'notification':data_send
        }

        
        

        return self.send_chat_message(content)

    def fetch_status(self,data):
        user = User.objects.get(username=data['username'])
        contact =get_user_contact(data['username'])
        chats = contact.chats.all()
        data_send=[]
        for c in chats :
            for person in c.participants.all() :
                # if data_send[person.user.username] is  None :
                    connections= ConnectionHistory.objects.filter(user__username=person.user.username).order_by('status').distinct('status')
                    # print(connections)
                    if(len(connections)==3) :
                        data_send.append({'username':person.user.username,'status':'online'})
                    elif len(connections)==1:
                        data_send.append({'username':person.user.username,'status':connections.first().status})
                    else :
                        data_send.append({'username':person.user.username,'status':'offline'})
                        online =0
                        offline=0
                        away =0
                        for con in connections :
                            if con.status =='online':
                                online+=1
                            elif con.status=='offline':
                                offline+=1
                            else:
                                away+=1
                        if online==1:
                            data_send.append({'username':person.user.username,'status':'online'})
                        elif away==1 and online!=1 :
                            data_send.append({'username':person.user.username,'status':'away'})
                        else :
                            data_send.append({'username':person.user.username,'status':'offline'})
        
        data=[dict(t) for t in {tuple(sorted(d.items())) for d in data_send}]
        # print(data)
        return self.send_message({'command':'fetch_status','status':data})

        

    def messages_to_json(self,notifications) :
        result = []
        for  notification in notifications :
            result.append(self.messagex_to_json(notification))
        return result
    
    
    def message_to_json(self,notification):
        sendingto=[]
        # print(notification.To.all())
        for user in notification.To.all():
            
            sendingto.append(user.username)
        # print(sendingto)
        data_send= {
            'id':notification.id,
            'to':sendingto,
            'author':notification.From.username ,
            'content':notification.notification,
            'timestamp':str(notification.timestamp),
            'type':notification.notification_type,
            
        }
        if(len(sendingto)>1) :
            data_send.update({
                'typeb':'group'
            })
        else:
            data_send.update({
                'typeb':'individual'
            })
        return data_send


    def messagex_to_json(self,notification):
        sendingto=[]
        # print(notification.To.all())
        for user in notification.To.all():
            
            sendingto.append(user.username)
        # print(sendingto)
        data_send= {
            'id':notification.id,
            'to':sendingto,
            'author':notification.From.username ,
            'content':notification.notification,
            'timestamp':str(notification.timestamp),
            'type':notification.notification_type,
            'bookfromid':notification.bookfromid,
            'booktoid':notification.booktoid
            
        }
        if(len(sendingto)>1) :
            data_send.update({
                'typeb':'group'
            })
        else:
            data_send.update({
                'typeb':'individual'
            })
        return data_send

   


    def check_status(self,data):
        device_id=data['device_id']
        self.device=device_id
        self.username=data['username']
        user=User.objects.get(username=data['username'])
        # print(user)
        type=data['type']
        connection,_=ConnectionHistory.objects.get_or_create(user=user,device_id=device_id)
        if type=='check' :
               gap=timezone.timedelta(minutes=20)
               if timezone.now()-connection.last_echo>gap :
                  connection.status='away'
               
        elif type=='connected' :
            connection.status='online'
        else :
            connection.status='offline'
        connection.save()
        status_dict={
                 'id':user.id,
                 'name':user.username,
                 'status':connection.status
             }
        context={
            'command':'status',
             'status':status_dict
        }
        # print(context)
        self.send_status_message(context)
        

    commands ={
            'fetch_notifications': fetch_notifications,
            'new_notification'  : new_notification,
            'check_status':check_status,
            'fetch_status':fetch_status
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
        # self.check_status({
        #     'device_id':self.device,
        #     'username':self.username,
        #     'type':'close'
        # })
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
   
 
    def receive(self, text_data):
        data = json.loads(text_data)
        print(data)
        print(data['command'])
        self.commands[data['command']](self,data)



    def send_chat_message(self,notification) :
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_notification',
                'notification': notification
            }
        )
      

    def send_status_message(self,context):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type':'status_send',
                'status':context
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
    
    def status_send(self,event):
        status=event['status']
        self.send(text_data=json.dumps({
            'message':status
        }))



#Todo this is for multiple users in the ride 


            # else :
            #     ride=Booked_rides.objects.create(is_complete=False)
            #     ride.bookings.add(bokings1)
            #     to_user = User.objects.get(username=data['to'])
            #     rides.bookings.add(bookings2)
            #     ride.users.add(author_user,to_user)
            #     ride.save()