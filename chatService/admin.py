from django.contrib import admin
from .models import Messages,Chats,Contact

# Register your models here.

# admin.site.register(Message)

admin.site.register(Messages)
admin.site.register(Contact)
admin.site.register(Chats)
