# Generated by Django 5.0.6 on 2024-07-17 19:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_rename_journay_journeydriver_journey'),
    ]

    operations = [
        migrations.AlterField(
            model_name='journeydriver',
            name='journey',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.journey'),
        ),
    ]
