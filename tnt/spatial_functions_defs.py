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
	
	# Linear
	{
		'spatial_fn_id': 2, \
		'function_tex_str': 'a + bj', \
		'function_description': 'Linear', \
		'parameters': [{
			'parameter_id': 1, \
			'parameter_tex_str': 'a', \
			'parameter_name': 'Offset', \
			'value': None
		},{
			'parameter_id': 2, \
			'parameter_tex_str': 'b', \
			'parameter_name': 'Gradient', \
			'value': None
		}]
	},
	
	# Quadratic
	{
		'spatial_fn_id': 3, \
		'function_tex_str': 'a + b(j-j_c)^2', \
		'function_description': 'Quadratic', \
		'parameters': [{
			'parameter_id': 1, \
			'parameter_tex_str': 'a', \
			'parameter_name': 'Offset', \
			'value': None
		},{
			'parameter_id': 2, \
			'parameter_tex_str': 'b', \
			'parameter_name': 'Scaling', \
			'value': None
		},{
			'parameter_id': 3, \
			'parameter_tex_str': 'j_c', \
			'parameter_name': 'Centre', \
			'value': None
		}]
	},

	# A sin dependence on system size
	{
		'spatial_fn_id': 4, \
		'function_tex_str': 'A_0 + A \sin \left ( k j + \phi \right )', \
		'function_description': 'Sinusoidal', \
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
	
	# Step function
	{
		'spatial_fn_id': 5, \
		'function_tex_str': 'A H(j_s)', \
		'function_description': 'Heaviside step function', \
		'parameters': [{
			'parameter_id': 1, \
			'parameter_tex_str': 'A', \
			'parameter_name': 'Maximum value', \
			'value': 1
		},{
			'parameter_id': 2, \
			'parameter_tex_str': 'j_s', \
			'parameter_name': 'Step position', \
			'value': None
		}]
	}
]
