from django.contrib import admin

from music.models import Album, Artist, Mood, Playlist, Song

# Register your models here.

admin.site.register(Song)


@admin.register(Mood)
class MoodAdmin(admin.ModelAdmin):
    filter_horizontal = ['songs']


@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    filter_horizontal = ['songs']


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    filter_horizontal = ['songs']
