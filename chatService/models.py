from django.db import models
from django.conf import settings


User = settings.AUTH_USER_MODEL
# Create your models here.


# class Message(models.Model) :
#     author     = models.ForeignKey(User,related_name="author_messages",on_delete=models.CASCADE)
#     timestamp  = models.DateTimeField(auto_now_add=True)
#     content   =   models.TextField()

#     def __str__(self) :
#         return self.author.username 

#     def last_30_messages() :
#         return Message.objects.all().order_by('-timestamp')[:10]




class Contact(models.Model) :
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='friends',on_delete=models.CASCADE)
    friends = models.ManyToManyField('self',blank=True)

    def __str__(self) :
    
        return self.user.username
    

class Messages(models.Model) :
    contact    = models.ForeignKey(Contact,related_name="messages",on_delete=models.CASCADE)
    timestamp  = models.DateTimeField(auto_now_add=True)
    content   =   models.TextField()

    def __str__(self) :
        return self.contact.user.username


class Chats(models.Model) :
    participants = models.ManyToManyField(Contact,related_name='chats')
    messages = models.ManyToManyField(Messages,blank=True)



    def __str__(self) :

        return "{}".format(self.pk)


    def last_10_messages(self) :
        return self.messages.objects.all().order_by('-timestamp')[:10]