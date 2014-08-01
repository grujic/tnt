from django.db import models

class Calculation(models.Model):
    id = models.CharField(max_length=100, primary_key=True) 	# A unique hash we generate for the calculation
    user_id = models.IntegerField()
    of_the_round_table = models.BooleanField()# Create your models here.
    status = models.TextField(default='saved') 
    setup = models.TextField() 	# JSON stringified version of the dict structure defining the calculation    