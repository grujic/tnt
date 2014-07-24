from django.conf.urls import patterns, url
import views

urlpatterns = patterns('',

    ### Root of the REST API ###
    url(r'^[/]?$', \
        views.api_root, \
        name='api_root'),

    ### Info on available spatial dependences ###
    url(r'^spatial_functions[/]?$', \
        views.spatial_functions, \
        name='spatial_functions'),

)

