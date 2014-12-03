from django.conf.urls import patterns, url
import views

urlpatterns = patterns('',

    ### Root of the REST API ###
    url(r'^[/]?$', \
        views.api_root, \
        name='api_root'),

    ### START OF API CALLS FOR DEFINITIONS, e.g. available Hamiltonian operators etc ###

    ### Info on available spatial dependences ###
    url(r'^spatial_and_temporal_functions[/]?$', \
        views.spatial_and_temporal_functions, \
        name='spatial_and_temporal_functions'),

    ### Info on available Hamiltonian operators ###
    url(r'^operators[/]?$', \
        views.operators, \
        name='operators'),

    ### Example JSON structure representing a blank calculation to use as a template ###
    url(r'^blank_calculation[/]?$', \
        views.blank_calculation, \
        name='blank_calculation'),

    ### Info on available initial base states ###
    url(r'^initial_base_states[/]?$', \
        views.initial_base_states, \
        name='initial_base_states'),

    ### Info on available initial base states ###
    url(r'^initial_state_modifiers[/]?$', \
        views.initial_state_modifiers, \
        name='initial_state_modifiers'),

    ### END OF API CALLS FOR DEFINITIONS, e.g. available Hamiltonian operators etc ###

    ### START OF API CALLS FOR info about calculations ###

    ### Return JSON representation of a stored calculation ###

    url(r'^calculations[/]?$', \
        views.calculations, \
        name='calculations'),

    url(r'^calculation/show/(?P<calculation_id>[^/]+)[/]?$', \
        views.show_calculation, \
        name='show_calculation'),

    ### Delete calculation with the given ID ###
    url(r'^calculation/delete/(?P<calculation_id>[^/]+)[/]?$', \
        views.delete_calculation, \
        name='delete_calculation'),

    ### Get a list of the URLs at which we can find the image files for the results of a calculation ###
    url(r'^calculation/img_results_urls/(?P<calculation_id>[^/]+)[/]?$', \
        views.get_expectation_img_urls, \
        name='get_expectation_img_urls'),

    ### Save calculation which is POSTed to this URL ###
    url(r'^calculation/save[/]?$', \
        views.save_calculation, \
        name='save_calculation'),

    url(r'^calculation/run[/]?$', \
    views.run_calculation, \
    name='run_calculation'),

    ### END OF API CALLS FOR info about calculations ###

    ### START OF API CALLS FOR info about users ###

    ### END OF API CALLS FOR info about users ###

)

