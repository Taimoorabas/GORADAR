from django.shortcuts import render,redirect
from website.models import *

# Create your views here.

# User functions 

def main(request):
    print('farhan')
    return render(request, 'user/index.html')
def login(request):
    if request.method=='POST':
        
     username = request.POST.get('Username') 
     password = request.POST.get('password') 
     if username == 'lithium' and password == 'admin':
        print('loged in')
        return render(request,'devadmin/dashboard.html')
   
            
    return render(request,'devadmin/login.html')    
  

def dashboard(request):


   return render(request, 'devadmin/dashboard.html')

def job(request):
  
    farhan= job_details.objects.raw('select * from auth_job_details')
        
    
    

    return render(request,'user/jobs.html',{'farhan':farhan})

def jobs_detail(request):
    
    if request.method=='POST':

      first_name = request.POST.get('ob_application[first_name]')  
      last_name  = request.POST.get('job_application[last_name]')
      email = request.POST.get('job_application[email]')
      phone = request.POST.get('job_application[phone]')
      location = request.POST.get('job_application[location]')
      resume_CV = 'null'
      cover_letter = 'null'
      School = request.POST.get('job_application[educations][][school_name_id]')
      degree = request.POST.get('job_application[educations][][degree_id]')
      discipline = request.POST.get('job_application[educations][][discipline_id]')
      start_date = request.POST.get('job_application[month]')
      end_date = request.POST.get('job_application[year]')

      applicants=job_applicants(first_name=first_name,last_name=last_name,email=email,phone=phone,
      location=location,resume_CV=resume_CV,cover_letter=cover_letter,School=School,degree=degree,discipline=discipline,
      start_date=start_date,end_date=end_date)

      applicants.save()



    return render(request, 'user/jobs-detail.html')

# Admin Functions

def Add_job(request):
   
    if request.method=='POST':
   
     About_Job = request.POST.get('About_Job')

     print('farhan',About_Job)

    return render(request ,'devadmin/Add_job.html')