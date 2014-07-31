# This file defines the available initial base states (which may be further modified by applying modifying oeprators)

initial_base_states_list = \
[
	# Spin system - all spins down
	{
		'initial_base_state_id': 1, \
		'function_tex_str': "| 	\downarrow 	\downarrow \cdots \downarrow \rangle", \
		'function_description': 'All spins down', \
		'system_type': 'spin'
	}, 

	# Spin system - all spins up
	{
		'initial_base_state_id': 1, \
		'function_tex_str': '| 	\uparrow 	\uparrow \cdots \uparrow \rangle', \
		'function_description': 'All spins up', \
		'system_type': 'spin'
	}

]
