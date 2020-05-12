from django.urls import path,re_path
from user.userapi.views import BookingsviewSets,UserBookings,MatchesListApi,ProfileView,PlacesListView
from rest_framework.routers import DefaultRouter



router = DefaultRouter()
router.register(r'bookings',BookingsviewSets, basename='bookings')
router.register(r'(?P<state>.+)/userbookings',UserBookings, basename='userbookings')
router.register(r'(?P<uid>.+)/profile',ProfileView, basename='profile')



urlpatterns = router.urls



urlpatterns.append(re_path("^matches/(?P<pk>.+)/",MatchesListApi.as_view(),name='matches'))
urlpatterns.append(re_path("^places/",PlacesListView.as_view(),name='places'))


# router.register(r'matches',MatchesListApi, basename='matches')
# from .views import Booked_ridesListView,BookingsListView,Booked_ridesDetailView,BookingsDetailView

# urlpatterns = [
#     path("bookings",BookingsListView.as_view()),
#     path("bookings/<pk>",BookingsDetailView.as_view()),
#     path("booked",Booked_ridesListView.as_view()),
#     path("booked/<pk>",Booked_ridesDetailView.as_view())

# ]
