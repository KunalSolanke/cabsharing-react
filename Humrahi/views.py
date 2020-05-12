from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
import json
from rest_framework.authtoken.models import Token




@csrf_exempt
@api_view(['POST'])
def check_token(request, format=None):
     token = Token.objects.filter(key = request.data['token']).exists()
     return JsonResponse({"status": token}) 