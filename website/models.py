from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class job_details(models.Model):
    job_name = models.TextField(max_length=100)
    about_us = models.TextField()
    job_location = models.TextField(max_length=100)
    about_job = models.TextField()
    job_responsibilites = models.TextField()
    job_requirement = models.TextField()
    job_preferred = models.TextField()
    
    def str(self):
        return str(self.id)

    