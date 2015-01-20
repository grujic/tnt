# This file defines the operators available for building the system Hamiltonian

operators = \
[

	# Sigma X
	{
		'operator_id': 1, \
		'function_tex_str': '\hat{S}_j^x', \
		'function_description': 'Sx', \
		'term_type': 'spin', \
		'U1_invariant': False, \
        'U1_covariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': False, \
		'number_of_terms': 1
	},

	# Sigma Y
	{
		'operator_id': 2, \
		'function_tex_str': '\hat{S}_j^y', \
		'function_description': 'Sy', \
		'term_type': 'spin', \
		'U1_invariant': False, \
        'U1_covariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': False, \
		'number_of_terms': 1
	},

	# Sigma Z
	{
		'operator_id': 3, \
		'function_tex_str': '\hat{S}_j^z', \
		'function_description': 'Sz', \
		'term_type': 'spin', \
		'U1_invariant': True, \
        	'U1_covariant': True, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': False, \
		'number_of_terms': 1
	},

	# Sigma +
	{
		'operator_id': 4, \
		'function_tex_str': '\hat{S}_j^+', \
		'function_description': 'S+', \
		'term_type': 'spin', \
		'U1_invariant': False, \
        	'U1_covariant': True, \
		'complex': False, \
		'use_for_hamiltonian': False, \
		'use_for_expectation': False, \
		'use_for_transform': True, \
		'two_site': False
	},

	# Sigma -
	{
		'operator_id': 5, \
		'function_tex_str': '\hat{S}_j^-', \
		'function_description': 'S-', \
		'term_type': 'spin', \
		'U1_invariant': False, \
        	'U1_covariant': True, \
		'complex': False, \
		'use_for_hamiltonian': False, \
		'use_for_expectation': False, \
		'use_for_transform': True, \
		'two_site': False, \
		'number_of_terms': 1
	},

	# XX coupling
	{
		'operator_id': 6, \
		'function_tex_str': "\hat{S}_j^x \hat{S}_{j+1}^x", \
		'function_description': 'XX Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
        	'U1_covariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 1
	},

	# YY coupling
	{
		'operator_id': 7, \
		'function_tex_str': "\hat{S}_j^y \hat{S}_{j+1}^y", \
		'function_description': 'YY Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
        	'U1_covariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 1
	},

	# ZZ coupling
	{
		'operator_id': 8, \
		'function_tex_str': "\hat{S}_j^z \hat{S}_{j+1}^z", \
		'function_description': 'ZZ Coupling', \
		'term_type': 'spin', \
		'U1_invariant': True, \
        	'U1_covariant': True, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 1
	},

	# Hopping
	{
		'operator_id': 9, \
		'function_tex_str': "\hat{S}_j^+ \hat{S}_{j+1}^- + \mathrm{h.c.}", \
		'function_description': 'Hopping', \
		'term_type': 'spin', \
		'U1_invariant': True, \
        	'U1_covariant': True, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': False, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 2
	},

	# Hopping with phase change
	{
		'operator_id': 10, \
		'function_tex_str': "\mathrm{i}\hat{S}_j^+ \hat{S}_{j+1}^- + \mathrm{h.c.}", \
		'function_description': 'Hopping with phase change', \
		'term_type': 'spin', \
		'U1_invariant': True, \
        	'U1_covariant': True, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': False, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 2
	},

	# XY coupling
	{
		'operator_id': 11, \
		'function_tex_str': "\hat{S}_j^x \hat{S}_{j+1}^y", \
		'function_description': 'XY Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
        	'U1_covariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 1
	},

	# YX coupling
	{
		'operator_id': 12, \
		'function_tex_str': "\hat{S}_j^y \hat{S}_{j+1}^x", \
		'function_description': 'YX Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
        	'U1_covariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 1
	},

	# YZ coupling
	{
		'operator_id': 13, \
		'function_tex_str': "\hat{S}_j^y \hat{S}_{j+1}^z", \
		'function_description': 'YZ Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
        	'U1_covariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 1
	},

	# ZY coupling
	{
		'operator_id': 14, \
		'function_tex_str': "\hat{S}_j^z \hat{S}_{j+1}^y", \
		'function_description': 'ZY Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
        	'U1_covariant': False, \
		'complex': True, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 1
	},

	# ZX coupling
	{
		'operator_id': 15, \
		'function_tex_str': "\hat{S}_j^z \hat{S}_{j+1}^x", \
		'function_description': 'ZX Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
        	'U1_covariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 1
	},

	# XZ coupling
	{
		'operator_id': 16, \
		'function_tex_str': "\hat{S}_j^x \hat{S}_{j+1}^z", \
		'function_description': 'XZ Coupling', \
		'term_type': 'spin', \
		'U1_invariant': False, \
        	'U1_covariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 1
	},

	# Rotation
	{
		'operator_id': 17, \
		'function_tex_str': "\mathrm{exp}(\pi\mathrm{i}\hat{S}_j^y)", \
		'function_description': 'Spin flip', \
		'term_type': 'spin', \
		'U1_invariant': False, \
        'U1_covariant': False, \
		'complex': False, \
		'use_for_hamiltonian': False, \
		'use_for_expectation': False, \
		'use_for_transform': True, \
		'two_site': False, \
		'number_of_terms': 1
	},

	# Phase
	{
        'operator_id': 18, \
        'function_tex_str': "\mathrm{exp}(\pi\mathrm{i}\hat{S}_j^z)", \
        'function_description': 'Spin flip', \
        'term_type': 'spin', \
        'U1_invariant': True, \
        'U1_covariant': True, \
        'complex': False, \
        'use_for_hamiltonian': False, \
        'use_for_expectation': False, \
        'use_for_transform': True, \
        'two_site': False, \
        'number_of_terms': 1
    },

	###################### Bosonic terms start here ####################################

	# Number
	{
		'operator_id': 20, \
		'function_tex_str': "\hat{n}_j", \
		'function_description': 'Number', \
		'term_type': 'bosonic', \
		'U1_invariant': True, \
        	'U1_covariant': True, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': False, \
		'number_of_terms': 1
	},

	# On-site interaction
	{
		'operator_id': 21, \
		'function_tex_str': "\hat{n}_{j}(\hat{n}_{j}-1)/2", \
		'function_description': 'On-site interaction', \
		'term_type': 'bosonic', \
		'U1_invariant': True, \
        	'U1_covariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': False, \
		'number_of_terms': 1
	},

	# Coherent driving
	{
		'operator_id': 22, \
		'function_tex_str': "\hat{b}_{j}^{\dagger}+\hat{b}_{j}", \
		'function_description': 'Coherent driving', \
		'term_type': 'bosonic', \
		'U1_invariant': False, \
        	'U1_covariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': False, \
		'use_for_transform': False, \
		'two_site': False, \
		'number_of_terms': 2
	},

	# x-quadrature
	{
		'operator_id': 23, \
		'function_tex_str': "\hat{b}_{j}^{\dagger}+\hat{b}_{j}", \
		'function_description': 'x-quadrature', \
		'term_type': 'bosonic', \
		'U1_invariant': False, \
        	'U1_covariant': False, \
		'complex': False, \
		'use_for_hamiltonian': False, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': False, \
		'number_of_terms': 2
	},

	# p-quadrature
	{
		'operator_id': 24, \
		'function_tex_str': "\mathrm{i} ( \hat{b}_{j}^{\dagger}-\hat{b}_{j} )", \
		'function_description': 'p-quadrature', \
		'term_type': 'bosonic', \
		'U1_invariant': False, \
        	'U1_covariant': False, \
		'complex': False, \
		'use_for_hamiltonian': False, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': False, \
		'number_of_terms': 1
	},

	# Creation
	{
		'operator_id': 25, \
		'function_tex_str': "\hat{b}_{j}^{\dagger}", \
		'function_description': 'Creation', \
		'term_type': 'bosonic', \
		'U1_invariant': False, \
        	'U1_covariant': True, \
		'complex': False, \
		'use_for_hamiltonian': False, \
		'use_for_expectation': False, \
		'use_for_transform': True, \
		'two_site': False, \
		'number_of_terms': 1
	},

	# Annihilation
	{
		'operator_id': 26, \
		'function_tex_str': "\hat{b}_{j}", \
		'function_description': 'Annihilation', \
		'term_type': 'bosonic', \
		'U1_invariant': False, \
        	'U1_covariant': True, \
		'complex': False, \
		'use_for_hamiltonian': False, \
		'use_for_expectation': False, \
		'use_for_transform': True, \
		'two_site': False, \
		'number_of_terms': 1
	},

	# N-squared
	{
		'operator_id': 27, \
		'function_tex_str': "\hat{n}^2", \
		'function_description': 'N-squared', \
		'term_type': 'bosonic', \
		'U1_invariant': True, \
        	'U1_covariant': True, \
		'complex': False, \
		'use_for_hamiltonian': False, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': False, \
		'number_of_terms': 1
	},

	# Hopping
	{
		'operator_id': 28, \
		'function_tex_str': "\hat{b}_{j}^{\dagger}\hat{b}_{j+1}+\mathrm{h.c.}", \
		'function_description': 'Hopping', \
		'term_type': 'bosonic', \
		'U1_invariant': True, \
        	'U1_covariant': True, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': False, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 2
	},

	# Density-density
	{
		'operator_id': 29, \
		'function_tex_str': "\hat{n}_{j}\hat{n}_{j+1}", \
		'function_description': 'Density-density', \
		'term_type': 'bosonic', \
		'U1_invariant': True, \
        	'U1_covariant': True, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 1
	},

	# Parametric driving
	{
		'operator_id': 30, \
		'function_tex_str': "\hat{b}_{j}\hat{b}_{j+1}+\hat{b}_{j}^{\dagger}\hat{b}_{j+1}^{\dagger}", \
		'function_description': 'Parametric driving', \
		'term_type': 'bosonic', \
		'U1_invariant': False, \
        	'U1_covariant': False, \
		'complex': False, \
		'use_for_hamiltonian': True, \
		'use_for_expectation': False, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 2
	},

	# Bdagb
	{
		'operator_id': 31, \
		'function_tex_str': "\hat{b}_{j}^{\dagger}\hat{b}_{j+1}", \
		'function_description': 'bdag-b', \
		'term_type': 'bosonic', \
		'U1_invariant': True, \
        	'U1_covariant': True, \
		'complex': False, \
		'use_for_hamiltonian': False, \
		'use_for_expectation': True, \
		'use_for_transform': False, \
		'two_site': True, \
		'number_of_terms': 1
	},

	# Phase
	{
        'operator_id': 32, \
        'function_tex_str': "\mathrm{exp}(\pi\mathrm{i}\hat{n}_j)", \
        'function_description': 'Phase', \
        'term_type': 'bosonic', \
        'U1_invariant': True, \
        'U1_covariant': True, \
        'complex': False, \
        'use_for_hamiltonian': False, \
        'use_for_expectation': False, \
        'use_for_transform': True, \
        'two_site': False, \
        'number_of_terms': 1
        },

]
