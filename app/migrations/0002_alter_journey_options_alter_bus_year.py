# Generated by Django 5.0.6 on 2024-07-07 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='journey',
            options={},
        ),
        migrations.AlterField(
            model_name='bus',
            name='year',
            field=models.CharField(max_length=4),
        ),
    ]
