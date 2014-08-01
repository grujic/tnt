# This file defines the available modifications we can apply to initial base states

initial_state_modifiers_list = \
[
	# Spin system - spin flip up at one site
	{
		'initial_base_state_id': 1, \
		'function_tex_str': '| 	\hat {\sigma}_j^+', \
		'function_description': 'Spin flip up', \
		'parameters': [{
			'parameter_tex_str': 'j', \
			'parameter_name': 'flip site', \
			'value': None
		}]
	}, 

	# Spin system - spin flip down at one site
	{
		'initial_base_state_id': 2, \
		'function_tex_str': '| 	\hat {\sigma}_j^-', \
		'function_description': 'Spin flip down', \
		'parameters': [{
			'parameter_tex_str': 'j', \
			'parameter_name': 'flip site', \
			'value': None
		}]
	}
	
]