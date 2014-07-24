from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

    url(r'',
        include('tnt.apps.dashboard.urls',
        namespace='dashboard')),

    ### Internal TNT API ###
    url(r'^api/v1.0/',
        include('tnt.apps.api.urls',
        namespace='api')),

    url(r'^admin/', include(admin.site.urls)),
)
