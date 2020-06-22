# Cabsharing

Humraahi - Makes travelling fun


Humraahi is a Cab sharing Website for IIT-G Campus







# Todo 
   

   I CAN MAKE MOST OF THIS AFTER EXAMS OR DURING IF NEEDED 
   There is a lot to do in this project.I was sidetracked by another and lockdown




   1.There is one major issue currently only two people share the ride.

   
        -I have added the code in comments to change it to multiple users but have not tested

        these changes are in :
            1.Booking model                              user/models
            2.Matchlist view                             users/userapi/views
            3.Notifications model and consumer            Notifications/models     and Notifications/consumers
            4.Booked_ride model                                  user/models               




            on frontend not much






    2.Profile 
         1.Update profile(not done)
         2.Password change(not done)
         3.Forgot passworfd(not done ,need to add a emailer like smtp)
         4.logout         -  rest-auth provides path for logout depending on user but here  will have to add view depending on access token 






    3.Search people
         1.search people by names(not done)





    4.Improving api serializers for better performance 

          current they are simple apis .None of them is nested depending on the relations.
          need to update that But this will be a major change both for frontend And backend





# issues 


   As mentioned in videos I have some issues 
   

   1.Login redirect async 
   
   2.Chat loading shows weird sys gen text at first
   
   3.some ui issues
