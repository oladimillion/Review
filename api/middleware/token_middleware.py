from api.models import Member
from api.helpers import get_object, token

class TokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        auth = request.headers.get('Authorization', None)

        if auth:
            split_auth = auth.split(' ')
            request.member = None
            if len(split_auth) == 2:
                bearer, auth_token = split_auth
                decoded = token.verify(auth_token) or {}
                request.member = get_object(Member, id=decoded.get("mid"))

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response
