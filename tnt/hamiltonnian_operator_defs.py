# This file defines the operators available for building the system Hamiltonian

operators = \
[	
	
	# Sigma X
	{
		'operator_id': 1, \
		'function_tex_str': '\sum_j \hat{S}_j^x', \
		'function_description': 'Sigma X', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': False
	},
	
	# Sigma Y
	{
		'operator_id': 2, \
		'function_tex_str': '\sum_j \hat{S}_j^y', \
		'function_description': 'Sigma Y', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': False
	},
	
	# Sigma Z
	{
		'operator_id': 3, \
		'function_tex_str': '\sum_j \hat{S}_j^z', \
		'function_description': 'Sigma Z', \
		'term_type': 'spin', \
		'U1_invariant': True, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': False
	}, 

	# XX coupling
	{
		'operator_id': 4, \
		'function_tex_str': "\sum_{j} \hat{S}_x^z \hat{S}_{j+1}^x", \
		'function_description': 'XX Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': True
	}, 

	# YY coupling
	{
		'operator_id': 5, \
		'function_tex_str': "\sum_{j} \hat{S}_y^z \hat{S}_{j+1}^y", \
		'function_description': 'YY Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': True
	}, 

	# ZZ coupling
	{
		'operator_id': 6, \
		'function_tex_str': "\sum_{j} \hat{S}_j^z \hat{S}_{j+1}^z", \
		'function_description': 'ZZ Coupling', \
		'term_type': 'spin', \
		'U1_invariant': True, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': True
	}, 
	
	# Hopping
	{
		'operator_id': 7, \
		'function_tex_str': "\sum_j \hat{S}_j^+ \hat{S}_{j+1}^- + \mathrm{h.c.} = 2\sum_{j} \hat{S}_j^x \hat{S}_{j+1}^x + \hat{S}_j^y \hat{S}_{j+1}^y", \
		'function_description': 'Hopping', \
		'term_type': 'spin', \
		'U1_invariant': True, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': True
	}, 
	
	# Hopping with phase change
	{
		'operator_id': 8, \
		'function_tex_str': "\sum_j \mathrm{i}\hat{S}_j^+ \hat{S}_{j+1}^- + \mathrm{h.c.} = 2\sum_{j,j+1} \hat{S}_j^x \hat{S}_{j+1}^y - \hat{S}_j^y \hat{S}_{j+1}^x", \
		'function_description': 'Hopping with phase change', \
		'term_type': 'spin', \
		'U1_invariant': True, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': True
	}, 
	
	# XY coupling
	{
		'operator_id': 9, \
		'function_tex_str': "\sum_{j} \hat{S}_j^x \hat{S}_{j+1}^y", \
		'function_description': 'XY Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': True
	}, 
	
	# YX coupling
	{
		'operator_id': 10, \
		'function_tex_str': "\sum_{j} \sigma_j^y \sigma_{j+1}^x", \
		'function_description': 'YX Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': True
	}, 
	
	# YZ coupling
	{
		'operator_id': 11, \
		'function_tex_str': "\sum_{j} \hat{S}_j^y \hat{S}_{j+1}^z", \
		'function_description': 'YZ Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': True
	}, 
	
	# ZY coupling
	{
		'operator_id': 12, \
		'function_tex_str': "\sum_{j} \hat{S}_j^z \hat{S}_{j+1}^y", \
		'function_description': 'ZY Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': True
	}, 
	
	# ZX coupling
	{
		'operator_id': 13, \
		'function_tex_str': "\sum_{j} \hat{S}_j^z \hat{S}_{j+1}^x", \
		'function_description': 'ZX Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': True
	}, 
	
	# XZ coupling
	{
		'operator_id': 14, \
		'function_tex_str': "\sum_{j} \hat{S}_j^x \hat{S}_{j+1}^z", \
		'function_description': 'XZ Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'two_site': True
	}

]
