from django.db import models
from django.contrib.auth import get_user_model

class Receipt(models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    purchase_date = models.DateTimeField(blank=True, null=True)
    # images = models.ManyToOne()

    def __str__(self):
        return self.title
