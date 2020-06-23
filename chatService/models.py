from django.db import models
from django.conf import settings
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver



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


  
# @receiver(post_save,sender=settings.AUTH_USER_MODEL) 
# def create_contact(sender,instance,created,**kwargs) :
#    if created :
#        Contact.objects.create(user=instance)

# @receiver(post_save,sender=settings.AUTH_USER_MODEL)
# def update_contact(sender,instance,created,**kwargs) :
#     try:
#        instance.contact.save()
#     except:
#         Contact.objects.create(user=instance)




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