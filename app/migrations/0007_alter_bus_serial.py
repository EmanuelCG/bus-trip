# Generated by Django 5.0.6 on 2025-02-15 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_remove_journeydriver_sold_capacity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bus',
            name='serial',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
