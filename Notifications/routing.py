from django.urls import re_path

from . import consusmers

websocket_urlpatterns = [
    re_path(r'ws/notify_IIT/$', consusmers.NoteConsumer)]