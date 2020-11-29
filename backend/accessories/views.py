from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.contrib.auth import get_user_model
from django.db.models import Q
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

from .serializers import AccessoryCreateSerializer, AccessoryDetailSerializer
from users.serializers import UserDetailSerializer


@api_view(['POST', 'GET'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def accessory_list(request, slug):

    print(slug)

    response = Response()

    user = get_user_model().objects.filter(id=request.user.id).first()

    # ADD accessory
    if request.method == 'POST':
        appliance = Appliance.objects.filter(slug=slug).first()

        formData = request.data['formData']

        # add initial data to accessory serializer
        serialized_accessory = AccessoryCreateSerializer(data=formData)

        accessory_slug = slugify(formData['name'])
        # check if the slug already exists for current appliance,
        # if so, add a counter

        duplicate_slugs = Accessory.objects.filter(
            Q(appliance=appliance) & Q(slug__startswith=accessory_slug)
        )

        if duplicate_slugs:
            accessory_slug = f"{formData['name']}-{len(duplicate_slugs)}"

        serialized_accessory.initial_data['slug'] = accessory_slug

        serialized_accessory.initial_data['appliance'] = appliance.id

        if serialized_accessory.is_valid():

            new_accessory = serialized_accessory.save(
                owner=user)

            appliance.accessories.add(new_accessory)

            # appliance.accessories.add(new_accessory)
            # new_accessory.appliances.add(appliance)

            response.data = {
                'accessory': serialized_accessory.validated_data,
            }
        else:
            response.data = {
                'msg': serialized_accessory.errors,
                'data': serialized_accessory.initial_data
            }

        return response

    elif request.method == 'GET':
        ...
