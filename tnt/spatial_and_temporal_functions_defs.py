# This file defines the available spatial dependences of operators
# Largest id = 8

fns = \
[
	# This special term is to designate that there's NO temporal dependence
    {
		'id': 0, \
		'function_tex_str': '', \
		'function_description': 'No dependence', \
		'use_for_spatial_hamil': False, \
		'use_for_temporal_hamil': True, \
		'use_for_sum_modifier': False, \
		'use_for_product_modifier': False, \
		'use_for_product_modifier_noncovariant': False, \
		'parameters': []
	},


	# A constant across the system
	{
		'id': 1, \
		'function_tex_str': 'k', \
		'function_description': 'Constant', \
		'use_for_spatial_hamil': True, \
		'use_for_temporal_hamil': True, \
		'use_for_sum_modifier': True, \
		'use_for_product_modifier': True, \
		'use_for_product_modifier_noncovariant': True, \
		'parameters': [{
			'parameter_id': 1, \
			'parameter_tex_str': 'k', \
			'parameter_name': 'Contant value', \
			'value': None, \
			'parameter_default_value': 1
		}]
	},

	# Linear
	{
		'id': 2, \
		'function_tex_str': 'a + bj', \
		'function_description': 'Linear', \
		'use_for_spatial_hamil': True, \
		'use_for_temporal_hamil': True, \
		'use_for_sum_modifier': True, \
		'use_for_product_modifier': False, \
		'use_for_product_modifier_noncovariant': True, \
		'parameters': [{
			'parameter_id': 1, \
			'parameter_tex_str': 'a', \
			'parameter_name': 'Offset', \
			'value': None, \
			'parameter_default_value': 0
		},{
			'parameter_id': 2, \
			'parameter_tex_str': 'b', \
			'parameter_name': 'Gradient', \
			'value': None, \
			'parameter_default_value': 1
		}]
	},

	# Quadratic
	{
		'id': 3, \
		'function_tex_str': 'a + b(j-j_c)^2', \
		'function_description': 'Quadratic', \
		'use_for_spatial_hamil': True, \
		'use_for_temporal_hamil': True, \
		'use_for_sum_modifier': True, \
		'use_for_product_modifier': False, \
		'use_for_product_modifier_noncovariant': True, \
		'parameters': [{
			'parameter_id': 1, \
			'parameter_tex_str': 'a', \
			'parameter_name': 'Offset', \
			'value': None, \
			'parameter_default_value': 0
		},{
			'parameter_id': 2, \
			'parameter_tex_str': 'b', \
			'parameter_name': 'Scaling', \
			'value': None, \
			'parameter_default_value': 1
		},{
			'parameter_id': 3, \
			'parameter_tex_str': 'j_c', \
			'parameter_name': 'Centre', \
			'value': None, \
			'parameter_default_value': 5, \
            'parameter_default_dynamic_value': "Math.floor(L/2) + 1"
		}]
	},

	# Gaussian
	{
        'id': 8, \
        'function_tex_str': 'A\exp[(j-j_c)^2/2w^2]', \
        'function_description': 'Gaussian', \
        'use_for_spatial_hamil': True, \
        'use_for_temporal_hamil': True, \
        'use_for_sum_modifier': True, \
        'use_for_product_modifier': False, \
        'use_for_product_modifier_noncovariant': True, \
        'parameters': [{
            'parameter_id': 1, \
            'parameter_tex_str': 'A', \
            'parameter_name': 'Amplitude', \
            'value': None, \
            'parameter_default_value': 1
        },{
            'parameter_id': 2, \
            'parameter_tex_str': 'j_c', \
            'parameter_name': 'Centre', \
            'value': None, \
            'parameter_default_value': 5, \
            'parameter_default_dynamic_value': "Math.floor(L/2) + 1"
        },{
            'parameter_id': 3, \
            'parameter_tex_str': 'w', \
            'parameter_name': 'Width', \
            'value': None, \
            'parameter_default_value': 3
        }]
    },

	# A sin dependence on system size
	{
		'id': 4, \
		'function_tex_str': 'C + A \sin [ 2 \pi ( k j + \phi ) ]', \
		'function_description': 'Sinusoidal', \
		'use_for_spatial_hamil': True, \
		'use_for_temporal_hamil': True, \
		'use_for_sum_modifier': True, \
		'use_for_product_modifier': False, \
		'use_for_product_modifier_noncovariant': True, \
		'parameters': [{
			'parameter_id': 1, \
			'parameter_tex_str': 'C', \
			'parameter_name': 'Mean value', \
			'value': None, \
			'parameter_default_value': 0
		},{
			'parameter_id': 2, \
			'parameter_tex_str': 'A', \
			'parameter_name': 'Amplitude', \
			'value': None, \
			'parameter_default_value': 1
		},{
			'parameter_id': 3, \
			'parameter_tex_str': 'k', \
			'parameter_name': 'Wave vector', \
			'value': None, \
			'parameter_default_value': 5
		},{
			'parameter_id': 4, \
			'parameter_tex_str': '\phi', \
			'parameter_name': 'Phase shift', \
			'value': None, \
			'parameter_default_value': 0
		}]
	},

	# Step function
	{
		'id': 5, \
		'function_tex_str': 'A H(j_s)', \
		'function_description': 'Heaviside step function', \
		'use_for_spatial_hamil': True, \
		'use_for_temporal_hamil': True, \
		'use_for_sum_modifier': True, \
		'use_for_product_modifier': True, \
		'use_for_product_modifier_noncovariant': True, \
		'parameters': [{
			'parameter_id': 1, \
			'parameter_tex_str': 'A', \
			'parameter_name': 'Maximum value', \
			'value': None, \
			'parameter_default_value': 1
		},{
			'parameter_id': 2, \
			'parameter_tex_str': 'j_s', \
			'parameter_name': 'Step position', \
			'value': None, \
			'parameter_default_value': 5, \
            'parameter_default_dynamic_value': "Math.floor(L/2) + 1"
		}]
	},

	# Rectangular function
	{
		'id': 6, \
		'function_tex_str': 'A \mathrm{rect}((j-j_c)/w)', \
		'function_description': 'Rectangular function', \
		'use_for_spatial_hamil': True, \
		'use_for_temporal_hamil': True, \
		'use_for_sum_modifier': True, \
		'use_for_product_modifier': True, \
		'use_for_product_modifier_noncovariant': True, \
		'parameters': [{
			'parameter_id': 1, \
			'parameter_tex_str': 'A', \
			'parameter_name': 'Maximum value', \
			'value': None, \
			'parameter_default_value': 1
		},{
			'parameter_id': 2, \
			'parameter_tex_str': 'j_c', \
			'parameter_name': 'Centre', \
			'value': None, \
			'parameter_default_value': 5
		},{
			'parameter_id': 3, \
			'parameter_tex_str': 'w', \
			'parameter_name': 'Width', \
			'value': None, \
			'parameter_default_value': 1
		}]
	},

	# Delta function
	{
		'id': 7, \
		'function_tex_str': 'A \delta(j-j_c)', \
		'function_description': 'Delta function', \
		'use_for_spatial_hamil': True, \
		'use_for_temporal_hamil': True, \
		'use_for_sum_modifier': True, \
		'use_for_product_modifier': True, \
		'use_for_product_modifier_noncovariant': True, \
		'parameters': [{
			'parameter_id': 1, \
			'parameter_tex_str': 'A', \
			'parameter_name': 'Maximum value', \
			'value': None, \
			'parameter_default_value': 1
		},{
			'parameter_id': 2, \
			'parameter_tex_str': 'j_c', \
			'parameter_name': 'Centre', \
			'value': None, \
			'parameter_default_value': 5, \
            'parameter_default_dynamic_value': "Math.floor(L/2) + 1"
		}]
	}
]
