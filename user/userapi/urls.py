from django.urls import path,re_path
from user.userapi.views import BookingsviewSets,UserBookings,MatchesListApi,ProfileView,PlacesListView,GroupMatchesList,Booked_ridesListView,CancelBookingView,GroupCancelBookingView,GroupToGroupMatching,GrouptoIndividualMatching
from rest_framework.routers import DefaultRouter



router = DefaultRouter()
router.register(r'bookings',BookingsviewSets, basename='bookings')
router.register(r'(?P<state>.+)/userbookings',UserBookings, basename='userbookings')
router.register(r'(?P<uid>.+)/profile',ProfileView, basename='profile')



urlpatterns = router.urls



urlpatterns.append(re_path("^matches/(?P<pk>.+)/",MatchesListApi.as_view(),name='matches'))
urlpatterns.append(re_path("^groupmatches/(?P<pk>.+)/",GroupMatchesList.as_view(),name='groupmatches'))
urlpatterns.append(re_path("^places/",PlacesListView.as_view(),name='places'))
urlpatterns.append(re_path("^booked/",Booked_ridesListView.as_view(),name='booked'))
urlpatterns.append(re_path("^bookingcancel/(?P<pk>.+)/",CancelBookingView.as_view(),name="cancel"))
urlpatterns.append(re_path("^groupbookingcancel/(?P<pk>.+)/",GroupCancelBookingView.as_view(),name="groupcancel"))
urlpatterns.append(re_path("^grouptogroup/(?P<pk>.+)/",GroupToGroupMatching.as_view(),name="gtg"))
urlpatterns.append(re_path("^grouptoindividual/(?P<pk>.+)/",GrouptoIndividualMatching.as_view(),name="gti"))





# router.register(r'matches',MatchesListApi, basename='matches')
# from .views import Booked_ridesListView,BookingsListView,Booked_ridesDetailView,BookingsDetailView

# urlpatterns = [
#     path("bookings",BookingsListView.as_view()),
#     path("bookings/<pk>",BookingsDetailView.as_view()),
#     path("booked",Booked_ridesListView.as_view()),
#     path("booked/<pk>",Booked_ridesDetailView.as_view())

# ]
