# This file defines the available spatial dependences of operators 

spatial_fns = \
[
	# A constant across the system
	{
		'spatial_fn_id': 1, \
		'function_tex_str': 'k', \
		'function_description': 'Constant', \
		'parameters': [{
			'parameter_id': 1, \
			'parameter_tex_str': 'k', \
			'parameter_name': 'Contant value', \
			'value': None
		}]
	}, 

	# A sin dependence on system size
	{
		'spatial_fn_id': 2, \
		'function_tex_str': 'A_0 + A \sin \left ( k j + \phi \right )', \
		'function_description': 'sin', \
		'parameters': [{
			'parameter_id': 1, \
			'parameter_tex_str': 'A_0', \
			'parameter_name': 'Mean value', \
			'value': None
		},{
			'parameter_id': 2, \
			'parameter_tex_str': 'A', \
			'parameter_name': 'Amplitude', \
			'value': None
		},{
			'parameter_id': 3, \
			'parameter_tex_str': 'k', \
			'parameter_name': 'Wave vector', \
			'value': None
		},{
			'parameter_id': 4, \
			'parameter_tex_str': '\phi', \
			'parameter_name': 'Phase shift', \
			'value': None
		}]
	}, 	
]