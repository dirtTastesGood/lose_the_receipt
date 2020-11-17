from django.db import models
from django.contrib.auth import get_user_model


class Appliance(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    brand = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    appliance_type = models.CharField(max_length=50)
    model_number = models.CharField(max_length=50, blank=True)
    serial_number = models.CharField(max_length=50, unique=True, blank=True, error_messages={
                                     'unique': 'An appliance already exists with that serial number'})
    purchase_date = models.DateField(blank=True, null=True)
    last_serviced = models.DateField(blank=True, null=True)
    # images
    # category = models.ManyToManyField(Category)
    description = models.TextField(max_length=10000, blank=True, null=True)
    manual_url = models.URLField(blank=True, null=True)
    slug = models.SlugField(max_length=200)

    def __str__(self):
        return f'{self.owner}\'s {self.brand} {self.appliance_type}'
