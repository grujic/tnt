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
			'chi': 10,
			'system_size': 10,
            'time': {
                'time_step': None,
                'num_time_steps': None,
                'num_expval_time_steps': None
            },
			'system_type': {
				'name': "spin",
				'extra_info': {
                    "spin_magnitude": 1
				}
			},
			'calculate_ground_state': None,
            'number_conservation': {
                'ground': {
                    'apply_qn': None,
                    'qn': None
                },
                'dynamic': {
                    'apply_qn': None,
                    'qn': None
                }
            }
		},

		'hamiltonian': {
            'ground': {
                'terms': []
            },
            'dynamic': {
                'terms': []
            }
		},

		'initial_state': {
			'base_state': {},
            'renormalise': None,
            'applied_mpos': []
		},

		'expectation_values': {
            'calculate_overlap_with_ground': None,
            'calculate_overlap_with_initial': None,
			'operators': []
		}

	}
}
