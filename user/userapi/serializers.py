from rest_framework import serializers 
from user.models import Bookings,Booked_rides,Places,Profile
from rest_auth.serializers import UserDetailsSerializer
from Humrahi.models import User


#Todo this api or not nested ,thier depth is zero ,so We have to more api calls 
#Todo which can be reduced making them nested But for that we will have to change a significant amount of logic both on fontend
#Todo and backend

class BookingsSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Bookings
        fields=['id','user','special_req','priority_name','no_friends','allow_with','time','place','date','is_booked','from_place']



class ProfileSerializer(serializers.ModelSerializer) : 
    class Meta :
        model = Profile
        fields = ('__all__')


class MatchSerializer(serializers.ModelSerializer) :
    # user = ProfileSerializer()
    class Meta :
        model = Bookings
        fields=['id','user','special_req','priority_name','no_friends','allow_with','time','place','date','is_booked','from_place']


class UserSerializer(serializers.ModelSerializer) :
    class Meta:
        model = User
        fields=['username']

class Booked_ridesSerializer(serializers.ModelSerializer) :
    users = UserSerializer(many=True)
    bookings= BookingsSerializer(many=True)
    class Meta : 
        model = Booked_rides
        fields =['users','bookings','is_complete','total','id']


class PlacesSerializer(serializers.ModelSerializer) :
    class Meta : 
        model = Places
        fields = ('__all__')

class UserDetailserializer(UserDetailsSerializer) :
    Info=serializers.CharField(source="profile.Info",required=False)
    Name=serializers.CharField(source="profile.Name",required=False)
    profile_pic=serializers.ImageField(source="profile.profile_pic",required=False)
    Year=serializers.CharField(source="profile.Year",required=False)
    contact=serializers.CharField(source="profile.contact",required=False)
    class Meta(UserDetailsSerializer.Meta):
        model=User
        fields=UserDetailsSerializer.Meta.fields+('Info','contact','Year','profile_pic','Name',)

    def update(self,instance,validated_data):
    
        profile_data=validated_data.pop('profile',{})
        print(profile_data)
        Info = profile_data.get('Info')
        Name=profile_data.get('Name')
        profile_pic=profile_data.get('profile_pic')
        print(profile_pic)
        Year=profile_data.get('Year')
        contact=profile_data.get('contact')
        instance = super(UserDetailserializer,self).update(instance,validated_data) 
        profile=instance.profile
        
        if profile_data :
            if Year :
                profile.Year=Year
            if Name:
                profile.Name=Name
            if profile_pic :
              profile.profile_pic=profile_pic
            if contact :
               profile.contact=contact
            if Info:
                profile.Info=Info

        
        profile.save()
        return instance

        

    

    class Profile_picSerializer(serializers.ModelSerializer) :
     
        class Meta :
               model = Profile 
               fields = ['profile_pic']