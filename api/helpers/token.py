# https://github.com/jpadilla/pyjwt 
import jwt
from decouple import config

class Token:

    def __init__(self):
        self.secret = config('SECRET_KEY')
        self.algorithm = 'HS256'

    def encode(self, payload):
        return jwt.encode(payload, self.secret, algorithm=self.algorithm)

    def decode(self, encoded):
        return jwt.decode(encoded, self.secret, algorithms=[self.algorithm])

    def verify(self, encoded):
        try:
            return self.decode(encoded)
        except:
            return None

token = Token()
