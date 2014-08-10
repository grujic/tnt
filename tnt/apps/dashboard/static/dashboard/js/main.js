// Namespace for tnt
var tnt = {

	render_mathjax: function () {
		MathJax.Hub.Typeset(); 
	},

	initialise_blank_calculation: function () {
		// Pull in the blank template for a calculation and set window.calculaton = the template
		$.get('/api/v1.0/blank_calculation', 
			function (data) {
				window.calculation = data;
				window.calculation.meta_info.user.email = window.user.email;
	  			window.calculation.meta_info.user.id = window.user.id;
	  			console.log("Initialised blank calculation. ");
	  			console.log(window.calculation);
			}
		);
	}, // End of initialise_blank_calculation

	load_spatial_function_definitions: function() {
		// Make an API call and 
		console.log("Loading spatial function definitions...");
		$.get('/api/v1.0/spatial_functions', 
			function(data) {
				window.spatial_fns = data;
			}
		).done(function() {
    		console.log("Loaded spatial function definitions");
  		});

	},	// End of load_spatial_function_definitions

	render_available_hamiltonian_operators: function () {
		// If window.calculation_type is not defined, render all available operators, otherwise filter
		$.get("/api/v1.0/hamiltonian_operators", 
			function (data) {
				
				if (window.calculation_type === undefined) {
					var filtered_data = data;
				} else {
					var filtered_data = {'operators': _.filter(data.operators, function(el) {return el['term_type'] == "spin"})};
				}

				// Keep this data available:
				window.hamiltonian_operators = filtered_data;

				var source = $("#hamiltonian-operator-template").html();
				var template = Handlebars.compile(source);
				$("#new_calculation_available_hamiltonian_operators").html(template(filtered_data));
				
				$(".hamiltonian-operator-btn")
					.click(function() {
						console.log($(this).data("operator-id"));
						tnt.add_hamiltonian_term($(this).data("operator-id"));
					});

			}
		).done(function() {
    		tnt.render_mathjax();
  		});

	}, // End of render_available_hamiltonian_operators

	render_available_initial_base_states: function () {
		// If window.calculation_type is not defined, render all available initial base states, otherwise filter
		$.get("/api/v1.0/initial_base_states", 
			function (data) {
				
				if (window.calculation_type === undefined) {
					var filtered_data = data;
				} else {
					var filtered_data = {'states': _.filter(data.states, function(el) {return el['system_type'] == "spin"})};
				}

				console.log(filtered_data);

				var source = $("#initial-base-states-template").html();
				var template = Handlebars.compile(source);
				$("#new_calculation_available_initial_base_states").html(template(filtered_data));
				tnt.render_mathjax(); 

			}
		).done(function() {
    		tnt.render_mathjax();
  		});

	}, // End of render_available_initial_base_states

	add_hamiltonian_term: function(operator_id) {
		// Add a visual representation of a Hamiltonian term to the screen, and render any user input elements necessary (e.g. inputs for spatial parameter values)
		
		// First get the right operator
		var hamiltonian_operator = _.filter(window.hamiltonian_operators.operators, function (el) {return el.operator_id == operator_id;})[0];
		var source = $("#hamiltonian-term-template").html();
		var template = Handlebars.compile(source);
		$("#hamiltonian_terms_container").append(template(hamiltonian_operator));
		tnt.render_mathjax();
		$("#no_hamiltonian_terms_added_yet_warning").css('display', 'none');
	},

	clear_all_new_calculation_stages: function() {
		// Set display: none for each of the 'pages' of the new calculation setup
		$(".new-calculation-step").css('display', 'none');
	},

	// Following is a list of functions that verify data input and also set up the various data input panels for a new calculation
	initialise_new_calculation_basic_setup_step: function () {
		// 
		console.log("Initialising new calculation basic setup input");
		tnt.clear_all_new_calculation_stages();
		$("#new_calculation_basic_setup").css('display', 'block');

		$("#new_calculation_basic_setup .btn-next-step").click(
			tnt.validate_new_calculation_basic_setup_step
		);

	}, 

	validate_new_calculation_basic_setup_step: function () {
		// 
		tnt.initialise_new_calculation_define_hamiltonian();

	}, 

	initialise_new_calculation_define_hamiltonian: function () {
		// 
		console.log("Initialising new calculation Hamiltonian input");
		
		tnt.render_available_hamiltonian_operators();
		
		tnt.clear_all_new_calculation_stages();
		
		$("#new_calculation_define_hamiltonian").css('display', 'block');
		
		$("#new_calculation_define_hamiltonian .btn-next-step").click(
			tnt.validate_new_calculation_define_hamiltonian
		);

	}, 

	validate_new_calculation_define_hamiltonian: function () {
		// 
		tnt.initialise_new_calculation_ground_state();
	}, 

	initialise_new_calculation_ground_state: function () {
		// 
		console.log("Initialising new calculation ground state input");
		tnt.clear_all_new_calculation_stages();
		$("#new_calculation_ground_state").css('display', 'block');

		$("#new_calculation_ground_state .btn-next-step").click(
			tnt.validate_new_calculation_ground_state
		);
	}, 

	validate_new_calculation_ground_state: function () {
		// 
		tnt.initialise_new_calculation_initial_state();
	}, 

	initialise_new_calculation_initial_state: function () {
		// 
		console.log("Initialising new calculation initial state input");
		tnt.render_available_initial_base_states(); 	// Draw the choices available
		tnt.clear_all_new_calculation_stages(); // Clear all panels

		$("#new_calculation_initial_state").css('display', 'block'); 	// Make this panel visible

		$("#new_calculation_initial_state .btn-next-step").click(
			tnt.validate_new_calculation_initial_state
		);

	}, 

	validate_new_calculation_initial_state: function () {
		// 
		tnt.initialise_new_calculation_expectation_operators();
	}, 

	initialise_new_calculation_time_evolution: function () {
		// 
		console.log("Initialising new calculation time evolution input");
		
		tnt.clear_all_new_calculation_stages();
		
		$("#new_calculation_time_evolution").css('display', 'block');

		$("#new_calculation_time_evolution .btn-next-step").click(
			tnt.validate_new_calculation_time_evolution
		);

	}, 

	validate_new_calculation_time_evolution: function () {
		// 
	}, 

	initialise_new_calculation_expectation_operators: function () {
		// 
		console.log("Initialising new calculation expectation value input");
		tnt.clear_all_new_calculation_stages();
		$("#new_calculation_expectation_operators").css('display', 'block');

		$("#new_calculation_expectation_operators .btn-next-step").click(
			tnt.validate_new_calculation_time_expectation_operators
		);

	}, 

	validate_new_calculation_time_expectation_operators: function () {
		// 
	}, 
	

} 	// End of tnt namespace