from django.db import models

class Calculation(models.Model):
    id = models.CharField(max_length=100, primary_key=True) 	# A unique hash we generate for the calculation
    user_id = models.IntegerField()
    status = models.TextField(default='saved') 
    setup = models.TextField() 	# JSON stringified version of the dict structure defining the calculation    