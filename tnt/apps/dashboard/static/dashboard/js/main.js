// Namespace for tnt
var tnt = {

	timestamp_to_human_date: function (timestamp) {
		var date = new Date(timestamp*1000);
		return date.toLocaleString();

	},

	render_mathjax: function () {
		MathJax.Hub.Typeset();
	},

	generate_unique_id: function () {
		return Math.round(1000000000*Math.random()) + "";
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

				if (window.calculation.setup.system.system_type === null) {
					var filtered_data = data;
				} else {
					var filtered_data =
						{'operators':
							_.filter(
								data.operators,
								function(el) {
									return el['term_type'] == window.calculation.setup.system.system_type;
								}
							)
						};
				}

				// Now check if number conservation is being enforced
				if ( parseInt(window.calculation.setup.system.number_conservation) == 1 ) {
					var filtered_data =
						{'operators':
							_.filter(
								filtered_data.operators,
								function (el) {
									return el['U1_invariant'];
								}
							)
						};
				}

				// Keep this data available:
				window.hamiltonian_operators = filtered_data;

				// We use these same palette of operators to modify initial states - filter 
				// appropriately and store them here rather than making an identical call later
				window.initial_state_modifier_operators = 
					{
						'operators': 
						_.filter(
							window.hamiltonian_operators.operators, 
							function(el) { 
								return el['use_for_transform'] == true; 
							}
						)
					};

				var source = $("#hamiltonian-operator-template").html();

				var template = Handlebars.compile(source);

				$("#new_calculation_available_hamiltonian_operators")
					.html(template(window.hamiltonian_operators));

				$(".hamiltonian-operator-btn")
					.click(function() {
						console.log($(this).data("operator-id"));
						tnt.add_hamiltonian_term(
							$(this).data("operator-id"), 
							"#hamiltonian_terms_container"
						);
					});

			}
		).done(function() {
    		tnt.render_mathjax();
  		});

	}, // End of render_available_hamiltonian_operators

	render_available_intitial_state_modifier_operators: function () {
		// Transformations we can apply to the base state
		var source = $("#hamiltonian-operator-template").html();

		var template = Handlebars.compile(source);

		$("#initial_state_modifier_operators_container")
			.html(template(window.initial_state_modifier_operators));

		$(".hamiltonian-operator-btn")
			.click(function() {
				console.log("ID of base state modifer chosen: ");
				console.log($(this).data("operator-id"));

				tnt.add_hamiltonian_term(
					$(this).data("operator-id"), 
					"#initial_state_modifier_operators_terms"
				);
			});

		tnt.render_mathjax();

	},

	attach_click_fn_to_initial_base_state_choices: function () {
		// When an initial base state is chosen, need to make that button active and all others not
		$(".initial-state-btn")
			.click(
				function (e) {
					$(".initial-state-btn").removeClass("active");
					$(this).addClass("active");
				}
			);
	},

	attach_click_fn_to_remove_hamiltonian_terms: function () {
		// When an initial base state is chosen, need to make that button active and all others not
		$(".remove-hamiltonian-term-btn")
			.click(
				function (e) {
					var hamiltonian_term_containing_div = $(this).closest('.hamiltonian-term');
					$(hamiltonian_term_containing_div).remove();

					// If there are no more Hamiltonian terms left, add back in the warning sign
					if ($('.hamiltonian-term').length == 0) {
						$("#no_hamiltonian_terms_added_yet_warning").css("display", "block");
					}
				}
			);
	},

	attach_click_fn_to_expectation_operator_choices: function () {
		// When an expectation operator is chosen, need to toggle it's 'active' class
		$(".expectation-operator-btn")
			.click(
				function (e) {

					$(this).toggleClass("active");

					e.preventDefault();

				}
			);
	},

	render_available_initial_base_states: function () {
		// If window.calculation_type is not defined, render all available initial base states, otherwise filter
		$.get("/api/v1.0/initial_base_states",
			function (data) {


				if (window.calculation.setup.system.system_type === null) {
					var filtered_data = data;
				} else {
					var filtered_data = 
						{
							'states': 
							_.filter(
								data.states, 
								function(el) {
									return ( (el['system_type'] == window.calculation.setup.system.calculation_type ) || (el['system_type'] == 'all') ); 
								}
							) 
						};
				}

				window.initial_base_states = filtered_data;

				// If we're not calculating the ground state, then exclude it as a possibility for an intitial state
				if (window.calculation.setup.system.calculate_ground_state == 0) {
					window.initial_base_states = 
					{
						'states': 
						_.filter(
							window.initial_base_states.states, 
							function(el) {
								return el['initial_base_state_id'] > 0; 
							}
						)
					};
				}

				var source = $("#initial-base-states-template").html();
				var template = Handlebars.compile(source);
				$("#new_calculation_available_initial_base_states").html(template(window.initial_base_states));

				$(".initial-state-btn")
					.first()
					.addClass("active");

				tnt.attach_click_fn_to_initial_base_state_choices();

				tnt.render_mathjax();

				// Make the first initial state selected

			}
		).done(function() {
    		tnt.render_mathjax();
  		});

	}, // End of render_available_initial_base_states

	render_available_expectation_operators: function () {
		// render the available expectation value operators
		console.log("Loading available expectation value operators...");

		$.get("/api/v1.0/hamiltonian_operators",
			function (data) {

				if (window.calculation.setup.system.calculation_type === null) {
					var filtered_data = data;
				} else {
					var filtered_data =
						{
							'operators':
							 _.filter(
							 	data.operators,
							 	function(el) {
							 		return el['term_type'] == window.calculation.setup.system.calculation_type;
							 	}
							 )
						};
				}

				window.expectation_operators = filtered_data;

				// Separate operators into single- and two-site expectation operators
				var single_site_expectation_operators =
					{
						'operators':
						_.filter(
							window.expectation_operators.operators,
							function (el) {
								return el.two_site == false;
							}
						)
					};

				var two_site_expectation_operators =
					{
						'operators':
						_.filter(
							window.expectation_operators.operators,
							function (el) {
								return el.two_site == true;
							}
						)
					};

				var single_site_source = $("#expectation-operators-single-site-template").html();
				var single_site_template = Handlebars.compile(single_site_source);

				var two_site_source = $("#expectation-operators-two-site-template").html();
				var two_site_template = Handlebars.compile(two_site_source);

				// Render single- and two- site operators separately
				$("#new_calculation_available_expectation_operators_single_site")
					.html(single_site_template(single_site_expectation_operators));

				$("#new_calculation_available_expectation_operators_two_site")
					.html(two_site_template(two_site_expectation_operators));

				tnt.attach_click_fn_to_expectation_operator_choices();

			}
		).done(function() {
    		console.log("Loaded available expectation value operators");
    		tnt.render_mathjax();
  		});

	}, // End of render_available_initial_base_states

	add_hamiltonian_term: function(operator_id, term_container_selector) {
		// Add a visual representation of a Hamiltonian term to the screen, and render any user input elements necessary (e.g. inputs for spatial parameter values)

		// First get the right operator
		var hamiltonian_operator = 
			_.filter(
				window.hamiltonian_operators.operators, 
				function (el) {
					return el.operator_id == operator_id;
				}
			)[0];

		// Hack for now: add in a unique identifier so we can refer to this element and its children easily
		hamiltonian_operator['uuid'] = tnt.generate_unique_id();

		var source = $("#hamiltonian-term-template").html();
		var template = Handlebars.compile(source);
		$(term_container_selector).append(template(hamiltonian_operator));
		$("#no_hamiltonian_terms_added_yet_warning").css('display', 'none');

		tnt.attach_click_fn_to_remove_hamiltonian_terms();

		// $('select').selectpicker();

		tnt.attach_click_fn_to_spatial_fn_choices();	// Attach logic for changing spatial function input

		tnt.render_mathjax();

	},

	attach_click_fn_to_spatial_fn_choices: function () {
		// Attach a click listener to the list elements representing different spatial function variations, updating parameter input fields accordingly
		$(".spatial-function-btn-group").on("change",
			function (e) {

				// var selected_spatial_function_id = parseInt($(this).closest(".btn-group").siblings("select").val());
				var selected_spatial_function_id = $(this).val();
				console.log("selected_spatial_function_id");
				console.log(selected_spatial_function_id);

				// Get info on the selected spatial function
				var relevant_spatial_function = _.filter(
					window.spatial_fns.spatial_fns,
					function(el) {
						return el['spatial_fn_id'] == selected_spatial_function_id;
					}
				)[0];

				// When clicked, change the input form elements to the relevant ones for this spatial function choice
				var source = $("#spatial-function-parameter-input-template").html();
				var template = Handlebars.compile(source);

				var hamiltonian_term_containing_div = $(this).closest('.hamiltonian-term');

				var spatial_function_parameter_input_form = $(hamiltonian_term_containing_div)
					.find('.spatial_function_parameter_input_form');


				$(spatial_function_parameter_input_form).html(template(relevant_spatial_function));

				tnt.render_mathjax();

				e.preventDefault();
			}
		)
	},

	clear_all_new_calculation_stages: function() {
		// Set display: none for each of the 'pages' of the new calculation setup
		$(".new-calculation-step").css('display', 'none');
	},

	review_all_new_calculation_stages: function() {
		// Set display: block for each of the 'pages' of the new calculation setup
		$(".new-calculation-step").css('display', 'block');
	},

	// Following is a list of functions that verify data input and also set up the various data input panels for a new calculation
	initialise_new_calculation_basic_setup_step: function () {
		//
		console.log("Initialising new calculation basic setup input");

		$(".btn-system-type")
			.click(function(el) {
				$(".btn-system-type").removeClass("active");
				$(this).addClass("active");

				var chosen_system_type = $(this).data("system-type");
				console.log("Chosen system type = " + chosen_system_type);

				// Hide all extra input panels
				$(".system_type_extra_info").css("display", "none");

				// Choose what extra inputs to reveal:
				if (chosen_system_type == "spin") {
					$("#system_type_extra_info_spins").css("display", "block");
				} else if (chosen_system_type == "bosonic") {
					$("#system_type_extra_info_bosons").css("display", "block");
				}

			}
		);

		// Make sure that we can only have one spin type selected at a time
		$(".btn-system-type-extra-info-spin")
			.click(function (el) {
				$(".btn-system-type-extra-info-spin").removeClass("active");
				$(this).addClass("active");
			}
		);

		tnt.clear_all_new_calculation_stages();
		$("#new_calculation_basic_setup").css('display', 'block');

		$("#new_calculation_basic_setup .btn-next-step").click(
			tnt.validate_new_calculation_basic_setup_step
		);

	},

	validate_new_calculation_basic_setup_step: function () {
		//
		var system_type = $(".btn-system-type.active").data("system-type"); // From the selected button, find system type

		window.calculation.setup.system.system_type.name = system_type;	// Update the calculation

		var system_size = parseInt($("#system_size").val());	// How many sites?

		window.calculation.setup.system.system_size = system_size;	// Update the calculation

		// Now process any extra info to do with the system type
		if (system_type == "spin") {

			console.log("System type = spin");

			var spin_magnitude = parseInt($("#system_type_extra_info_spins_choice").val());

			console.log("Spin magnitude = " + spin_magnitude);

			window.calculation.setup.system.system_type.extra_info['spin_magnitude'] = spin_magnitude;

		} else if (system_type == "bosonic") {

			console.log("System type = bosonic");

			var bosonic_truncation = parseInt($("#system_type_extra_info_bosons_choice").val());

			console.log("Bosonic truncation parameter = " + bosonic_truncation);

			window.calculation.setup.system.system_type.extra_info['bosonic_truncation'] = bosonic_truncation;

		}

		// Now let's see if the user wants to enforce number conservation:
		var enforce_number_conservation = parseInt($("label.active input", "#number_conservation_choice")
			.data("number-conservation"));

		window.calculation.setup.system.number_conservation = enforce_number_conservation;

		var chi = parseInt($("#chi_value").val());	// \chi

		window.calculation.setup.system.chi = chi;

		console.log("Validated new calculation basic setup input");

		tnt.initialise_new_calculation_define_hamiltonian();	// Move to next 'page'

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

		$("#new_calculation_define_hamiltonian .btn-back-step").click(
			tnt.initialise_new_calculation_basic_setup_step
		);


	},

	convert_operator_gui_element_into_hamiltonian_term_json: function (term) {
		// We pass in a jquery wrapped gui representation of a hamiltonian 
		// (or more generally quantum operator) term, and we get back a 
		// JSON struct describing the term's spatial dependence etc

		var hamiltonian_operator_id = $(term).data("hamiltonian-operator-id");
		           
		var this_hamiltonian_operator = _.filter(
		                              window.hamiltonian_operators.operators,
		                              function (operator) {
		                                  return operator['operator_id'] == parseInt(hamiltonian_operator_id)
		                              }
		                          )[0];

		// Need a deep clone of this object
		var hamiltonian_operator = _.cloneDeep(this_hamiltonian_operator);

		// Now get the spatial function ID:
		var spatial_function_id = parseInt($(term).find("select").val());	// 0 ordering

		// Get the corresponding spatial function dict representation
		var this_spatial_function = _.filter(
		                              window.spatial_fns.spatial_fns,
		                              function (spatial_fn) {
		                                  return spatial_fn['spatial_fn_id'] == parseInt(spatial_function_id)
		                              }
		                          )[0];

		// Deep clone
		var spatial_function = _.cloneDeep(this_spatial_function);

		// Now get the values for each of the parameters for the spatial function variation
		var spatial_function_parameter_input_form = $(term).find('.spatial_function_parameter_input_form');

		// Loop over the spatial function parameters for this term
		_.each($(spatial_function_parameter_input_form).find('.form-control'),
		   function(el) {
		       var spatial_function_parameter_id = $(el).data("parameter-id");
		       
		       var spatial_function_parameter_val = $(el).val()

		       spatial_function.parameters[spatial_function_parameter_id - 1]['value'] = spatial_function_parameter_val;

		   }
		);

		//
		hamiltonian_operator['spatial_function'] = spatial_function;

		return hamiltonian_operator;
	}, 

	validate_new_calculation_define_hamiltonian: function () {
		//
		_.each($('.hamiltonian-term'),
	       function (term) {

	       	   var hamiltonian_operator = tnt.convert_operator_gui_element_into_hamiltonian_term_json(term);
	           
	           window
	           .calculation
	           .setup
	           .hamiltonian
	           .terms
	           .push(hamiltonian_operator);

	       }
		); 	// End of loop over Hamiltonian terms

		tnt.initialise_new_calculation_ground_state();
	},

	initialise_new_calculation_ground_state: function () {
		//
		console.log("Initialising new calculation ground state input");

		tnt.clear_all_new_calculation_stages();
		$("#new_calculation_ground_state").css('display', 'block');

		// Add a function so that if the user chooses not to calculate time evolution, we don't display inputs for time step info
		$("#ground_state_calculation_choice input")
			.change(
				function () {
					
					console.log('test' + $(this).data('calculate-ground-state'));
					console.log($(this));
					
					if ($(this).data('calculate-ground-state') == 0) { 
						console.log("We're not calculating the ground state");
						$('#ground_state_precision_specification')
							.css('display', 'none'); 
					} else {
						console.log("We are calculating the ground state");
						$('#ground_state_precision_specification')
							.css('display', 'block'); 
					}

				}
			);

		// Navigation
		$("#new_calculation_ground_state .btn-next-step").click(
			tnt.validate_new_calculation_ground_state
		);

		$("#new_calculation_ground_state .btn-back-step").click(
			tnt.initialise_new_calculation_define_hamiltonian
		);

	},

	validate_new_calculation_ground_state: function () {
		//

		var calculate_ground_state = parseInt($("label.active input", "#ground_state_calculation_choice")
			.data("calculate-ground-state"));

		window
		.calculation
		.setup
		.system
		.calculate_ground_state = calculate_ground_state;

		// Ground state precision:
		var log_ground_state_precision = parseFloat($("#input_ground_state_precision").val());

		window
		.calculation
		.setup
		.system
		.log_ground_state_precision = log_ground_state_precision;

		console.log("Validated new calculation ground state input");

		tnt.initialise_new_calculation_time_evolution();
	},

	initialise_new_calculation_time_evolution: function () {
		//
		console.log("Initialising new calculation time evolution input");
		tnt.clear_all_new_calculation_stages();
		$("#new_calculation_time_evolution").css('display', 'block');

		// Add a function so that if the user chooses not to calculate time evolution, we don't display inputs for time step info
		$("#time_evolution_choice input")
			.change(
				function () {
					console.log('test' + $(this).data('calculate-time-evolution'));
					console.log($(this));
					if ($(this).data('calculate-time-evolution') == 0) { 
						console.log("We're not calculating time evolution");
						$('#time_evolution_time_step_specification').css('display', 'none'); 
					} else {
						console.log("We are calculating time evolution");
						$('#time_evolution_time_step_specification').css('display', 'block'); 
					}
				}
			);

		$("#new_calculation_time_evolution .btn-next-step").click(
			tnt.validate_new_calculation_time_evolution
		);

		$("#new_calculation_time_evolution .btn-back-step").click(
			tnt.initialise_new_calculation_ground_state
		);

	},

	validate_new_calculation_time_evolution: function () {
		//
		
		var calculate_time_evolution_choice = parseInt($("label.active input", "#time_evolution_choice")
			.data("calculate-time-evolution"));

		window
		.calculation
		.setup
		.system
		.calculate_time_evolution = calculate_time_evolution_choice;

		console.log("Are we calculating time evolution? " + calculate_time_evolution_choice);

		if (calculate_time_evolution_choice == 1) {

			var num_time_steps = parseInt($("#input_num_time_steps").val())
			var time_step_size = parseFloat($("#input_time_step_size").val());

			window.calculation.setup.system.num_time_steps = num_time_steps;
			window.calculation.setup.system.time_step = time_step_size;

		}

		// We work out what to display next
		if (calculate_time_evolution_choice == 1) {
			var next_stage_initialisation_fn = tnt.initialise_new_calculation_initial_state;
		} else  {
			// var next_stage_initialisation_fn = tnt.initialise_new_calculation_expectation_operators;
			// TODO was getting weird behaviour when above line is not commented out, leaving like this for now :(
			var next_stage_initialisation_fn = tnt.initialise_new_calculation_initial_state;
		}

		console.log("next_stage_initialisation_fn = ");
		console.log(next_stage_initialisation_fn);

		window.next_stage_initialisation_fn = next_stage_initialisation_fn;

		next_stage_initialisation_fn();

	},

	initialise_new_calculation_initial_state: function () {
		//
		console.log("Initialising new calculation initial state input");
		tnt.render_available_initial_base_states(); 	// Draw the choices available

		tnt.render_available_intitial_state_modifier_operators();

		tnt.clear_all_new_calculation_stages(); // Clear all panels

		$("#new_calculation_initial_state").css('display', 'block'); 	// Make this panel visible

		$("#new_calculation_initial_state .btn-next-step").click(
			tnt.validate_new_calculation_initial_state
		);

		$("#new_calculation_initial_state .btn-back-step").click(
			tnt.initialise_new_calculation_time_evolution
		);

	},

	validate_new_calculation_initial_state: function () {
		//
		var initial_base_state_choice = $(".initial-state-btn.active")
			.data("initial-base-state-id");

		var initial_base_state = _.filter(
			window.initial_base_states.states,
			function (el) {
				return el['initial_base_state_id'] == initial_base_state_choice;
			}
		)[0];

		window.calculation.setup.initial_state.base_state = initial_base_state;

		// Now we look for modifiers to the base state:
		_.each($('#initial_state_modifier_operators_terms .hamiltonian-term'),
	       function (term) {

	       	   var operator = tnt.convert_operator_gui_element_into_hamiltonian_term_json(term);
	           
	           window
	           .calculation
	           .setup
	           .initial_state
	           .applied_operators
	           .push(operator);

	       }
		); 	// End of loop over Hamiltonian terms

		tnt.initialise_new_calculation_expectation_operators();

	},

	initialise_new_calculation_expectation_operators: function () {
		//
		console.log("Initialising new calculation expectation value input");
		
		tnt.clear_all_new_calculation_stages();

		tnt.render_available_expectation_operators();

		$("#new_calculation_expectation_operators")
			.css('display', 'block');

		$("#new_calculation_expectation_operators .btn-next-step").click(
			tnt.validate_new_calculation_expectation_operators
		);

		console.log("A");

		// What comes before this stage depends on calculation parameters:
		if (window.calculation.setup.system.calculate_time_evolution == 1) {
			var previous_stage_initialisation_fn = tnt.initialise_new_calculation_initial_state;
		} else  {
			var previous_stage_initialisation_fn = tnt.initialise_new_calculation_time_evolution;
		}

		console.log("B");

		$("#new_calculation_expectation_operators .btn-back-step").click(
			previous_stage_initialisation_fn()
		);

		console.log("C");

	},

	validate_new_calculation_expectation_operators: function () {
		// Check that everything's OK and add the selected exp vals into the calculation JSON structure

		var selected_expectation_operator_ids = _.map(
			$(".expectation-operator-btn.active"),
			function (el) {
				return $(el).data("expectation-operator-id");
			}
		);

		var selected_expectation_operators = _.filter(
			window.expectation_operators.operators,
			function(el) {
				return _.contains(
					selected_expectation_operator_ids,
					el['operator_id']);
			}
		);

		window.calculation.setup.expectation_values.operators = selected_expectation_operators;

		// Now we want to add in the extra information required for two-site operators
		_.each(
			window.calculation.setup.expectation_values.operators,
			function (operator) {
				if (operator.two_site == true) {
					var selector = '.two-site-expectation-type-choice[data-expectation-operator-id="' + operator.operator_id.toString() + '"]';
					var expectation_value_type = $(selector).val();
					operator['exp_val_type'] = expectation_value_type;
				}
			}
		);

		tnt.initialise_new_calculation_confirmation();

	},

	initialise_new_calculation_confirmation: function () {

		console.log("Initialising confirmation stage");
		tnt.clear_all_new_calculation_stages();

		$("#submit_calculation").click(
			function () {
				$.post(
					'/api/v1.0/calculation/save',
					{
						'calculation': JSON.stringify(window.calculation)
					},
					function (data) {
						console.log(data);
					}
				).done(function() {
		    		console.log("Submitted calculation!");
		    		window.location = '/';
		  		});
			}
		);

		$("#new_calculation_confirm").css('display', 'block');

		$("#new_calculation_confirm .btn-back-step").click(
			tnt.initialise_new_calculation_expectation_operators
		);

	},

	submit_calculation: function () {
		// We POST the calculation structure to the server for saving and processing
		$.post('/api/v1.0/calculation/save',
			{
				'calculation': JSON.stringify(window.calculation)
			},
			function (data) {
				console.log(data);
			}
		);

	},

	run_calculation: function(calculation_id) {
		// Run the calculation with the given ID
		$.post(
			"/api/v1.0/calculation/run",
			{
				'calculation_id': calculation_id
			}
		).done(function() {
    		// This will update statuses to running... etc
    		location.reload();
  		});
	},


	download_calculation: function(calculation_id) {
		// Download a JSON file to the User's computer
	},

	// Plotting and 'exploring' functions

	load_expectation_val_results: function(calculation_id) {
		// Make a request to the server and pull in the exp val results for this calculation, then set them as a global variable
		// window.expectation_values = ;
		console.log("Loading expectaion value data for calculaton " + calculation_id);
		$.get(
			'/media/' + calculation_id + '.json',
			function (data) {
				window.expval_data = data;
			}
		).done(function() {
			console.log("Successfully loaded expectaion value data for calculaton " + calculation_id);
			// Find which
		    window.calculated_expectation_operator_ids = _.pluck(
		      window.expval_data.results.data.evolved.operators,
		      'operator_id');
	  		});

	},

	get_data_single_site_expectation_val_fn_time: function(expectation_operator_id, site, re_or_im) {
		// Get data in the right form to be plotted by Highcharts for a given operator and site
		// Pass in 're' or 'im' for re_or_im

		var data_this_operator = _.filter(
			window.expval_data.results.data.evolved.operators,
			function (el) {
				return el['operator_id'] == expectation_operator_id;
			}
		)[0];

		var data = _.map(
				data_this_operator.vals,
				function(el) {
					return {
						'x': el['time'],
						'y': el[re_or_im][site]
					};
				}
			);

		// Get info about this operator
		var expectation_operator = _.filter(
			window.expectation_operators,
			function (el) {
				return el['operator_id'] == expectation_operator_id;
			}
		)[0];



		return {
			name: expectation_operator['function_description'],
			data: data
		};

	},


	plot_series: function (series_data) {

      $('#plot_div').highcharts({
          title: {
              text: 'MOCK DATA Expectation values for Calculation name',
              x: -20 //center
          },
          subtitle: {
              text: 'Source: TNT LIbrary',
              x: -20
          },

          yAxis: {
              title: {
                  text: 'Expectation values <O>'
              },
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
              }]
          },
          tooltip: {
              valueSuffix: '°C'
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
              borderWidth: 0
          },
          series: series_data
      });

    },

	plot_single_site_expectation_val_fn_time: function(expectation_operator_id, site, re_or_im) {
		//

		var time_series = get_data_single_site_expectation_val_fn_time(expectation_operator_id, site, re_or_im);

	},





} 	// End of tnt namespace

// AJAX functions and dealing with cross-site origin requests

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
