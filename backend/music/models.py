from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.

User = get_user_model()


def song_upload_path_handler(instance, filename):
    return "music/{name}/{file}".format(name=instance.name, file=filename)


class Artist(models.Model):
    name = models.CharField(max_length=250)
    image = models.ImageField(upload_to="artist", null=True, blank=True)

    def __str__(self):
        return self.name


class Song(models.Model):
    name = models.CharField(max_length=250)
    vocals = models.TextField(
        null=True, blank=True, help_text="Enter ';' seperated values for different entries")
    instrumentalist = models.TextField(
        null=True, blank=True, help_text="Enter ';' seperated values for different entries")
    composer = models.TextField(
        null=True, blank=True, help_text="Enter ';' seperated values for different entries")
    engineering = models.TextField(
        null=True, blank=True, help_text="Enter ';' seperated values for different entries")
    backstory = models.TextField(blank=True)
    normal_audio = models.FileField(upload_to=song_upload_path_handler)
    spacial_audio = models.FileField(
        upload_to=song_upload_path_handler, null=True, blank=True)
    normal_audio_with_meditation = models.FileField(
        upload_to=song_upload_path_handler, null=True, blank=True)
    spacial_audio_with_meditation = models.FileField(
        upload_to=song_upload_path_handler, null=True, blank=True)
    video = models.FileField(
        upload_to=song_upload_path_handler, null=True, blank=True)
    image = models.ImageField(upload_to="moods", null=True, blank=True)

    def __str__(self):
        return self.name


class Mood(models.Model):
    name = models.CharField(max_length=250)
    songs = models.ManyToManyField(Song)
    image = models.ImageField(upload_to="moods", null=True, blank=True)

    def __str__(self):
        return self.name


class Album(models.Model):
    name = models.CharField(max_length=250)
    artist = models.ForeignKey(
        Artist, related_name="albums", on_delete=models.SET_NULL, null=True, blank=True)
    songs = models.ManyToManyField(Song)
    image = models.ImageField(upload_to="album", null=True, blank=True)

    def __str__(self):
        return self.name


class Playlist(models.Model):
    name = models.CharField(max_length=250)
    user = models.ForeignKey(User, related_name='playlists',
                             on_delete=models.CASCADE, null=True, blank=True)
    celebrity_name = models.CharField(max_length=250, null=True, blank=True)
    songs = models.ManyToManyField(Song)
    image = models.ImageField(upload_to="playlist", null=True, blank=True)

    def __str__(self):
        return self.name


class Bookmark(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='bookmarks')
    song = models.ForeignKey('Song', on_delete=models.CASCADE)
    start_min = models.PositiveIntegerField()
    start_sec = models.PositiveIntegerField()
    end_min = models.PositiveIntegerField()
    end_sec = models.PositiveIntegerField()
