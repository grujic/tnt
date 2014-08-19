from django.shortcuts import render
from django.contrib.auth import logout
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf

from django.http import HttpResponseRedirect

from userprofile.models import MyUser

# Create your views here.
def login(request):

    return render(request, \
                  'dashboard/login.html')

def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/login/')

def landing(request):
    state = "Please enter an email and password..."
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        print("username = ")
        print(username)

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

    return render(request, 'dashboard/landing.html', args)

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
