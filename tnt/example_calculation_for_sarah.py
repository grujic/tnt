# An example of a blank calculation JSON structure which serves as a template when defining new calculations

blank_calculation_template = \
{
	
	'meta_info': {
		'user': {
			'email': 'thomas.grujic@gmail.com', 
			'id': 1
		}, 
		'date_created': 1407228351, 
		'finished': False, 
		'id': '376230f1-1d02-4aac-8da4-c1244fa02c06',
		'name': 'Trial calculation'
	},

	'setup': {
		
		'system': {
			'chi': 30,
			'system_size': 10,
			'time_step': 0.01,
			'num_time_steps': 100,
			'system_type': 'spin',
			'calculation_type': 'real_time_unitary'
		},

		'hamiltonian': {
			'terms': [
				
				{
		            
		            "operator_id": 2, 
		            "term_type": "spin", 
		            "function_tex_str": "\\sum_{j,j'} \\sigma_j^z \\sigma_{j'}^z", 
		            "function_description": "ZZ Coupling",
		            "spatial": {
			            "spatial_fn_id": 2, 
			            "parameters": [
			                {
			                    "value": 1, 
			                    "parameter_tex_str": "k", 
			                    "parameter_name": "Contant value"
			                }
			            ], 
			            "function_tex_str": "k", 
			            "function_description": "Constant"
			        }

		        },


				{
            		"operator_id": 1, 
            		"term_type": "spin", 
            		"function_tex_str": "\\sum_j \\sigma_j^z", 
            		"function_description": "Sigma Z", 
            		"spatial": {
			            "spatial_fn_id": 2, 
			            "parameters": [
			                {
			                    "value": 1, 
			                    "parameter_tex_str": "A_0", 
			                    "parameter_name": "Mean value"
			                }, 
			                {
			                    "value": 0.5, 
			                    "parameter_tex_str": "A", 
			                    "parameter_name": "Amplitude"
			                }, 
			                {
			                    "value": 1, 
			                    "parameter_tex_str": "k", 
			                    "parameter_name": "Wave vector"
			                }, 
			                {
			                    "value": 0, 
			                    "parameter_tex_str": "\\phi", 
			                    "parameter_name": "Phase shift"
			                }
			            ], 
			            "function_tex_str": "A_0 + A \\sin \\left ( k j + \\phi \right )", 
			            "function_description": "sin"
			        }
        		},
        	]
		},

		'initial_state': {
			
			'base_state': {
	            "initial_base_state_id": 1, 
	            "system_type": "spin", 
	            "function_tex_str": "| \t\\downarrow \t\\downarrow \\cdots \\downarrow \rangle", 
	            "function_description": "All spins down"
	        },

			'applied_operators': [
				{
			        "initial_base_state_id": 1, 
			        "parameters": [
			            {
			                "value": 5, 
			                "parameter_tex_str": "j", 
			                "parameter_name": "flip site"
			            }
			        ], 
			        "function_tex_str": "| \t\\hat {\\sigma}_j^+", 
			        "function_description": "Spin flip up"
			    }
			]
		}, 

		'expectation_values': {
			'operators': [
				{
		            "operator_id": 1, 
		            "term_type": "spin", 
		            "function_tex_str": "\\sigma^z", 
		            "function_description": "Sigma Z"
		        },
		        {
		            "operator_id": 2, 
		            "term_type": "spin", 
		            "function_tex_str": "\\sigma^x", 
		            "function_description": "Sigma X"
		        }
		    ]
		}

	}

}