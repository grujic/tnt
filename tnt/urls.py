from django.conf.urls import patterns, include, url

from django.conf import settings

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

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))