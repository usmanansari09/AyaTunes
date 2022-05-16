# Generated by Django 2.2.24 on 2021-09-09 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20210618_1715'),
    ]

    operations = [
        migrations.AddField(
            model_name='tier',
            name='base_tier',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='sub_date',
            field=models.DateField(blank=True, null=True, verbose_name='Subscription Date'),
        ),
    ]