from django.db import models
from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    # Simulation history details
    num_jobs = models.IntegerField(blank=True, null=True)
