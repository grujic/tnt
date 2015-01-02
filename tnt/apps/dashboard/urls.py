from django.views.generic import RedirectView
from django.conf.urls import patterns, include, url
from django.contrib.auth.decorators import login_required
import views

urlpatterns = patterns('',

    url(r'^login[/]?$', \
        'django.contrib.auth.views.login', {'template_name': 'dashboard/signin.html'}),

    url(r'^logout[/]?$', \
        views.logout_view,
        name='logout_view'),

    url(r'^signup[/]?$', \
        views.signup,
        name='signup'),

    # User home view, showing their past calculations and ability to start a new one
    # What they see when they first log in
    url(r'^[/]?$', \
        views.home, \
        name='home'),

    # Set up a new calculationne
    url(r'^new_calculation[/]?$', \
        views.new_calculation, \
        name='new_calculation'),

    # Explore a calculation's expectation values etc in the browser
    url(r'^calculation/explore/(?P<calculation_id>[^/]+)[/]?$', \
        views.explore_calculation, \
        name='explore_calculation'),

    # Summary of calculation's important parameters
    url(r'^calculation/parameters/(?P<calculation_id>[^/]+)[/]?$', \
        views.calculation_parameters, \
        name='calculation_parameters'),

    # FAQ page
    url(r'^faq[/]?$', \
        views.faq, \
        name='faq'),

)
