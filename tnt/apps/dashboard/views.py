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
    # Users's home page showing previous calculations and ability to create a new one
    return render(request, \
                  'dashboard/home.html')

def new_calculation(request):
    # Page to define a new calculation
    return render(request, \
                  'dashboard/new_calculation.html')

def calculations(request):
    # See all your calculations
    return render(request, \
                  'dashboard/calculations.html')

def explore_calculation(request, calculation_id):
    # Explore a calculation's expectation values etc in the browser
    return render(request, \
                  'dashboard/explore_calculation.html')



def faq(request):
    # Page for FAQ
    return render(request, \
                  'dashboard/faq.html')
