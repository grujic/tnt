# This file defines the available spatial dependences of operators 

operators = \
[
	
	# Sigma Z
	{
		'operator_id': 1, \
		'function_tex_str': '\sum_j \sigma_j^z', \
		'function_description': 'Sigma Z', \
		'term_type': 'spin'
	}, 

	# ZZ coupling
	{
		'operator_id': 2, \
		'function_tex_str': "\sum_{j,j'} \sigma_j^z \sigma_{j'}^z", \
		'function_description': 'ZZ Coupling', \
		'term_type': 'spin'
	}, 

]