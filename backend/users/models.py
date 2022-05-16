from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
import uuid
from django.utils import timezone

def hex_uuid():
    return uuid.uuid4().hex
class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True,
                            null=True, max_length=255)
    profile_picture = models.ImageField(blank=True, null=True,)
    stripe_id = models.CharField(_("Subscription Customer ID"), blank=True, null=True, max_length=100)
    stripe_subscription_id = models.CharField(_("Subscription ID"), blank=True, null=True, max_length=100)
    sub_date = models.DateField(
        null=True, blank=True, verbose_name="Subscription Date")

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def set_tier(self, tier_id):
        self.tier = Tier.objects.get(id=tier_id)
        self.save()


class Tier(models.Model):
    name = models.CharField(max_length=250, null=True, blank=True)
    description = models.TextField(blank=True)
    price = models.FloatField(
        help_text="Price to be used while charging the user")
    display_price = models.CharField(
        max_length=250, help_text="Price to show the user, eg: $6/month", null=True, blank=True)
    order = models.PositiveIntegerField(
        help_text="Order in which the tier will be rendered", null=True, blank=True)
    trial_duration = models.PositiveIntegerField(
        help_text="Number of days allowed for trial", default=0)
    base_tier = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Orders(models.Model):
    id = models.AutoField(primary_key=True)
    order_id = models.CharField(default=hex_uuid(),max_length=32, editable=False)
    created_date = models.DateTimeField(_('created date'), default=timezone.now,editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True,
    related_name="order_user")
    subscription_id = models.CharField(_('subscription id'), max_length=250, null=True, blank=True,)
    monthly = models.BooleanField(default=True)
    status = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("Order")
        verbose_name_plural = _("Orders")
        db_table = 'orders'    
        default_permissions = ()  

    def __str__(self):
        return '%s' % (self.order_id)


class Invoices(models.Model):
    id = models.AutoField(primary_key=True)
    invoice_id = models.CharField(default=hex_uuid(),max_length=32, editable=False)
    order = models.ForeignKey(Orders, on_delete=models.CASCADE,null=True, blank=True,
    related_name="invoice_orders")
    invoice_stripe_id = models.CharField(_('invoice stripe id'), max_length=250, null=True, blank=True,)
    updated_date = models.DateTimeField(auto_now=True)
    created_date = models.DateTimeField(_('created date'), default=timezone.now,editable=False)

    class Meta:
        verbose_name = _("Invoices")
        verbose_name_plural = _("Invoice")
        db_table = 'invoices'    
        default_permissions = ()  

    def __str__(self):
        return '%s' % (self.invoices_id)