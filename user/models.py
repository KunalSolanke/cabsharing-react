from django.db import models
#from user import views
from Humrahi.models import User 
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver



#todo

# Create your models here.

class Profile(models.Model) : 
    user=models.OneToOneField(settings.AUTH_USER_MODEL, verbose_name="user",related_name='profile', on_delete=models.CASCADE)
    Name=models.CharField(("name"), max_length=50,blank=True)
    Info=models.TextField(max_length=40,blank=True)
    Year=models.CharField(max_length=10,blank=True)
    contact=models.CharField(("phone"), max_length=20,default='',blank=True)
    profile_pic=models.ImageField(("Pic"), upload_to="pics/profile_pics", default=r"pics\profile_pics\undraw_male_avatar_323b.png")




@receiver(post_save,sender=settings.AUTH_USER_MODEL) 
def create_profile(sender,instance,created,**kwargs) :
   if created :
       Profile.objects.create(user=instance,Name=instance.username)

@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def update_profile(sender,instance,created,**kwargs) :
    try:
       instance.profile.save()
    except:
        Profile.objects.create(user=instance)
        

     



class Places(models.Model) :
    image=models.ImageField(("Place_img"), upload_to="pics/place_pics", height_field=None, width_field=None, max_length=None)
    palce_info=models.TextField(("description"))
    name=models.CharField(("Place"), max_length=50)
    ratings=models.IntegerField(("rating"),null=True,blank=True)




class Bookings(models.Model) :
    user=models.ForeignKey(settings.AUTH_USER_MODEL,related_name='bookings',  on_delete=models.CASCADE)
    date=models.DateField(("When?"), auto_now=False, auto_now_add=False)
    time=models.TimeField(("Exactly_when"), auto_now=False, auto_now_add=False)
    place=models.CharField(("Location"), max_length=50,default='')
    is_booked=models.BooleanField(("is_booked"),default=False)
    special_req=models.TextField(("Special_request"),default='')
    priority_name=models.CharField(("priority"), max_length=50,default='')
    no_friends=models.IntegerField(('friends'),null=True,blank=True)
    allow_with=models.IntegerField(('How many!!'),null=True,blank=True)

class Booked_rides(models.Model) :
    user1=models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='user1')
    user2=models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='user2')
    is_matched=models.BooleanField(("match_status"),default=False)
    bookings1 = models.OneToOneField(Bookings,related_name='book1',on_delete=models.CASCADE,null=True)
    bookings2 = models.OneToOneField(Bookings,related_name='book2',on_delete=models.CASCADE,null=True)






  


# class Contact(models.Model) :

#     user = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='friends',on_delete=models.CASCADE)
#     friends = models.ManyToManyField('self',blank=True)


#     def __str__(self) :
    
#         return self.user.username
    

# class Message(models.Model) :
#     contact    = models.ForeignKey(Contact,related_name="messages",on_delete=models.CASCADE)
#     timestamp  = models.DateTimeField(auto_now_add=True)
#     content   =   models.TextField()

#     def __str__(self) :
#         return self.contact.user.username


# class Chats(models.Model) :
#     participants = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='chats')
#     messages = models.ManyToManyField(Message,blank=True)



#     def __str__(self) :

#         return "{}".format(self.pk)


#     def last_10_messages(self) :
#         return self.messages.objects.all().order_by('-timestamp')[:10]











#TODO uncomment code below ,delete migrations and remigrate
#for 3-4 users 

# class Booked_rides(models.Model) :
#     users=models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='users')
#     is_complete=models.BooleanField(("match_status"),default=False)
#     bookings = models.ManyToManyield(Bookings,related_name='book1',on_delete=models.CASCADE,null=True)
#     decided_time=models.TimeField(default='')
