# This file defines the operators available for building the system Hamiltonian

operators = \
[
	
	
	# Sigma X
	{
		'operator_id': 1, \
		'function_tex_str': '\sum_j \sigma_j^x', \
		'function_description': 'Sigma X', \
		'term_type': 'spin', \
		'U1_invariant': 0
	},
	
	# Sigma Y
	{
		'operator_id': 2, \
		'function_tex_str': '\sum_j \sigma_j^y', \
		'function_description': 'Sigma Y', \
		'term_type': 'spin', \
		'U1_invariant': 0
	},
	
	# Sigma Z
	{
		'operator_id': 3, \
		'function_tex_str': '\sum_j \sigma_j^z', \
		'function_description': 'Sigma Z', \
		'term_type': 'spin', \
		'U1_invariant': 1
	}, 

	# XX coupling
	{
		'operator_id': 4, \
		'function_tex_str': "\sum_{j,j+1} \sigma_x^z \sigma_{j+1}^x", \
		'function_description': 'XX Coupling', \
		'term_type': 'spin', \
		'U1_invariant': 0
	}, 

	# YY coupling
	{
		'operator_id': 5, \
		'function_tex_str': "\sum_{j,j+1} \sigma_y^z \sigma_{j+1}^y", \
		'function_description': 'YY Coupling', \
		'term_type': 'spin', \
		'U1_invariant': 0
	}, 

	# ZZ coupling
	{
		'operator_id': 6, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^z \sigma_{j+1}^z", \
		'function_description': 'ZZ Coupling', \
		'term_type': 'spin' \
		'U1_invariant': 1
	}, 
	
	# Hopping
	{
		'operator_id': 7, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^+ \sigma_{j+1}^- + \sigma_j^- \sigma_{j+1}^+ = 2\sum_{j,j+1} \sigma_j^x \sigma_{j+1}^x + \sigma_j^y \sigma_{j+1}^y", \
		'function_description': 'Hopping', \
		'term_type': 'spin' \
		'U1_invariant': 1
	}, 
	
	# Hopping with phase change
	{
		'operator_id': 8, \
		'function_tex_str': "\mathrm{i}\sum_{j,j+1} \sigma_j^+ \sigma_{j+1}^- - \sigma_j^- \sigma_{j+1}^+ = 2\sum_{j,j+1} \sigma_j^x \sigma_{j+1}^y - \sigma_j^y \sigma_{j+1}^x", \
		'function_description': 'Hopping with phase change', \
		'term_type': 'spin' \
		'U1_invariant': 1
	}, 
	
	# XY coupling
	{
		'operator_id': 9, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^x \sigma_{j+1}^y", \
		'function_description': 'XY Coupling', \
		'term_type': 'spin' \
		'U1_invariant': 0
	}, 
	
	# YX coupling
	{
		'operator_id': 10, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^y \sigma_{j+1}^x", \
		'function_description': 'YX Coupling', \
		'term_type': 'spin' \
		'U1_invariant': 0
	}, 
	
	# YZ coupling
	{
		'operator_id': 11, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^y \sigma_{j+1}^z", \
		'function_description': 'YZ Coupling', \
		'term_type': 'spin' \
		'U1_invariant': 0
	}, 
	
	# ZY coupling
	{
		'operator_id': 12, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^z \sigma_{j+1}^y", \
		'function_description': 'ZY Coupling', \
		'term_type': 'spin' \
		'U1_invariant': 0
	}, 
	
	# ZX coupling
	{
		'operator_id': 13, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^z \sigma_{j+1}^x", \
		'function_description': 'ZX Coupling', \
		'term_type': 'spin' \
		'U1_invariant': 0
	}, 
	
	# XZ coupling
	{
		'operator_id': 14, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^x \sigma_{j+1}^z", \
		'function_description': 'XZ Coupling', \
		'term_type': 'spin' \
		'U1_invariant': 0
	}

]
