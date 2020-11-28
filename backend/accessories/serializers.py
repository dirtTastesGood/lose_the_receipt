from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Accessory
from appliances.models import Appliance


class AccessoryDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Accessory
        fields = '__all__'


class AccessoryCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Accessory
        fields = ['name', 'description', 'model_number',
                  'serial_number', 'purchase_date', 'notes', 'slug']
