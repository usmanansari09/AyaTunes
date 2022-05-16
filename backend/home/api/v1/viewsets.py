from django.contrib.auth import get_user_model
from home.api.v1.serializers import (CustomTextSerializer, HomePageSerializer,
                                     SignupSerializer, TierSerializer,
                                     UserSerializer)
from home.models import CustomText, HomePage
from home.utils import convert_base64_to_file
from rest_framework import authentication
from rest_framework.authentication import (SessionAuthentication,
                                           TokenAuthentication)
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import IsAdminUser,IsAuthenticated,AllowAny
from rest_framework.viewsets import ModelViewSet, ViewSet
from users.models import Tier
from home.api.v1.serializers import (
    SignupSerializer,
    CustomTextSerializer,
    HomePageSerializer,
    UserSerializer,
)
from django.conf import settings
import stripe
from users.models import Orders,Invoices
from home.models import CustomText, HomePage
from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework import status

class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        return Response({"token": token.key, "user": user_serializer.data})


class CustomTextViewSet(ModelViewSet):
    serializer_class = CustomTextSerializer
    queryset = CustomText.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "put", "patch"]


class HomePageViewSet(ModelViewSet):
    serializer_class = HomePageSerializer
    queryset = HomePage.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "put", "patch"]


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=['get'])
    def get_user_profile(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(methods=['post'], detail=False)
    def set_profile_picture(self, request, pk=None):
        image = request.data['image']
        request.user.profile_picture = convert_base64_to_file(image)
        request.user.save()
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def close_account(self, request):
        request.user.delete()
        return Response({'detail': "Account closed successfully"})

    @action(detail=False, methods=['get'])
    def get_tier(self, request):
        tiers = Tier.objects.all()
        return Response(TierSerializer(tiers, many=True).data)

    @action(detail=False, methods=['post'])
    def set_tier(self, request):
        tier_id = request.data.get('id')
        if not tier_id:
            return Response({'error': 'Tier ID is required'})
        request.user.set_tier(tier_id)
        return Response(self.get_serializer(request.user).data)


class StripeViewSet(ViewSet):

    @action(methods=["get"], detail=False, permission_classes=[IsAuthenticated],authentication_classes = (TokenAuthentication,))
    def products(self, request):
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


    @action(methods=["post"], detail=False, permission_classes=[IsAuthenticated],authentication_classes = (TokenAuthentication,))
    def payment_handle(self, request):
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
            return Response(data={"error": "Something went wrong."},
                            status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["post"], detail=False, permission_classes=[AllowAny])                        
    def order_webhook(self, request):
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
            return Response(data={"error": "Something went wrong."},
                            status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.SignatureVerificationError as e:
                # Invalid signature
            return Response(data={"error": "Something went wrong."},
                            status=status.HTTP_400_BAD_REQUEST)

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