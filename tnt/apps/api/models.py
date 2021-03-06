from django.db import models

class Calculation(models.Model):
    id = models.CharField(max_length=100, primary_key=True) 	# A unique hash we generate for the calculation
    name = models.TextField(default='')
    user_id = models.IntegerField()
    time_created = models.DateTimeField(null=True)
    time_run = models.DateTimeField(null=True)
    status = models.TextField(default='saved')
    setup = models.TextField() 	# JSON stringified version of the dict structure defining the calculation
