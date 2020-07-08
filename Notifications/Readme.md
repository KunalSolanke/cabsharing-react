#  NOTIFICATION WEBSOCKET

## We use data from the redis server 


## Models

   * Notification
   * Connection history

# consumer 
    Basic websocketcosumer name Notesonumer in consumer.py .
    It responds to following events.

- Fetch_notifications
        
        This fetches all the notifications related to user and not read by the user ,when event named the same is   fired from the js/template and sends back a event to the user which fires the event with notifications to user. 
        The notifications are orderd by date in desc order .

        Also when request is sent with id the particular notification is marked as read and again notifications are sent back.

 - New notifications

    New notification event send any new message by a user to the chat and is then sent to all who are connected to websocket at the moment.

    This has got complicated due not handling properly and laziness 

    - A new message has some types.
       1. Request <br/>
        A request has two types<br /> 
        <br/>
           - A. Request to a GROUP <br/>
                - IF request is made to a group we take data   from the request .Find the group   in database.Make a notification obj and send not to all the group member with confirm tag.

            
          - B .When req is sent to a individual
          
            - In this case we take the data and make a notification object add them in it .And send request to the other perosn with type=='confirm'
       
       <br/>
       2. Confirm <br/>
          similarly a confirm type has 2 types<br /> 
        <br />

        - Confirmed by  one person in group<br /> 
            - In this ,we add the requesting person to group
        - Confirm req to one person <br />
            - Here we just create a ride and add these usrs to the new  group .
          



3.ONLINE

        as the name suggests We send event from the frontend on connection .It fetches the status of the users which are in contact with the user.Also when users goes offline same event is fired for all the users connected to the socket /are online.



## Serialized data 

   None
    

## Serializer :
     1.chat
     2.Contact-Serializer 
          -as a filed of chat serializer 
    3.Message -not in use 

### MAIN FILES 
    1.models.py 
    2.consumer.py
    3.routing.py 
