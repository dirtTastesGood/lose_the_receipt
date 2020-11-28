from rest_framework import serializers
from .models import Appliance

from accessories.serializers import AccessoryDetailSerializer


class ApplianceDetailSerializer(serializers.ModelSerializer):
    accessories = AccessoryDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Appliance
        fields = ['brand', 'appliance_type', 'model_number',
                  'serial_number', 'purchase_date', 'location',
                  'description', 'slug', 'accessories']


class ApplianceCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appliance
        fields = ['brand', 'appliance_type', 'model_number',
                  'serial_number', 'purchase_date', 'location',
                  'description', 'slug']
