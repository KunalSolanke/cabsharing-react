
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser) :
      Info=models.TextField(max_length=40)
      Year=models.CharField(max_length=10)
      contact=models.IntegerField(null=True,blank=True)
      active_status=models.BooleanField(default=True)

# Create your models here.

