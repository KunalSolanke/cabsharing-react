
web: daphne Cabsharing.asgi:application --port $PORT --bind 0.0.0.0 -v2
worker: python manage.py runworker --settings=Cabsharing.settings -v2
