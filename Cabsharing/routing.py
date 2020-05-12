from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import chatService.routing
import Notifications.routing

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            chatService.routing.websocket_urlpatterns+
            Notifications.routing.websocket_urlpatterns
        )
    ),
})