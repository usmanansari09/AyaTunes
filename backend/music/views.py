from django.db.models import Q
from rest_framework.authentication import (SessionAuthentication,
                                           TokenAuthentication)
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from music.models import Album, Artist, Bookmark, Mood, Playlist, Song
from music.serializers import (AlbumSerializer, ArtistSerializer,
                               BookmarkSerializer, MoodSerializer,
                               PlaylistPostSerializer, PlaylistSerializer,
                               SongSerializer)

# Create your views here.


class MoodViewSet(ModelViewSet):
    serializer_class = MoodSerializer
    queryset = Mood.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated]
    http_method_names = ["get"]


class AlbumViewSet(ModelViewSet):
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated]
    http_method_names = ["get"]


class PlaylistViewSet(ModelViewSet):
    serializer_class = PlaylistSerializer
    queryset = Playlist.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PATCH', 'PUT']:
            return PlaylistPostSerializer
        return self.serializer_class

    def get_queryset(self):
        return Playlist.objects.filter(Q(user=self.request.user) | Q(user=None))

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def add_songs(self, request, pk):
        songs = request.data.get('songs', [])
        for song in songs:
            self.get_object().songs.add(song)
        return Response(self.serializer_class(self.get_object()).data)

    @action(detail=True, methods=['post'])
    def remove_songs(self, request, pk):
        songs = request.data.get('songs', [])
        for song in songs:
            self.get_object().songs.remove(song)
        return Response(self.serializer_class(self.get_object()).data)


class ArtistViewSet(ModelViewSet):
    serializer_class = ArtistSerializer
    queryset = Artist.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated]
    http_method_names = ["get"]


class SongViewSet(ModelViewSet):
    serializer_class = SongSerializer
    queryset = Song.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated]
    http_method_names = ["get"]

    def get_queryset(self):
        query = self.request.query_params.get('query')
        songs = Song.objects.all()
        if query:
            songs = songs.filter(name__icontains=query)
        return songs

    @action(detail=True, methods=['get'])
    def bookmarks(self, request, pk):
        return Response(BookmarkSerializer(Bookmark.objects.filter(user=request.user, song=self.get_object()), many=True).data)


class BookmarkViewSet(ModelViewSet):
    serializer_class = BookmarkSerializer
    queryset = Bookmark.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        song_id = self.request.query_params.get('song_id')
        bookmarks = Bookmark.objects.filter(user=self.request.user)
        if song_id:
            return bookmarks.filter(song__id=song_id)
        return bookmarks

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
