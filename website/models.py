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

class job_applicants(models.Model):
    
    first_name = models.TextField()
    last_name = models.TextField()
    email = models.TextField()
    phone = models.TextField()
    location = models.TextField()
    resume_CV = models.TextField()
    cover_letter = models.TextField()
    School = models.TextField()
    degree = models.TextField()
    discipline = models.TextField()
    start_date = models.TextField()
    end_date = models.TextField()
    
    
    def str(self):
        return str(self.id)

    