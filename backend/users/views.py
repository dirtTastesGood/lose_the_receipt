import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect

from rest_framework import status
from rest_framework import exceptions
from rest_framework.decorators import (
    api_view, permission_classes,
    authentication_classes
)
# from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .utils import generate_access_token, generate_refresh_token

from .models import User, RefreshToken
from .serializers import UserCreateSerializer, UserDetailSerializer
from .authentication import SafeJWTAuthentication


@api_view(['GET'])
@authentication_classes([SafeJWTAuthentication])
@permission_classes([IsAuthenticated])
def user_list(request):
    users = User.objects.all()
    serializer = UserDetailSerializer(users, many=True)

    return Response(data=serializer.data)


@api_view(['GET'])
@authentication_classes([])
def user_detail(request, pk):
    user = get_object_or_404(get_user_model(), pk=pk)
    serializer = UserDetailSerializer(user, many=False)

    return Response(data=serializer.data)


@api_view(['POST'])
def user_create(request):
    new_user_serializer = UserCreateSerializer(
        data=request.data
    )

    if new_user_serializer.is_valid():
        new_user = new_user_serializer.save()

        return Response(new_user_serializer.data, status=status.HTTP_201_CREATED)

    return Response(new_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_edit(request, pk):
    if request.method == 'GET':
        user = get_object_or_404(get_user_model(), pk=pk)
        serializer = UserCreateSerializer(user, many=False)

        return Response(data=serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(
            data=request.data,
            partial=True,
        )

        if serializer.is_valid():
            serializer.save()

            return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((AllowAny,))
@ensure_csrf_cookie
def login(request):
    # TO DO:
    # Delete old refresh token if it exists
    # Associate refresh token to user in db
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')
        response = Response()

        if email is None or password is None:
            response.data = {'msg': 'Email and password required.'}
            response.status_code = status.HTTP_400_BAD_REQUEST
            return response

        user = User.objects.filter(email=email).first()

        if user is None or not user.check_password(password):
            response.data = {
                'msg': 'Incorrect email or password'
            }
            response.status_code = status.HTTP_400_BAD_REQUEST
            return response

        # generate access and refresh tokens for the current user
        access_token = generate_access_token(user)
        refresh_token = generate_refresh_token(user)

        try:
            # if the user has a refresh token in the db, 
            # get the old token
            old_refresh_token = RefreshToken.objects.get(user=user.id)
            # delete the old token
            old_refresh_token.delete()
            # generate new token
            RefreshToken.objects.create(user=user, token=refresh_token)

        except RefreshToken.DoesNotExist:
            # assign a new refresh token to the current user
            RefreshToken.objects.create(user=user, token=refresh_token)

        response.set_cookie(
            key='refreshtoken',
            value=refresh_token,
            httponly=True,
            domain='localhost',
            samesite='strict',
            # secure=True # for https connections only
        )

        response.data = {
            'access_token': access_token
        }
        response.status_code = status.HTTP_200_OK
        return response


@api_view(['GET'])
@permission_classes([AllowAny])
# @authentication_classes([])
@csrf_protect
def refresh_token(request):
    response = Response()
    refresh_token = request.COOKIES.get('refreshtoken')

    if refresh_token is None:
        response.data = {
            'msg':'Authentication credentials were not provided'
        }
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return response
    
    try:
        payload = jwt.decode(
            refresh_token,
            settings.REFRESH_TOKEN_SECRET,
            algorithms=["HS256"]
        )
    except jwt.ExpiredSignatureError:
        # TO DO:
        # REMOVE EXPIRED REFRESH TOKEN FROM DB
        response.data = {
            'msg': 'Expired refresh token, please log in again.'
        }
        response.status_code = status.HTTP_401_UNAUTHORIZED
        response.delete_cookie('refreshtoken')
        return response

    user = User.objects.filter(id=payload.get('user_id')).first()
    if user is None:
        response.data = {
            'msg': 'User not found'
        }
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return response

    if not user.is_active:
        response.data = {
            'msg': 'User is inactive'
        }
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return response


    new_access_token = generate_access_token(user)
    return Response(data={'accessToken': new_access_token})

