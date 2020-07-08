# Root directory of the backend- Django


## settings 
   ### apps installed and required 
       1.rest_framework  -making api endpoints
       2.allauth   peer for rest-auth
       3.rest-auth  authentication
       4.corsheaders -handling cors
        (change settings for protecting  against csrf)
       5.django-heroku -deploy
       6.channels  - chat and notification
       7.whitenoise -deployment
       8.oauth2_provider for allowing soial authentication

  ### wsgi 
     whitenoise is used for the static files loaidng here ,just after the application is intialized .

   ### asgi 
      asgi.py handles the channels same setting in setting .py. We have to set the redisbackend as channels-layer.It cab any db.That cache data.
      Redis-sever must be running for chat to work .
      Port and name can be changed in settings.py 

  ### Token Authetication 
       rest-framewrok is used for simple token based authetication.
       permsissopn are to all.


## routing 
     *routes for the chat and notification consumer

## url 
     1. user apis 
     2. chat apis
     3.rest-auth
     4.allauth -accounts 
     5.React routes - react build routes

## Models 
    None

