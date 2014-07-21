from django.shortcuts import render
from django.contrib.auth import logout
from django.http import HttpResponseRedirect

# Create your views here.
def login(request):

    return render(request, \
                  'dashboard/login.html')

def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/login/')

def home(request):

    return render(request, \
                  'dashboard/home.html')

def form_wizard_example(request):

    return render(request, \
                  'dashboard/home.html')
