from django.db import models
from Humrahi.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver


#todo
# Create your models here.

class Notification(models.Model) :
    From  = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='from1',on_delete= models.CASCADE)
    To = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='to2')
    timestamp = models.DateTimeField(auto_now=True)
    publish_time =models.DateTimeField(auto_now_add=True)
    notification = models.TextField(blank= True)
    notification_type = models.CharField(max_length= 10,blank =True )
    read_by=models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='read')
    bookfromid=models.IntegerField(default=0)
    booktoid=models.IntegerField(default=0)



    def __str__(self) :
        return '{}'.format(self.pk)




@receiver(post_save,sender=settings.AUTH_USER_MODEL) 
def create_notification(sender,instance,created,**kwargs) :
   if created :
      notification= Notification.objects.create(From= User.objects.get(pk=1),notification='Welcome User!THis is A Cab Sharing Site For IITG campus')
      notification.To.add(instance) 
      notification.save()









status_choices=[(
    'online','online'
),
('offline','offline'),
('away','away')

]


class ConnectionHistory(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL,related_name='connection',on_delete=models.CASCADE,blank=True,default='1')
    status=models.CharField(max_length=10,choices=status_choices,default='offline')
    first_login= models.DateTimeField(auto_now_add=True)
    last_echo=models.DateTimeField(auto_now=False,auto_now_add=True)
    device_id=models.CharField(max_length=1000,default='',blank=True)

    class Meta:
        unique_together=['user','device_id']

# @receiver(post_save,sender=settings.AUTH_USER_MODEL)
# def update_profile(sender,instance,created,**kwargs) :
#     try:
#        instance.profile.save()
#     except:
#         Profile.objects.create(user=instance)




#todo
#in the above mode change the 'TO' as manytomanyfield to the users
