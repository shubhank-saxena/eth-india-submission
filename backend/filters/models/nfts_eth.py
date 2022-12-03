from django.db import models


class NFTsEth(models.Model):
    banner_image = models.TextField(blank=True, null=True)
    collection_image = models.TextField(blank=True, null=True)
    collection_name = models.TextField()
    buy_now_slug = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    deployment_date = models.IntegerField(blank=True, null=True)
    collection_category = models.TextField(blank=True, null=True)
    chain_type = models.TextField(blank=True, null=True)
    contract_address = models.TextField(primary_key=True)
    twitter_slug = models.TextField(blank=True, null=True)
    no_of_twitter_followers = models.TextField(blank=True, null=True)
    discord_link = models.TextField(blank=True, null=True)
    no_of_discord_members = models.TextField(blank=True, null=True)
    website_link = models.TextField(blank=True, null=True)
    no_of_items = models.IntegerField(blank=True, null=True)
    is_verified = models.BooleanField(blank=False, null=True)
    is_active = models.BooleanField(blank=False, default=False)
    floor_price = models.DecimalField(max_digits=30, decimal_places=2)
    volume = models.DecimalField(max_digits=30, decimal_places=2, blank=True, null=True)
    market_cap = models.DecimalField(max_digits=30, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'contracts'
