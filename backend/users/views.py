from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import DetailView, RedirectView, UpdateView
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import AllowAny
import stripe
User = get_user_model()
from django.conf import settings
from .models import Orders,Invoices
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import (SessionAuthentication,
                                           TokenAuthentication)
                                           
class UserDetailView(LoginRequiredMixin, DetailView):

    model = User
    slug_field = "username"
    slug_url_kwarg = "username"


user_detail_view = UserDetailView.as_view()


class UserUpdateView(LoginRequiredMixin, UpdateView):

    model = User
    fields = ["name"]

    def get_success_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})

    def get_object(self):
        return User.objects.get(username=self.request.user.username)


user_update_view = UserUpdateView.as_view()


class UserRedirectView(LoginRequiredMixin, RedirectView):

    permanent = False

    def get_redirect_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})


user_redirect_view = UserRedirectView.as_view()

@csrf_exempt
@api_view(('POST',))
@permission_classes([AllowAny])
def order_webhook(request):
  event = None
  payload = request.body
  sig_header = request.META['HTTP_STRIPE_SIGNATURE']
  endpoint_secret = settings.STRIPE_LIVE_WEBHOOK
  try:
      event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
  except ValueError as e:
        # Invalid payload
      raise e
  except stripe.error.SignatureVerificationError as e:
        # Invalid signature
      raise e  
  if event['type'] == 'invoice.paid':
    invoice = event['data']['object']
    order = Orders.objects.filter(user__stripe_id=invoice.customer).first()
    if order:
      order.status = True
      order.save()
      invoice_db = Invoices.objects.create(invoice_stripe_id=invoice.id,order=order)
    return Response(status=200, data={'status':'done'})
  else:
    return Response(status=200, data={'status':'error'})
  

@api_view(('POST',))
def payment_handle(request):
  try:
    if settings.DEBUG:
        stripe.api_key = settings.STRIPE_TEST_SECRET_KEY
    else:
        stripe.api_key = settings.STRIPE_LIVE_SECRET_KEY

    subscription = stripe.Subscription.create(
      customer=request.user.stripe_id,
      items=[
        {
          'price': request.POST.get('price', '')
        }
      ],
      payment_behavior='default_incomplete',
      expand=['latest_invoice.payment_intent'],
    )
    order_find = Orders.objects.filter(user=request.user,status=False).first()
    if order_find:
      order_find.delete()
    if request.POST.get('payment_type', '') == 'true':
      order = Orders.objects.create(user=request.user,subscription_id=subscription.id,monthly=False,status=False)
    else:
      order = Orders.objects.create(user=request.user,subscription_id=subscription.id,monthly=True,status=False)
    return Response(status=200, data={'subscriptionId':subscription.id, 'clientSecret':subscription.latest_invoice.payment_intent.client_secret})
  except Exception as e:
    print(e)
    return Response(data={"error": "Something went wrong."},
                            status=status.HTTP_400_BAD_REQUEST)


@api_view(('GET',))
@authentication_classes([TokenAuthentication])
def products(request):
  if settings.DEBUG:
    stripe.api_key = settings.STRIPE_TEST_SECRET_KEY
  else:
    stripe.api_key = settings.STRIPE_LIVE_SECRET_KEY
  product_p = stripe.Product.list(limit=10,expand=['data.price'])
  pl = 0
  for product in product_p:
    prices = stripe.Price.list(limit=10,product=product.id,active=True)
    product_p.data[pl].prices = prices
    pl = pl + 1
  return Response(status=200, data={'products':product_p.data, "stripe_token":settings.STRIPE_TEST_PUBLIC_KEY})

