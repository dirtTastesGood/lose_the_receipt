# Generated by Django 3.1.1 on 2020-11-01 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appliances', '0007_auto_20201028_2319'),
    ]

    operations = [
        migrations.AddField(
            model_name='appliance',
            name='description',
            field=models.TextField(blank=True, max_length=10000, null=True),
        ),
    ]