from django.urls import include, path
from home.api.v1.viewsets import (CustomTextViewSet, HomePageViewSet,
                                  LoginViewSet, SignupViewSet, UserViewSet)
from music.models import Bookmark
from music.views import (AlbumViewSet, ArtistViewSet, BookmarkViewSet,
                         MoodViewSet, PlaylistViewSet, SongViewSet)
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
    HomePageViewSet,
    CustomTextViewSet,
    StripeViewSet
)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("customtext", CustomTextViewSet)
router.register("homepage", HomePageViewSet)
router.register("user", UserViewSet, basename='user')
router.register("music/mood", MoodViewSet, basename='mood')
router.register("music/playlist", PlaylistViewSet, basename='playlist')
router.register("music/album", AlbumViewSet, basename='album')
router.register("music/artist", ArtistViewSet, basename='artist')
router.register("music/song", SongViewSet, basename='song')
router.register("music/bookmark", BookmarkViewSet, basename='bookmark')
router.register("stripe", StripeViewSet, basename="stripe")

urlpatterns = [
    path("", include(router.urls)),
]
