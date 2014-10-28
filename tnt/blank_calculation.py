# An example of a blank calculation JSON structure which serves as a template when defining new calculations

blank_calculation_template = \
{

	'meta_info': {
		'user': {
			'email': None,
			'id': None
		},
		'date_created': None,
		'date_run': None,
		'finished': False,
		'id': None,
		'name': None,
		'status': None
	},

	'setup': {

		'system': {
			'chi': None,
			'system_size': None,
			'time_step': None,
			'num_time_steps': None,
			'system_type': {
				'name': None,
				'extra_info': {
				}
			},
			'calculation_type': None,
			'calculate_ground_state': None
		},

		'hamiltonian': {
			'terms': []
		},

		'initial_state': {
			'base_state': {},
			'applied_operators': {
                'type': None,
                'applied_operators': []
            }
		},

		'expectation_values': {
			'operators': []
		}

	}
}
