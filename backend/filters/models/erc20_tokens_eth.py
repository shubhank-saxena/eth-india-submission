from django.db import models


class ERC20TokensEth(models.Model):
    contract_address = models.TextField()
    name = models.TextField()
    symbol = models.TextField()
    image_link = models.TextField()
    website = models.TextField()
    explorer_link = models.TextField()
    description = models.TextField()

    class Meta:
        managed = False
        db_table = 'erc20_metadata_ethereum'
