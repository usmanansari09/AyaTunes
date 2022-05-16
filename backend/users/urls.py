from django.urls import path
from . import views
from users.views import (
    user_redirect_view,
    user_update_view,
    user_detail_view,
)

app_name = "users"
urlpatterns = [
    path("~redirect/", view=user_redirect_view, name="redirect"),
    path("~update/", view=user_update_view, name="update"),
    path("<str:username>/", view=user_detail_view, name="detail"),
    path('order/webhook/', views.order_webhook, name='order_webhook'),
    path('payment_handle/', views.payment_handle, name='payment_handle'),
]
