from rest_framework import serializers

from music.models import Album, Artist, Bookmark, Mood, Playlist, Song


class SimpleArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        exclude = ['user']


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'


class MoodSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True)

    class Meta:
        model = Mood
        fields = '__all__'


class PlaylistSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = '__all__'


class PlaylistPostSerializer(serializers.ModelSerializer):
    songs = serializers.CharField()

    class Meta:
        model = Playlist
        fields = '__all__'

    def create(self, validated_data):
        songs = map(int, validated_data.pop('songs').split(','))
        playlist = Playlist.objects.create(**validated_data)
        for song in songs:
            playlist.songs.add(song)
        return playlist

    def update(self, instance, validated_data):
        Playlist.objects.filter(id=instance.id).update(**validated_data)
        return Playlist.objects.filter(id=instance.id).first()


class AlbumSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True)

    class Meta:
        model = Album
        fields = '__all__'


class ArtistSerializer(serializers.ModelSerializer):
    songs = serializers.SerializerMethodField()
    albums = AlbumSerializer(many=True)

    def get_songs(self, obj):
        albums = Album.objects.filter(artist=obj)
        album_songs = set()
        for album in albums:
            album_songs.update(set(album.songs.all()))
        final = set(Song.objects.filter(artist=obj)) - album_songs
        return SongSerializer(final, many=True).data

    class Meta:
        model = Artist
        fields = '__all__'
