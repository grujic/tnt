# This file defines the operators available for building the system Hamiltonian

operators = \
[
	
	
	# Sigma X
	{
		'operator_id': 1, \
		'function_tex_str': '\sum_j \sigma_j^x', \
		'function_description': 'Sigma X', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	},
	
	# Sigma Y
	{
		'operator_id': 2, \
		'function_tex_str': '\sum_j \sigma_j^y', \
		'function_description': 'Sigma Y', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	},
	
	# Sigma Z
	{
		'operator_id': 3, \
		'function_tex_str': '\sum_j \sigma_j^z', \
		'function_description': 'Sigma Z', \
		'term_type': 'spin', \
		'U1_invariant': True, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	}, 

	# XX coupling
	{
		'operator_id': 4, \
		'function_tex_str': "\sum_{j,j+1} \sigma_x^z \sigma_{j+1}^x", \
		'function_description': 'XX Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	}, 

	# YY coupling
	{
		'operator_id': 5, \
		'function_tex_str': "\sum_{j,j+1} \sigma_y^z \sigma_{j+1}^y", \
		'function_description': 'YY Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	}, 

	# ZZ coupling
	{
		'operator_id': 6, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^z \sigma_{j+1}^z", \
		'function_description': 'ZZ Coupling', \
		'term_type': 'spin', \
		'U1_invariant': True, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	}, 
	
	# Hopping
	{
		'operator_id': 7, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^+ \sigma_{j+1}^- + \sigma_j^- \sigma_{j+1}^+ = 2\sum_{j,j+1} \sigma_j^x \sigma_{j+1}^x + \sigma_j^y \sigma_{j+1}^y", \
		'function_description': 'Hopping', \
		'term_type': 'spin', \
		'U1_invariant': True, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	}, 
	
	# Hopping with phase change
	{
		'operator_id': 8, \
		'function_tex_str': "\mathrm{i}\sum_{j,j+1} \sigma_j^+ \sigma_{j+1}^- - \sigma_j^- \sigma_{j+1}^+ = 2\sum_{j,j+1} \sigma_j^x \sigma_{j+1}^y - \sigma_j^y \sigma_{j+1}^x", \
		'function_description': 'Hopping with phase change', \
		'term_type': 'spin', \
		'U1_invariant': True, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	}, 
	
	# XY coupling
	{
		'operator_id': 9, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^x \sigma_{j+1}^y", \
		'function_description': 'XY Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	}, 
	
	# YX coupling
	{
		'operator_id': 10, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^y \sigma_{j+1}^x", \
		'function_description': 'YX Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	}, 
	
	# YZ coupling
	{
		'operator_id': 11, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^y \sigma_{j+1}^z", \
		'function_description': 'YZ Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	}, 
	
	# ZY coupling
	{
		'operator_id': 12, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^z \sigma_{j+1}^y", \
		'function_description': 'ZY Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	}, 
	
	# ZX coupling
	{
		'operator_id': 13, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^z \sigma_{j+1}^x", \
		'function_description': 'ZX Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	}, 
	
	# XZ coupling
	{
		'operator_id': 14, \
		'function_tex_str': "\sum_{j,j+1} \sigma_j^x \sigma_{j+1}^z", \
		'function_description': 'XZ Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True
	}

]
