from django.contrib import admin
from django.urls import path,include,re_path
from django.conf.urls import url
from . import views

app_name='Humrahi'

urlpatterns=[
    url('^rapi/check/',views.check_token),  
    url('^oauth/',include('social_django.urls',namespace='social'),name='social'),
   
    