
from django.contrib import admin
from django.urls import path,include,re_path
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from django.views.generic import TemplateView
# from allauth.accounts.views import ComfirmEmailView
app_name='home'
from decouple import config
urlpatterns = [
    
   
    path('uapi/',include('user.userapi.urls')),
    path('capi/',include('chatService.api.urls')),
    url(r'^humraahi-admin/', admin.site.urls),
    url(r'^api/login/', include('rest_social_auth.urls_jwt')),
    url(r'^api/login/', include('rest_social_auth.urls_token')),
    url(r'^api/login/', include('rest_social_auth.urls_session')),   
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')) ,
    path('api-auth/', include('rest_framework.urls')) ,
    url(r'^', include('django.contrib.auth.urls')),
    path('accounts/',include('allauth.urls')),
    # path('verify-email/',view=ComfirmEmailView.as_view(),)

   
   
    

]
urlpatterns =urlpatterns +  static(settings.STATIC_URL,document_root=settings.STATIC_ROOT) 
urlpatterns =urlpatterns +  static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

#react build routes 
urlpatterns+=[ re_path(".*",TemplateView.as_view(template_name="index.html"))]

