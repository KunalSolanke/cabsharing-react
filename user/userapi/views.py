from rest_framework import viewsets
from rest_framework.generics import ListAPIView,RetrieveAPIView
from django.db.models import Q
from user.models import Bookings,Booked_rides,Places,Profile
from Humrahi.models import User
from .serializers import Booked_ridesSerializer,BookingsSerializer,PlacesSerializer,ProfileSerializer,MatchSerializer
from rest_framework.authentication import TokenAuthentication,SessionAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from django.shortcuts import get_object_or_404
#now this list view only support get reqquest for post we have to use listcreaeview


#todo

class BookingsviewSets(viewsets.ModelViewSet) :
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = BookingsSerializer
    queryset = Bookings.objects.filter(is_booked= False)




    


class UserBookings(viewsets.ModelViewSet) : 
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault(),
    )
    serializer_class = BookingsSerializer 
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]
    

    def get_queryset(self) :
       user = self.request.user
    #    print(user)
       state = self.kwargs['state']  
    #    print(state)
       if state == 'prev' : 
            queryset = Bookings.objects.filter(user__id = user.id,is_booked = True)

       elif state == 'curr' :
             queryset = Bookings.objects.filter(user__id = user.id,is_booked = False)

       else : 
           queryset = Bookings.objects.filter(user__id = user.id)

            
    #    print(queryset)
       return queryset


    def perform_create(self, serializer):
            kwargs = {
           'user': self.request.user # Change 'user' to you model user field.
            }
            # print("saved")
 
            serializer.save(**kwargs)
        

     



class Booked_ridesListView(ListAPIView) :
    queryset = Booked_rides.objects.all()
    serializer_class=  Booked_ridesSerializer


class Booked_ridesDetailView(RetrieveAPIView) :
    
    queryset = Booked_rides.objects.all()
    serializer_class= Booked_ridesSerializer




class MatchesListApi(ListAPIView) :
    
   
    serializer_class=  MatchSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]

    def get_queryset(self) :
        id=self.kwargs['pk']
        # print(id)
        if id == '0' :
           user_booking=Bookings.objects.filter(user__id = self.request.user.id).last()
        else :
            user_booking = Bookings.objects.get(pk=id)
        # print(user_booking)
        # print(user_booking.place)
        queryset = Bookings.objects.filter(
            Q(place__icontains = user_booking.place)  & Q(date__exact = user_booking.date) & Q(is_booked =False)
        ).exclude(user__id = self.request.user.id)
        
         #TODO change to code below  and check the timezone
        #delay = timezone.timedelta(hours=5)
        # queryset = Bookings.objects.filter(
        #    Q(place__icontains = user_booking.place)  & Q(date__range =user_booking.date) & Q(is_booked =False)
         #     & Q(time_range=(user_booking.time-delay,user_booking.time+delay))
        #).exclude(user__id = self.request.user.id)






        # print(user_booking.date)
        # print(queryset)
        return queryset 




class PlacesListView(ListAPIView) :
    serializer_class = PlacesSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]
    queryset = Places.objects.all()



class ProfileView(viewsets.ModelViewSet) :
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]
   

    def get_queryset(self) :
       uid = self.kwargs['uid']
       if uid == '0' :
           user = self.request.user
           queryset = Profile.objects.filter(user=user)
           return queryset

       else : 
             queryset = Profile.objects.filter(user_id=uid)
             return queryset

    # def perform_create(self, serializer):
    #         kwargs = {
    #        'Nmae': self.request.user.username# Change 'user' to you model user field.
    #         }
    #         print("saved")
 
    #         serializer.save(**kwargs)
        





    # def create(self, validated_data):
    #     user = self.request.user
    #     # add the current User to the validated_data dict and call
    #     # the super method which basically only creates a model
    #     # instance with that data
    #     validated_data['user'] = user
    #     return super(UserBookings, self).create(validated_data)


# class BookingsListView(ListAPIView) :
#     queryset = Bookings.objects.all()
#     serializer_class= BookingsSerializer


# class BookingsDetailView(RetrieveAPIView) :
#     queryset = Bookings.objects.all()
#     serializer_class= BookingsSerializer


#Booked Rides


