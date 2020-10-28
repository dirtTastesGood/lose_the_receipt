from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify


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
    manual_url = models.URLField(blank=True, null=True)
    slug = models.SlugField(max_length=200)

    def save(self, *args, **kwargs):
        self.slug = slugify(
            f'{self.brand} {self.appliance_type} {self.location}')
        super(Appliance, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.owner}\'s {self.brand} {self.appliance_type}'
