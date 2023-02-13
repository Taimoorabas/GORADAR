
from django.urls import path
from website import views


urlpatterns = [
    #  -----------------> User side <----------------------------
      
    path('', views.main,name='main'),
    path('main', views.main,name='main'),
    path('job', views.job,name='job'),
    path('job-detail', views.jobs_detail,name='job-detail'),

   # ------------------> Devadmin <---------------------------   

    path('Add_job', views.Add_job, name='Add_job'),
    path('admin', views.login, name='admin'),
    path('dashboard' , views.dashboard, name='dashboard')
]