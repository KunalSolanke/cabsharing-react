"""
ASGI config for Cabsharing project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/asgi/
"""

# import os

# from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Cabsharing.settings')

# application = get_asgi_application()

import os
import django
#from channels.layers import get_channel_layer
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Cabsharing.settings")
from dotenv import load_dotenv
project_folder = os.path.expanduser(' C:\Users\VOLDERMORT\Documents\GitHub\-cabsharing-react') 
print(project_folder,'hello')
load_dotenv(os.path.join(project_folder, '.env'))
django.setup()
application = get_asgi_application()
#channel_layer = get_channel_layer()