# Generated by Django 2.2.19 on 2021-07-01 14:49

from django.db import migrations, models
import music.models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='video',
            field=models.FileField(blank=True, null=True, upload_to=music.models.song_upload_path_handler),
        ),
    ]
