from django.views.generic import RedirectView
from django.conf.urls import patterns, include, url
from django.contrib.auth.decorators import login_required
import views

urlpatterns = patterns('',
    url(r'^login$', \
        views.login, \
        name='login'),

    url(r'^home$', \
        views.home, \
        name='home'),
)
