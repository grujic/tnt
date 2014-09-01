from django.shortcuts import render
from django.contrib.auth import logout
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf

from django.db import IntegrityError
from django.contrib.auth import authenticate, login

from django.http import HttpResponseRedirect

from django.contrib.auth.decorators import login_required

from userprofile.models import MyUser

# Create your views here.

def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/login/')

def signup(request):
    state = "Please enter an email and password..."
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        print("email = ")
        print(email)

        print("password = ")
        print(password)

        try:
            
            MyUser.objects.create_user(email, password=password)
            user = authenticate(username=email, password=password)
            
            login(request, user)
            state = "You're successfully logged in!"
            return HttpResponseRedirect('/')

        except IntegrityError:  # User name already in DB
            state = "Email " + email + " already exists, try another"

    args = {}
    args.update(csrf(request))
    args['state'] = state

    return render(request, 'dashboard/signup.html', args)

@login_required
def home(request):
    # Users's home page showing previous calculations and ability to create a new one
    return render(request, \
                  'dashboard/home.html')

@login_required
def new_calculation(request):
    # Page to define a new calculation
    return render(request, \
                  'dashboard/new_calculation.html')

@login_required
def calculations(request):
    # See all your calculations
    return render(request, \
                  'dashboard/calculations.html')

@login_required
def explore_calculation(request, calculation_id):
    # Explore a calculation's expectation values etc in the browser
    return render(request, \
                  'dashboard/explore_calculation.html', \
                  {'calculation_id': calculation_id})

def faq(request):
    # Page for FAQ
    return render(request, \
                  'dashboard/faq.html')
