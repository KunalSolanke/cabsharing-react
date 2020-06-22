from rest_framework import serializers 
from user.models import Bookings,Booked_rides,Places,Profile


#Todo this api or not nested ,thier depth is zero ,so We have to more api calls 
#Todo which can be reduced making them nested But for that we will have to change a significant amount of logic both on fontend
#Todo and backend

class BookingsSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Bookings
        fields=['id','user','special_req','priority_name','no_friends','allow_with','time','place','date','is_booked']





class ProfileSerializer(serializers.ModelSerializer) : 
    class Meta :
        model = Profile
        fields = ('__all__')


class MatchSerializer(serializers.ModelSerializer) :
    # user = ProfileSerializer()
    class Meta :
        model = Bookings
        fields=['id','user','special_req','priority_name','no_friends','allow_with','time','place','date','is_booked']



class Booked_ridesSerializer(serializers.ModelSerializer) :
    class Meta : 
        model = Booked_rides
        fields =['user1','user2','is_matched']


class PlacesSerializer(serializers.ModelSerializer) :
    class Meta : 
        model = Places
        fields = ('__all__')

