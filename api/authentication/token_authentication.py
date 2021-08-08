from rest_framework import authentication

class TokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        try:
            member = request.member
            return (member, None)
        except:
            return None
