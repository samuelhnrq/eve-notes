from asgiref.wsgi import WsgiToAsgi
from eve import Eve

from .auth import JWTAuth

app = Eve(auth=JWTAuth)
app.config.from_prefixed_env()
asgi_app = WsgiToAsgi(app)
