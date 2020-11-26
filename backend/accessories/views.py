from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework import status, pagination
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from django.utils.text import slugify


from users.authentication import SafeJWTAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Accessory
from appliances.models import Appliance


@api_view(['POST', 'GET'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def accessory_list(request, slug):
    response = Response()

    appliance = Appliance.objects.filter(slug=slug).first()

    # ADD accessory
    if request.method == 'POST':

        # set accessory.appliance to appliance variable
        # serialize request data
        #

        response.data = {
            'data': request.data,
        }
        return response

    elif request.method == 'GET':
        ...
