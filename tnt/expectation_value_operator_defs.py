# This file defines the available operators that we can take expectation values of 

operators = \
[
	
	# Sigma Z
	{
		'operator_id': 1, \
		'function_tex_str': '\sigma^z', \
		'function_description': 'Sigma Z', \
		'term_type': 'spin', \
		'complex': False
	}, 

	# Sigma X
	{
		'operator_id': 2, \
		'function_tex_str': '\sigma^x', \
		'function_description': 'Sigma X', \
		'term_type': 'spin', \
		'complex': True
	}, 

]