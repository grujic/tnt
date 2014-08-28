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
				
				if (window.calculation.setup.system.calculation_type === null) {
					var filtered_data = data;
				} else {
					var filtered_data = 
						{'operators': 
							_.filter(
								data.operators, 
								function(el) {
									return el['term_type'] == window.calculation.setup.system.calculation_type; 
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
				

				if (window.calculation.setup.system.calculation_type === null) {
					var filtered_data = data;
				} else {
					var filtered_data = {'states': _.filter(data.states, function(el) {return el['system_type'] == window.calculation.setup.system.calculation_type})};
				}

				window.initial_base_states = filtered_data;

				var source = $("#initial-base-states-template").html();
				var template = Handlebars.compile(source);
				$("#new_calculation_available_initial_base_states").html(template(filtered_data));
				
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

	add_hamiltonian_term: function(operator_id) {
		// Add a visual representation of a Hamiltonian term to the screen, and render any user input elements necessary (e.g. inputs for spatial parameter values)
		
		// First get the right operator
		var hamiltonian_operator = _.filter(window.hamiltonian_operators.operators, function (el) {return el.operator_id == operator_id;})[0];

		// Hack for now: add in a unique identifier so we can refer to this element and its children easily
		hamiltonian_operator['uuid'] = tnt.generate_unique_id();

		var source = $("#hamiltonian-term-template").html();
		var template = Handlebars.compile(source);
		$("#hamiltonian_terms_container").append(template(hamiltonian_operator));
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

				e.preventDefault();
			}
		)
	}, 

	clear_all_new_calculation_stages: function() {
		// Set display: none for each of the 'pages' of the new calculation setup
		$(".new-calculation-step").css('display', 'none');
	},

	review_all_new_calculation_stages: function() {
		// Set display: none for each of the 'pages' of the new calculation setup
		$(".new-calculation-step").css('display', 'block');
	},

	// Following is a list of functions that verify data input and also set up the various data input panels for a new calculation
	initialise_new_calculation_basic_setup_step: function () {
		// 
		console.log("Initialising new calculation basic setup input");

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

			var spin_magnitude = $(".btn-system-type-extra-info-spin.active")
									.data("spin-magnitude");

			console.log("Spin magnitude = " + spin_magnitude);

			window.calculation.setup.system.system_type.extra_info['spin_magnitude'] = spin_magnitude;

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

	}, 

	validate_new_calculation_define_hamiltonian: function () {
		// 
		_.each($('.hamiltonian-term'), 
	       function (term) {
	           console.log("Next term: ");

	           window.term = term;

	           var hamiltonian_operator_id = $(term).data("hamiltonian-operator-id");
	           console.log("Term with Hamiltonian operator ID: " + hamiltonian_operator_id);
	           var hamiltonian_operator = _.filter(
	                                          window.hamiltonian_operators.operators, 
	                                          function (operator) {
	                                              return operator['operator_id'] == parseInt(hamiltonian_operator_id)
	                                          }
	                                      )[0];
	           console.log("hamiltonian_operator: ");
	           console.log(hamiltonian_operator);

	           // Now get the spatial function ID:
	           var spatial_function_id = parseInt($(term).find("select").val());	// 0 ordering
	           
	           // Get the corresponding spatial function dict representation
	           var spatial_function = _.filter(
	                                          window.spatial_fns.spatial_fns, 
	                                          function (spatial_fn) {
	                                              return spatial_fn['spatial_fn_id'] == parseInt(spatial_function_id)
	                                          }
	                                      )[0];

	           console.log("spatial_function: ");
	           console.log(spatial_function);

	           // Now get the values for each of the parameters for the spatial function variation
	           var spatial_function_parameter_input_form = $(term).find('.spatial_function_parameter_input_form');
	           
	           // Loop over the spatial function parameters for this term
	           _.each($(spatial_function_parameter_input_form).find('.form-control'), 
	               function(el) { 
	                   var spatial_function_parameter_id = $(el).data("parameter-id");
	                   console.log("Parameter ID: " + spatial_function_parameter_id);
	                   var spatial_function_parameter_val = $(el).val()
	                   console.log("Has value " + spatial_function_parameter_val);

	                   spatial_function.parameters[spatial_function_parameter_id - 1]['value'] = spatial_function_parameter_val;
	                   window.spatial_function = spatial_function;
	               }
	           );

	           //
	           hamiltonian_operator['spatial_function'] = spatial_function;
	           window.calculation.setup.hamiltonian.terms.push(hamiltonian_operator);
			   
	       }
		); 	// End of loop over Hamiltonian terms

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

		var calculate_ground_state = parseInt($("label.active input", "#ground_state_calculation_choice")
			.data("calculate-ground-state"));

		window.calculation.setup.system.calculate_ground_state = calculate_ground_state;

		var calculate_time_evolution_choice = parseInt($("label.active input", "#time_evolution_choice")
			.data("calculate-time-evolution"));

		window.calculation.setup.system.calculate_time_evolution = calculate_time_evolution_choice;

		console.log("Validated new calculation ground state input");

		tnt.initialise_new_calculation_time_evolution();
	}, 

	initialise_new_calculation_time_evolution: function () {
		// 
		console.log("Initialising new calculation ground state input");
		tnt.clear_all_new_calculation_stages();
		$("#new_calculation_time_evolution").css('display', 'block');

		$("#new_calculation_time_evolution .btn-next-step").click(
			tnt.validate_new_calculation_time_evolution
		);
	}, 

	validate_new_calculation_time_evolution: function () {
		// 
		var num_time_steps = parseInt($("#input_num_time_steps").val())
		var time_step_size = parseFloat($("#input_time_step_size").val());

		window.calculation.setup.system.num_time_steps = num_time_steps;
		window.calculation.setup.system.time_step = time_step_size;

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
		var initial_base_state_choice = $(".initial-state-btn.active")
			.data("initial-base-state-id");

		var initial_base_state = _.filter(
			window.initial_base_states.states, 
			function (el) {
				return el['initial_base_state_id'] == initial_base_state_choice; 
			}
		)[0];

		window.calculation.setup.initial_state.base_state = initial_base_state;

		tnt.initialise_new_calculation_expectation_operators();

	}, 

	initialise_new_calculation_expectation_operators: function () {
		// 
		console.log("Initialising new calculation expectation value input");
		tnt.clear_all_new_calculation_stages();
		
		tnt.render_available_expectation_operators();

		$("#new_calculation_expectation_operators").css('display', 'block');

		$("#new_calculation_expectation_operators .btn-next-step").click(
			tnt.validate_new_calculation_expectation_operators
		);

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
	},

	plot_single_site_expectation_val_fn_time: function(expectation_operator_id, site) {
		// 
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