from django.db import models
from django.contrib.auth import get_user_model

class Appliance(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    brand = models.CharField(max_length=50)
    model_number = models.CharField(max_length=50)
    serial_number = models.CharField(max_length=50)
    purchase_date = models.DateTimeField(blank=True, null=True)
    last_serviced = models.DateTimeField(blank=True, null=True)
    # images
    # category = models.ManyToManyField(Category)
    manual_url = models.URLField(blank=True, null=True)
