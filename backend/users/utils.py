import jwt
import datetime
from uuid import uuid4
from django.conf import settings
from users.models import User, RefreshToken


def generate_access_token(user, expiry: dict):
    # unpack dict values into variables
    days, hours, minutes, seconds = [item[1] for item in expiry.items()]

    access_token_payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=days, hours=hours, minutes=minutes, seconds=seconds),
        'iat': datetime.datetime.utcnow(),
    }

    access_token = jwt.encode(
        access_token_payload,
        settings.SECRET_KEY,
        algorithm='HS256'
    )

    return access_token


def generate_refresh_token(user, expiry: dict):
    # unpack dict values into variables
    days, hours, minutes, seconds = [item[1] for item in expiry.items()]

    refresh_token_payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=days, hours=hours, minutes=minutes, seconds=seconds),
        'iat': datetime.datetime.utcnow()
    }

    # encode payload and decode jwt into a string
    refresh_token = jwt.encode(
        refresh_token_payload,
        settings.REFRESH_TOKEN_SECRET,
        algorithm='HS256'
    ).decode(encoding='utf-8')

    # convert refresh_token bytes object into utf-8 string
    return refresh_token
