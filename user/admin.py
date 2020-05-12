from django.contrib import admin
from user.models import Profile,Bookings,Booked_rides,Places


# Register your models here.
admin.site.register(Profile)
admin.site.register(Booked_rides)
admin.site.register(Places)
admin.site.register(Bookings)
# admin.site.register(Message)
# admin.site.register(Contact)
# admin.site.register(Chats)



