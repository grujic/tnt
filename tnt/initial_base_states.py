# This file defines the available initial base states (which may be further modified by applying modifying oeprators)

initial_base_states_list = \
[
	# Use the calculated ground state as the initial state
	{
		'initial_base_state_id': 0, \
		'function_tex_str': '|\Psi \rangle', \
		'function_description': 'Ground state', \
		'system_type': 'all'
	}, 

	# Spin system - all spins down
	{
		'initial_base_state_id': 1, \
		'function_tex_str': "| 	\downarrow \downarrow \cdots \downarrow \rangle", \
		'function_description': 'All spins down', \
		'system_type': 'spin'
	}, 

	# Spin system - all spins up
	{
		'initial_base_state_id': 2, \
		'function_tex_str': '| 	\uparrow \uparrow \cdots \uparrow \rangle', \
		'function_description': 'All spins up', \
		'system_type': 'spin'
	},
	
	# Spin system - left half spins up
	{
		'initial_base_state_id': 3, \
		'function_tex_str': '| 	\uparrow \uparrow \cdots \uparrow \downarrow \downarrow \cdots \downarrow \rangle', \
		'function_description': 'Left half spins up, right half spins down', \
		'system_type': 'spin'
	},
	
	# Spin system - alternating spins
	{
		'initial_base_state_id': 4, \
		'function_tex_str': '| 	\uparrow \downarrow \uparrow \downarrow \cdots \uparrow \downarrow \rangle', \
		'function_description': 'Alternating spins', \
		'system_type': 'spin'
	}, 
	
	# Boson system - all sites occupied
	{
		'initial_base_state_id': 5, \
		'function_tex_str': "| 	1 1 \cdots 1 \rangle", \
		'function_description': 'All sites occupied', \
		'system_type': 'bosonic'
	}, 
	
	# Boson system - vacuum
	{
		'initial_base_state_id': 6, \
		'function_tex_str': "| 	0 0 \cdots 0 \rangle", \
		'function_description': 'All sites unoccupied', \
		'system_type': 'bosonic'
	}, 
	

]
