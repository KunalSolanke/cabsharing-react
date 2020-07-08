from rest_framework import viewsets
from rest_framework.generics import ListAPIView,RetrieveAPIView,DestroyAPIView
from django.db.models import Q
from user.models import Bookings,Booked_rides,Places,Profile
from Humrahi.models import User
from .serializers import Booked_ridesSerializer,BookingsSerializer,PlacesSerializer,ProfileSerializer,MatchSerializer
from rest_framework.authentication import TokenAuthentication,SessionAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.response import Response 
from rest_framework import status 
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.parsers import FileUploadParser,JSONParser,MultiPartParser





#now this list view only support get reqquest for post we have to use listcreaeview


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
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class=  Booked_ridesSerializer

    def get_queryset(self) :
        username  = self.request.user 
        user = User.objects.get(username=username)
        queryset=[]
        print(user,user.username)
        q= Booked_rides.objects.filter(users__id=user.id,bookings__date__gte=timezone.localtime(timezone.now()).date()).distinct('pk')
        return q

        def list(self,request):
            serializer = Booked_ridesSerializer(many=True)
            try :
                  queryset = self.get_queryset() 
                  return Response(serializer.data)
            except :
                return Response(serializer.errors,status.HTTP_404_NOT_FOUND)


# class UpdatedRideView(UpdateAPIView) :
#     serializer_class= Booked_ridesSerializer
#     authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]

#     def get_object(self) :
#         id = self.kwargs['id']
#         return Booked_rides.objects.get(pk=id)
    

#     def perform_update(self,serializer) :
#         obj=self.get_object() 
#         serializer.save(users= obj.users,total=obj.total,is_complete=obj.is_complete,)


class Booked_ridesDetailView(RetrieveAPIView) :
    
    queryset = Booked_rides.objects.all()
    serializer_class= Booked_ridesSerializer
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]





class GroupMatchesList(ListAPIView) :
    serializer_class=  Booked_ridesSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]

    def get_queryset(self):
        id=self.kwargs['pk']
        if id == '0' :
               user_booking=Bookings.objects.filter(user__id = self.request.user.id).last()
        else :
            user_booking = Bookings.objects.get(pk=id)
        
        queryset=[]
        date=timezone.localtime(timezone.now()).date()
        # queryset=Booked_rides.objects.filter(total__lt=user_booking.no_friends+4,bookings__first__time__hour__range=(user_booking.time.hour-2,user_booking.time.hour+2),bookings__first__date__gte=date,bookings__first__date__exact=user_booking.date).distinct('pk')
        for group in Booked_rides.objects.all() :
            if group.is_complete :
                print('continued')
                continue ;
            else :
                booking = group.bookings.all()[0]
                print(booking)
                checker=user_booking.place.lower()==booking.place.lower() and group.total<=3-user_booking.no_friends and (-user_booking.time.hour+booking.time.hour<1 or user_booking.time.hour-booking.time.hour<1) and( user_booking.date==booking.date) and user_booking.from_place.lower()==booking.from_place.lower()
                
                if checker and self.request.user not in group.users.all() and not group.is_complete:
                    queryset.append(group) 
        print(queryset)
        return queryset
        


class MatchesListApi(ListAPIView) :
    
   
    serializer_class=  MatchSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]

    def get_queryset(self) :
        id=self.kwargs['pk']
        print(id)
        if id == '0' :
           user_booking=Bookings.objects.filter(user__id = self.request.user.id).last()
        else :
            user_booking = Bookings.objects.get(pk=id)
       
         #TODO change to code below  and check the timezone
        print(user_booking)
        queryset = Bookings.objects.filter(
           Q(place__icontains = user_booking.place)  & Q(date__exact =user_booking.date) & Q(is_booked =False) & Q(from_place__icontains=user_booking.from_place)
             & Q(time__hour__range=(user_booking.time.hour-3,user_booking.time.hour+3)) &Q(date__gte=timezone.localtime(timezone.now()).date())
        & Q(no_friends__lte=2-user_booking.no_friends)).exclude(user__id = self.request.user.id)
        
        print(queryset)


        #from groups

        # print(user_booking.date)
        # print(queryset)
        return queryset 


class GroupToGroupMatching(ListAPIView) :
    serializer_class=  Booked_ridesSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]

    def get_queryset(self) :
        id=self.kwargs['pk']
        ride = Booked_rides.objects.get(pk=id)
        user_booking = ride.bookings.all()[0]
        can_have =4- ride.total



        queryset=[]
        date=timezone.localtime(timezone.now()).date()
        # queryset=Booked_rides.objects.filter(total__lt=user_booking.no_friends+4,bookings__first__time__hour__range=(user_booking.time.hour-2,user_booking.time.hour+2),bookings__first__date__gte=date,bookings__first__date__exact=user_booking.date).distinct('pk')
        # for group in Booked_rides.objects.all() :
        #     if group.is_complete :
        #         print('continued')
        #         continue ;
        #     else :
        #         booking = group.bookings.all()[0]
        #         print(booking)
        #         checker=user_booking.place.lower()==booking.place.lower() and group.total-4<user_booking.no_friends and (-user_booking.time.hour+booking.time.hour<1 or user_booking.time.hour-booking.time.hour<1) and( user_booking.date==booking.date)
        #         print(checker)
        #         if checker and self.request.user not in group.users.all():
        #             queryset.append(group)
         
        queryset=Booked_rides.objects.filter(total__lte=can_have,bookings__place__icontains=user_booking.place,bookings__date__exact=user_booking.date,bookings__date__gte=date,bookings__time__hour__range=(user_booking.time.hour-2,user_booking.time.hour+2),is_complete=False,
        bookings__from_place__icontains=user_booking.from_place).exclude(pk=id).distinct('pk')
        print(queryset)
        return queryset



class GrouptoIndividualMatching(ListAPIView) :
    serializer_class=  MatchSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]

    def get_queryset(self) :
        id=self.kwargs['pk']
        ride = Booked_rides.objects.get(pk=id)
        user_booking = ride.bookings.all()[0]
        can_have =3- ride.total
        date=timezone.localtime(timezone.now()).date()

        queryset = Bookings.objects.filter(no_friends__lte=can_have,place__icontains=user_booking.place,
        date__exact=user_booking.date,time__hour__range=(user_booking.time.hour-2,user_booking.time.hour+2),
        is_booked=False,date__gte=date,from_place__icontains=user_booking.from_place).exclude(user=self.request.user)
        

        return queryset 



class CancelBookingView(DestroyAPIView) :
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(CancelBookingView, self).dispatch(request, *args, **kwargs)
    serializer_class=BookingsSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]
    def get_queryset(self):
        id=self.kwargs['pk']
       
            
        return Bookings.objects.filter(pk=id)

    
            
class GroupCancelBookingView(DestroyAPIView) :
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(GroupCancelBookingView, self).dispatch(request, *args, **kwargs)
    serializer_class=BookingsSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication,SessionAuthentication,BasicAuthentication]
    def get_object(self):
        id=self.kwargs['pk']
        user=self.request.user
        booking_id=0 
        print(id)
        if  Booked_rides.objects.filter(pk=id).exists():
            
            booked = Booked_rides.objects.get(pk=id)
            print(booked.bookings.all())
            if len(booked.users.all())==4 :
                booked.is_complete=False
            booked.users.remove(user)
            for booking in booked.bookings.all() :
                print(user)
                if(booking.user==user):
                    booked.bookings.remove(booking)
                    booking_id=booking.id 
                    booked.total-=1+booking.no_friends
                    break
                else :
                    continue 
           
            booked.save()
            if(len(booked.users.all())==1) :
                book=booked.bookings.all()[0]
                book.is_booked=False 
                book.save()
                booked.delete()
            print(booking_id)
            return Bookings.objects.get(pk=booking_id)

    
            
   




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




 # print(user_booking)
        # print(user_booking.place)
        # queryset = Bookings.objects.filter(
        #     Q(place__icontains = user_booking.place)  & Q(date__exact = user_booking.date) & Q(is_booked =False)
        # ).exclude(user__id = self.request.user.id)



# queryset=[]
        # print(q)
        # for a in q : 
        #     print(a.users.all())
        #     if a.bookings.all()[0].date>= timezone.localtime(timezone.now()).date()  :
        #         for u in a.users.all() :
        #             if(u==username) :

        #              queryset.append(a)
        # print(queryset)