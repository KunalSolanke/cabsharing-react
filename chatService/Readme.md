# we will lLearn ABout The wsgi and channels in the django


fist we have to create A Wsgi Application :
     named ChatService here 
     It will be same like Slack



     We are following the official Docs -Tutorial

     
Tutorial

Channels allows you to use WebSockets and other non-HTTP protocols in your Django site. For example you might want to use WebSockets to allow a page on your site to immediately receive updates from your Django server without using HTTP long-polling or other expensive techniques.

In this tutorial we will build a simple chat server, where you can join an online room, post messages to the room, and have others in the same room see those messages immediately.

    Tutorial Part 1: Basic Setup
    Tutorial Part 2: Implement a Chat Server
    Tutorial Part 3: Rewrite Chat Server as Asynchronous
    Tutorial Part 4: Automated Testing



1.Basic Setup : 


   Just FOllow Aong the Tutorial 

   when our app is running we have to make is to make integraing routing configurations

   Let’s start by creating a root routing configuration for Channels. A Channels routing configuration is similar to a Django URLconf in that it tells Channels what code to run when an HTTP request is received by the Channels server.



   ou’ll also need to point Channels at the root routing configuration. Edit the mysite/settings.py file again and add the following to the bottom of it:

   in settings.py 



   Notice the line beginning with Starting ASGI/Channels development server at http://127.0.0.1:8000/. This indicates that the Channels development server has taken over from the Django development server.

Go to http://127.0.0.1:8000/chat/ in your browser and you should still see the index page that we created before.

Go to the terminal where you ran the runserver command and press Control-C to stop the server.



# Tutorial 2 

    Firefox can’t establish a connection to the server at ws://127.0.0.1:8000/ws/chat/chatroom/. chatroom:16:27
Chat socket closed unexpectedly chatroom:30:21

​this is the consumerspart SOwe Have to make the first consumer :


        When Django accepts an HTTP request, it consults the root URLconf to lookup a view function, and then calls the view function to handle the request. Similarly, when Channels accepts a WebSocket connection, it consults the root routing configuration to lookup a consumer, and then calls various functions on the consumer to handle events from the connection.


        We will write a basic consumer that accepts WebSocket connections on the path /ws/chat/ROOM_NAME/ that takes any message it receives on the WebSocket and echos it back to the same WebSocket.






        

Note

It is good practice to use a common path prefix like /ws/ to distinguish WebSocket connections from ordinary HTTP connections because it will make deploying Channels to a production environment in certain configurations easier.

In particular for large sites it will be possible to configure a production-grade HTTP server like nginx to route requests based on path to either (1) a production-grade WSGI server like Gunicorn+Django for ordinary HTTP requests or (2) a production-grade ASGI server like Daphne+Channels for WebSocket requests.

Note that for smaller sites you can use a simpler deployment strategy where Daphne serves all requests - HTTP and WebSocket - rather than having a separate WSGI server. In this deployment configuration no common path prefix like /ws/ is necessary.


websocketConsumer :
This is a synchronous WebSocket consumer that accepts all connections, receives messages from its client, and echos those messages back to the same client. For now it does not broadcast messages to other clients in the same room.




when we go to a url we find a chatConsumer ANd then we have to set the routes for it 




This root routing configuration specifies that when a connection is made to the Channels development server, the ProtocolTypeRouter will first inspect the type of connection. If it is a WebSocket connection (ws:// or wss://), the connection will be given to the AuthMiddlewareStack.

(Django’s session framework needs the database)



CHANNEL LAYER : 
        A channel layer is a kind of communication system. It allows multiple consumer instances to talk with each other, and with other parts of Django.

A channel layer provides the following abstractions: 
    A channel layer is a kind of communication system. It allows multiple consumer instances to talk with each other, and with other parts of Django.

A channel layer provides the following abstractions:

    A channel is a mailbox where messages can be sent to. Each channel has a name. Anyone who has the name of a channel can send a message to the channel.
    A group is a group of related channels. A group has a name. Anyone who has the name of a group can add/remove a channel to the group by name and send a message to all channels in the group. It is not possible to enumerate what channels are in a particular group.
    


    Every consumer instance has an automatically generated unique channel name, and so can be communicated with via a channel layer.
      


      In our chat application we want to have multiple instances of ChatConsumer in the same room communicate with each other. To do that we will have each ChatConsumer add its channel to a group whose name is based on the room name. That will allow ChatConsumers to transmit messages to all other ChatConsumers in the same room.


       We will use a channel layer that uses Redis as its backing store. To start a Redis server on port 6379, run the following command:
                 docker run -p 6379:6379 -d redis:5

                 pip install channels_redis




      class AsyncToSync(awaitable, force_new_loop=False)
Utility class which turns an awaitable that only works on the thread with the event loop into a synchronous callable that works in a subthread.

If the call stack contains an async loop, the code runs there. Otherwise, the code runs in a new loop in a new thread.

Either way, this thread then pauses and waits to run any thread_sensitive code called from further down the call stack using SyncToAsync, before finally exiting once the async task returns.



he ChatConsumer that we have written is currently synchronous. Synchronous consumers are convenient because they can call regular synchronous I/O functions such as those that access Django models without writing special code. However asynchronous consumers can provide a higher level of performance since they don’t need to create additional threads when handling requests.

tutorial 3 :

    we will convert it to assynchronus

tutorial 4 :
     is just testing using selenium : browser simulator