#  CHAT WEBSOCKET

## We use data from the redis server 


## Models

   * Messages 
   * Chats 
   * Contact

## consumer 
    Basic websocketcosumer name chatsonumer in consumer.py 

    It responds to following event -
    1. Fetch_messages -

        this fetches all the messages related to
        particular chat ,when event name same is    fired from the js/template and sends back a event to the user which fires the event with messages for the chat requested . 

    2.new message -

      - New messages event send any new message by a user to the chat and is then sent to all who are connected to websocket at the moment


    3.Typing  -

        - as the name suggests it send the event when user start typing to all users connected.



## Serialized data :
    1.Chats 
        All chats in which user is present is sent back on 'GET'
    "POST":  Sending names of users he wants to add to chat.

    FORMAT FOR POSTING DATA SHOULD BE -
    {
        "participants": [array of participants]
    }
    
    for the given url in url.py
    

## Serializer :
     1.chat
     2.Contact-Serializer 
          -as a filed of chat serializer 
    3.Message -not in use 




## MAIN FILES 
    1.models.py 
    2.api/
      * serializer 
      * views 
      * url 
    3.routing.py 
    