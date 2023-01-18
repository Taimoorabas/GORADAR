from django.shortcuts import render
from website.models import *
# Create your views here.

# User functions 

def main(request):
    print('farhan')
    return render(request, 'user/main.html')

def job(request):
  
    farhan= job_details.objects.raw('select * from auth_job_details')
        
    
    

    return render(request,'user/job.html',{'farhan':farhan})

def jobs_detail(request):
    
    print('job-details')

    return render(request, 'user/jops-detail.html')

# Admin Functions

def Add_job(request):
   
    if request.method=='POST':
   
     About_Job = request.POST.get('About_Job')

     print('farhan',About_Job)

    return render(request ,'devadmin/Add_job.html')