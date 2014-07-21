from django.views.generic import RedirectView
from django.conf.urls import patterns, include, url
from django.contrib.auth.decorators import login_required
import views

urlpatterns = patterns('',
    url(r'^login[/]?$', \
        'django.contrib.auth.views.login'),

    url(r'^logout[/]?$', \
        views.logout_view,
        name='logout_view'),

    url(r'^home[/]?$', \
        views.home, \
        name='home'),

    url(r'^form_wizard_example[/]?$', \
        views.form_wizard_example, \
        name='form_wizard_example'),

)
