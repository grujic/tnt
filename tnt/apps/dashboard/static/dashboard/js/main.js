var tnt = {

    // Some important variables
    system_size_min: 2,
    system_size_max: 40,
    system_size_default: 10,

    chi_min: 1,
    chi_max: 40,
    chi_default: 10,

    log_ground_state_precision_min: 1,
    log_ground_state_precision_max: 14,
    log_ground_state_precision_default: 4,

    min_num_time_steps: 1,
    max_num_time_steps: 2000,

    // Helper functions

    replaceAll: function(find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    },

    endsWith: function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    },

    startsWith: function(str, prefix) {
        return new RegExp(prefix).test(str);
    },

    is_odd: function(number) {

        if (number % 2 == 0) {
            return false;
        } else {
            return true;
        }

    },

    min_int_not_in_array: function(arr) {
        // [1,3,4] --> 2
        var found = false;
        var counter = 1;
        while (!found) {
            if (! _.contains(arr, counter)) {
                found = true;
            } else {
                counter = counter + 1;
            }
        }
        return counter;
    },

	timestamp_to_human_date: function (timestamp) {
		var date = new Date(timestamp*1000);
		return date.toLocaleString();

	},

    // Helper HTML functions

	render_mathjax: function () {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        $('[data-toggle="popover"]').popover();
	},

	render_mathjax_in_element_with_id: function (el_id) {
        if (el_id[0] == "#") {
            el_id = el_id.slice(1, el_id.length);
        }
        MathJax.Hub.Queue(["Typeset",MathJax.Hub, el_id]);
        $('[data-toggle="popover"]').popover();
	},

    set_up_numeric_range_dropdown: function(dropdown_id, dropdown_min, dropdown_max, dropdown_default) {
        // Dropdown with strictly increasing vals
        var select=document.getElementById(dropdown_id);

        $(select).empty();

        _.each(_.range(dropdown_min, dropdown_max + 1), function (num) {
            var option = document.createElement("OPTION");
            select.options.add(option);
            option.text = num;
            option.value = num;
            if (num == dropdown_default) {
                option.selected = true;
            }
        });

    },

    set_up_numeric_vals_dropdown: function(dropdown_id, dropdown_possibilities, dropdown_default) {
        // Dropdown with arbitrary vals
        var select=document.getElementById(dropdown_id);

        $(select).empty();

        _.each(dropdown_possibilities, function (num) {
            var option = document.createElement("OPTION");
            select.options.add(option);
            option.text = num;
            option.value = num;
            if (num == dropdown_default) {
                option.selected = true;
            }
        });

    },

    restrict_inputs_to_float: function(els_to_restrict) {
        // Only allow people to enter an integer in these inputs
        $(els_to_restrict).keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    },

    restrict_inputs_to_integer: function(els_to_restrict) {
        // Only allow people to enter an integer in these inputs
        $(els_to_restrict).keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    },

    enforce_numeric_restrictions_to_inputs: function() {
        // Attach restrictions to inputs that only accept float or integer inputs
        tnt.restrict_inputs_to_integer($('.integer-only'));
        tnt.restrict_inputs_to_float($('.float-only'));
    },

    // Handlebars helpers and template storage
    get_handlebars_template: function(script_id) {
        if ( !tnt.startsWith(script_id, "#") ) {
            script_id = "#" + script_id;
        }
        var source = $(script_id).html();
        return Handlebars.compile(source);
    },

    // Storage for compiled templates
    handlebars_templates: {},

    // Store templates:
    compile_handlebars_templates: function() {
        tnt.handlebars_templates['initial-state-modifier-sum-or-product-template']
            = tnt.get_handlebars_template('initial-state-modifier-sum-or-product-template');
        tnt.handlebars_templates['spatial-or-temporal-function-parameter-input-template']
            = tnt.get_handlebars_template('spatial-or-temporal-function-parameter-input-template');
        tnt.handlebars_templates['hamiltonian-term-template']
            = tnt.get_handlebars_template('hamiltonian-term-template');
        tnt.handlebars_templates['initial-base-states-template']
            = tnt.get_handlebars_template('initial-base-states-template');
        tnt.handlebars_templates['hamiltonian-operator-template']
            = tnt.get_handlebars_template('hamiltonian-operator-template');
    },

    // Getters and setters
    get_system_type: function() {
        return window.calculation.setup.system.system_type.name;
    },

    set_system_type: function(system_type) {
		window
        .calculation
        .setup
        .system
        .system_type
        .name = system_type;	// Update the calculation
    },

    get_apply_dynamic_qn: function() {
        return window.calculation.setup.system.number_conservation.dynamic.apply_qn;
    },

    set_apply_dynamic_qn: function(val) {
        return window.calculation.setup.system.number_conservation.dynamic.apply_qn = val;
    },

    get_apply_ground_qn: function() {
        return window.calculation.setup.system.number_conservation.ground.apply_qn;
    },

    set_apply_ground_qn: function(val) {
        return window.calculation.setup.system.number_conservation.ground.apply_qn = val;
    },

    get_calculate_ground_state: function() { return window.calculation.setup.system.calculate_ground_state; },

    set_calculate_ground_state: function(val) { window.calculation.setup.system.calculate_ground_state = val; },

    get_calculate_time_evolution: function() { return window.calculation.setup.system.calculate_time_evolution; },

    set_calculate_time_evolution: function(val) { window.calculation.setup.system.calculate_time_evolution = val; },

    get_num_time_steps: function() { return window.calculation.setup.system.time.num_time_steps; },

    set_num_time_steps: function(val) { window.calculation.setup.system.time.num_time_steps = val; },

    get_time_step: function() { return window.calculation.setup.system.time.time_step; },

    set_time_step: function(val) { window.calculation.setup.system.time.time_step = val; },

    get_num_expval_time_steps: function() { return window.calculation.setup.system.time.num_expval_time_steps; },

    set_num_expval_time_steps: function(val) { window.calculation.setup.system.time.num_expval_time_steps = val; },

    get_initial_base_state_id: function() { return window.calculation.setup.initial_state.base_state.initial_base_state_id; },

    get_renormalise_wave_function: function() { return window.calculation.setup.initial_state.renormalise; },

    set_renormalise_wave_function: function(val) { window.calculation.setup.initial_state.renormalise = val; },

    get_calculate_overlap_with_ground: function() { return window.calculation.setup.expectation_values.calculate_overlap_with_ground | 0; },

    set_calculate_overlap_with_ground: function(val) { window.calculation.setup.expectation_values.calculate_overlap_with_ground = val; },

    get_calculate_overlap_with_initial: function() { return window.calculation.setup.expectation_values.calculate_overlap_with_initial | 0; },

    set_calculate_overlap_with_initial: function(val) { window.calculation.setup.expectation_values.calculate_overlap_with_intial = val; },

    get_calculation_template: function(system_type, name) {

        var possible_templates =
            _.filter(
                window.calculation_templates,
                function(el) {
                    return (el['system_type'] == system_type);
                }
            )[0];

        var template_calculation =
            _.filter(
                possible_templates.templates,
                function(el) {
                    return (el['name'] == name);
                }
            )[0];

        return JSON.parse(template_calculation.json).calculation;

    },

    get_hamiltonian_operator: function(operator_id) {
        // Assumes operators are loaded and just
        // gets the one with the right ID
        //
		var hamiltonian_operator =
			_.filter(
				window.all_operators.operators,
				function (el) {
					return el.operator_id == operator_id;
				}
			)[0];

        return hamiltonian_operator;
    },

    get_spatial_or_temporal_function: function(function_type, id) {

        if (function_type == 'spatial') {
            var to_filter = window.spatial_fns;
        } else if (function_type == 'temporal') {
            var to_filter = window.temporal_fns;
        }

        var relevant_function = _.filter(
            to_filter.fns,
            function(el) {
                return el['id'] == id;
            }
        )[0];

        return relevant_function;

    },


    get_spatial_function: function(id) {
        return tnt.get_spatial_or_temporal_function('spatial', id);
    },

    get_temporal_function: function(id) {
        return tnt.get_spatial_or_temporal_function('temporal', id);
    },

    get_spatial_function: function(selected_spatial_function_id) {

        var relevant_spatial_function = _.filter(
            window.spatial_fns.fns,
            function(el) {
                return el['id'] == selected_spatial_function_id;
            }
        )[0];

        return relevant_spatial_function;

    },

    personalise_calculation: function () {
        // Associate the logged in user with this calculation
        window.calculation.meta_info.user.email = window.user.email;
        window.calculation.meta_info.user.id = window.user.id;
    },

    go: function() {
        // Start the show
        tnt.initialise_blank_calculation();
    },

	initialise_blank_calculation: function () {
		// Pull in the blank template for a calculation and set window.calculaton = the template
		$.get('/api/v1.0/blank_calculation',
			function (data) {
				window.calculation = data;
                tnt.personalise_calculation();
	  			console.log("Initialised blank calculation. \n\n");
			}
		).done(tnt.initialise_new_calculation_basic_setup_step);


        // Not quite sure where to put this, we need these definitions eventually..
        tnt.load_spatial_and_temporal_function_definitions();

        // Also this should maybe go somewhere else.. restrict the input on numeric fields
        // so people can't enter something wrong
        tnt.enforce_numeric_restrictions_to_inputs();

	}, // End of initialise_blank_calculation

	load_spatial_and_temporal_function_definitions: function() {
		// Make an API call and pull in these definitions
		console.log("Loading spatial and temporal function definitions...\n\n");

		$.get('/api/v1.0/spatial_and_temporal_functions',
			function(data) {

            var temp_data = _.cloneDeep(data);

                window.spatial_fns = {
                    'fns': _.filter(
                        temp_data.fns,
                        function (el) {
                            return (el['use_for_spatial_hamil'] == true)
                        }
                    )
                };

                _.each(
                    window.spatial_fns.fns,
                    function(el) {
                        el['type'] = 'spatial';
                    }
                );

            var temp_data = _.cloneDeep(data);

                window.temporal_fns = {
                    'fns': _.filter(
                        temp_data.fns,
                        function (el) {
                            return (el['use_for_temporal_hamil'] == true)
                        }
                    )
                };

                // Add flags for the type of function, and any other modifications relevant to temporal
                _.each(
                    window.temporal_fns.fns,
                    function(el) {
                        el['type'] = 'temporal';
                        el['function_tex_str']
                            = tnt.replaceAll('j', 't', el['function_tex_str']);
                    }
                );

			}
		).done(function() {
    		console.log("Loaded spatial and temporal function definitions\n\n");
  		});

	},	// End of load_spatial_function_definitions

	render_available_hamiltonian_operators: function (
        qn_enforced,
        where_to_render_selector,
        hamiltonian_term_container_selector,
        no_terms_yet_warning_selector,
        next_calculation_stage_btn_selector,
        hamiltonian_tex_str_el,
        display_temporal_info) {
        //

        // Now check if number conservation is being enforced
        var hamiltonian_operators_to_render = window.hamiltonian_operators;

        if ( qn_enforced == 1 ) {
            var hamiltonian_operators_to_render =
                {'operators':
                    _.filter(
                        window.hamiltonian_operators.operators,
                        function (el) {
                            return el['U1_invariant'];
                        }
                    )
                };
        }

        var template = tnt.handlebars_templates["hamiltonian-operator-template"];

        $(where_to_render_selector)
            .html(template(hamiltonian_operators_to_render));

        $(where_to_render_selector + " .hamiltonian-operator-btn")
            .click(function() {
                tnt.add_hamiltonian_term(
                    tnt.get_hamiltonian_operator($(this).data("operator-id")),
                    hamiltonian_term_container_selector,
                    no_terms_yet_warning_selector,
                    next_calculation_stage_btn_selector,
                    hamiltonian_tex_str_el,
                    display_temporal_info,
                    true
                );
            });

        tnt.render_mathjax();
        $(".operator_loading_placeholder")
            .css("display", "none")

	}, // End of render_available_hamiltonian_operators

	render_available_intitial_state_modifier_operators:
        function (where_to_render,
                  sum_or_product,
                  hamiltonian_tex_str_el
                  ) {
            // Transformations we can apply to the base state
            // We draw these choices in where_to_render
            // sum_or_product is 'sum' or 'product'
            console.log("Rendering initial base state modifiers...\n\n");

            // First check which ones comply with QN
            var dynamic_qn =
                window
                .calculation
                .setup
                .system
                .number_conservation
                .dynamic
                .apply_qn;

            var cloned_initial_state_modifiers =
                _.cloneDeep(
                    window.initial_state_modifier_operators
                );

            if (dynamic_qn == 1) {

                var complying_initial_state_modifiers =
                    {
                        'operators':
                        _.filter(
                            cloned_initial_state_modifiers.operators,
                            function(el) {
                                return el['U1_covariant'] == true;
                            }
                        )
                    };

            } else {

                var complying_initial_state_modifiers = cloned_initial_state_modifiers;

            }

            _.each(
                complying_initial_state_modifiers.operators,
                function(el) {
                    el['sum_or_product'] = sum_or_product;
                }
            );

            var template = tnt.handlebars_templates["hamiltonian-operator-template"];

            $(where_to_render)
                .html(template(complying_initial_state_modifiers));

            // Add behaviour to modifier buttons
            $(where_to_render).find(".hamiltonian-operator-btn")
                .click(function() {

                    var hamiltonian_operator
                        = tnt.get_hamiltonian_operator($(this).data("operator-id"));

                    hamiltonian_operator['sum_or_product'] = $(this).data('sum-or-product');

                    tnt.add_hamiltonian_term(
                        hamiltonian_operator,
                        $(where_to_render).closest('.initial_state_modifier_sum_or_product').find('.initial_state_modifier_operators_terms'),
                        '',
                        '',
                        '',
                        false,
                        true
                    );
                });


            tnt.render_mathjax();

            $(".operator_loading_placeholder")
                .css("display", "none")
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

	attach_click_fn_to_remove_hamiltonian_terms: function (
        hamiltonian_term_container_selector,
        hamiltonian_tex_str_el,
        update_tex_str_fn
    ) {
		// When an initial base state is chosen, need to make that button active and all others not
		$(hamiltonian_term_container_selector).find(".remove-hamiltonian-term-btn")
			.click(

				function (e) {
					var hamiltonian_term_containing_div
                        = $(this).closest('.hamiltonian-term');

					// If there are no more Hamiltonian terms left, add back in the warning sign
					if ($('.hamiltonian-term').length == 1) {

                        $(this)
                        .closest(".new-calculation-step")
                        .find(".no-terms-added")
                        .css("display", "block");

                        // Prevent user from proceeding
                        $(this)
                        .closest(".new-calculation-step")
                        .find(".new-calculation-step-navigation .btn-next-step")
                        .attr("disabled", true);


					} else {
                    }

					$(hamiltonian_term_containing_div).remove();

                    update_tex_str_fn(
                        hamiltonian_term_container_selector,
                        hamiltonian_tex_str_el
                    );

				}
			);
	},

    attach_click_fn_to_remove_all_terms: function () {
        $(".remove-all-terms-btn").click(
            function (e) {
                console.log("Removing all terms...\n\n");

                var hamiltonian_terms_container_super =
                    $(this)
                    .closest(".hamiltonian_terms_container_super");

                var hamiltonian_terms_container =
                    $(hamiltonian_terms_container_super)
                    .find(".hamiltonian_terms_container");

                var hamiltonian_tex_str =
                    $(hamiltonian_terms_container_super)
                    .find(".hamiltonian_tex_str");

                $(hamiltonian_terms_container).empty();

                tnt
                .update_hamiltonian_tex_str(
                    hamiltonian_terms_container,
                    hamiltonian_tex_str
                );

            }
        );
    },

	attach_click_fn_to_expectation_operator_choices: function () {
		// When an expectation operator is chosen, need to toggle it's 'active' class
		$(".expectation-operator-btn")
			.click(
				function (e) {

					$(this).toggleClass("active");

                    if ( $(".expectation-operator-btn.active").length > 0) {
                        $("#no_expectation_operators_added_yet_warning").css("display", "none");

                    } else {

                        $("#no_expectation_operators_added_yet_warning").css("display", "block");

                    }

					e.preventDefault();

				}
			);
	},

	render_available_initial_base_states: function () {
		// Draw in buttons showing available initial states
		$.get("/api/v1.0/initial_base_states",
			function (data) {

                var filtered_data =
                    {
                        'states':
                        _.filter(
                            data.states,
                            function(el) {
                                return ( (el['system_type'] == tnt.get_system_type() ) || (el['system_type'] == 'all') );
                            }
                        )
                    };

				window.initial_base_states = filtered_data;

				// We only display the ground state as a choice if certain conditions are met
                var calculating_ground_state = window.calculation.setup.system.calculate_ground_state;
                var ground_qn = window.calculation.setup.system.number_conservation.ground.apply_qn;
                var dynamic_qn = window.calculation.setup.system.number_conservation.dynamic.apply_qn;

				if (calculating_ground_state == 0)
                {
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
				} else {
                    // We ARE calculating the ground state
                    if ( (dynamic_qn == 0) || ( (ground_qn == 1) && (dynamic_qn == 1) ) ) {
                        // Then we can display the ground state
                    } else {
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
                }

				var template = tnt.handlebars_templates["initial-base-states-template"];

				$("#new_calculation_available_initial_base_states")
                    .html(template(window.initial_base_states));

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
		console.log("Rendering available expectation value operators...\n\n");

		window.expectation_operators = {
			'operators':
			_.filter(
				window.all_operators.operators,
				function (el) {
					return (el['use_for_expectation'] == true)
				}
			)
		};

		console.log("Filtered all operators to the expectation operators\n\n");

        // Now check if number conservation is being enforced (ground AND dynamic)
        if ( (parseInt(window.calculation.setup.system.number_conservation.ground.apply_qn) == 1)
             &&
             (parseInt(window.calculation.setup.system.number_conservation.dynamic.apply_qn) == 1) ) {

            window.expectation_operators =
                {'operators':
                    _.filter(
                        window.expectation_operators.operators,
                        function (el) {
                            return el['U1_invariant'];
                        }
                    )
                };

             }

		console.log("Filtered expectation operators to matching QN status\n\n");

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

		console.log("Filtered expectation operators to single site ones\n\n");

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

		console.log("Filtered expectation operators to two site ones\n\n");

		var single_site_source = $("#expectation-operators-single-site-template").html();
		var single_site_template = Handlebars.compile(single_site_source);

		var two_site_source = $("#expectation-operators-two-site-template").html();
		var two_site_template = Handlebars.compile(two_site_source);

		// Render single- and two- site operators separately
		$("#new_calculation_available_expectation_operators_single_site")
			.html(single_site_template(single_site_expectation_operators));

		console.log("Rendered single site operators\n\n");

		$("#new_calculation_available_expectation_operators_two_site")
			.html(two_site_template(two_site_expectation_operators));

		console.log("Rendered two site operators\n\n");

		tnt.attach_click_fn_to_expectation_operator_choices();

		console.log("Attached click functions to exp op choices\n\n");

		tnt.render_mathjax();

	}, // End of render_available_initial_base_states

	add_hamiltonian_term: function(hamiltonian_operator,
                                   term_container_selector,
                                   no_terms_yet_warning_selector,
                                   next_calculation_stage_btn_selector,
                                   hamiltonian_tex_str_el,
                                   include_temporal_function,
                                   update_tex_str ) {
		// Add a visual representation of a Hamiltonian term to the screen, and render any user input elements necessary (e.g. inputs for spatial parameter values)
        // If the Hamiltonian operator has a spatial_fn field, then
        // set up the element to reflect this
        // if include_temporal_function is false, then don't add in all the temporal stuff


        include_temporal_function = typeof include_temporal_function !== 'undefined' ? include_temporal_function : true;

		var template = tnt.handlebars_templates["hamiltonian-term-template"];

        // If there is not already a spatial function attached,
        // put in a default
        if ( _.has(hamiltonian_operator, 'spatial_function') != true) {

            hamiltonian_operator['spatial_function'] = tnt.get_spatial_function(1);

        }

        // We represent if this is part of a sum or product term
        // with icons - default this to sum if not present
        if ( _.has(hamiltonian_operator, 'sum_or_product') != true) {

            hamiltonian_operator['sum_or_product'] = 'sum';

        }

        // If there is not already a temporal function attached,
        // put in a default
        if (include_temporal_function === false) {

            hamiltonian_operator['include_temporal_function'] = false;

        } else {

            hamiltonian_operator['include_temporal_function'] = true;

            if ( _.has(hamiltonian_operator, 'temporal_function') != true) {

                hamiltonian_operator['temporal_function'] = tnt.get_temporal_function(0);

            }

        }

        // Let's work out how many terms there already are,
        // and assign this one a number
        var existing_indices
            = _.map(
                $(term_container_selector).find('.hamiltonian-term'),
                function(el) {
                    return $(el).data("index");
                }
            );

        hamiltonian_operator['index'] = tnt.min_int_not_in_array(existing_indices);

        // Add GUI element
		$(term_container_selector)
            .append(template(hamiltonian_operator));

        // Update Hamiltonian str if required
        if (update_tex_str == true) {
            tnt.update_hamiltonian_tex_str(
                term_container_selector,
                hamiltonian_tex_str_el
            );
        }

		$(no_terms_yet_warning_selector)
            .css('display', 'none');

        $(next_calculation_stage_btn_selector)
            .removeAttr("disabled");

		tnt.attach_click_fn_to_remove_hamiltonian_terms(
            term_container_selector,
            hamiltonian_tex_str_el,
            tnt.update_hamiltonian_tex_str
        );

		tnt.attach_click_fn_to_spatial_and_temporal_fn_choices();	// Attach logic for changing spatial function input

		tnt.render_mathjax();

	},

    update_initial_state_modifiers_tex_str: function(
        initial_state_modifier_container,
        tex_str_el) {
        // When an initial state modifier is added,
        // we update a tex string
        var tex_str = "\\(";   // init

        tex_str = tex_str +  "| \\Psi \\rangle_{\\mathrm\{start\}} = ";

        // actual work
        var operator_indices
            = _.map(
                $(".initial_state_modifier_sum_or_product"),
                function(el) {
                    return $(el).data("index");
                }
            );

        operator_indices.reverse();

        _.each(
            operator_indices,
            function (index) {
                tex_str = tex_str + "\\hat{O}_{" + index + "} ";
            }
        );

        tex_str = tex_str + " | \\Psi \\rangle_{\\mathrm\{base\}}"

        tex_str = tex_str + "\\)";

        $(tex_str_el).html(tex_str);

        tnt.render_mathjax_in_element_with_id("initial_state_modifiers_tex_str");

    },

    update_hamiltonian_tex_str: function(
        hamiltonian_term_container_selector,
        hamiltonian_tex_str_el) {
        // Update a Hamiltonian tex string representation
        // of the input Hamiltonian.
        // hamiltonian_term_container_selector is where we source Ham terms
        // hamiltonian_tex_str_el is where to draw the results
        //

        var hamiltonian_tex_str = "";

        // First we loop over the terms and collect relevant info
        var hamiltonian_terms = [];

		_.each($(hamiltonian_term_container_selector).find('.hamiltonian-term'),
	       function (term, index) {

	       	  var hamiltonian_operator = tnt.convert_operator_gui_element_into_hamiltonian_term_json(term);

              hamiltonian_terms.push(hamiltonian_operator);

	       }
		); 	// End of loop over Hamiltonian terms

        var two_site_terms = [];
        var single_site_terms = [];

        _.each(
            hamiltonian_terms,
            function (el) {
                if (el['two_site'] == true) {
                    two_site_terms.push(el);
                } else {
                    single_site_terms.push(el);
                }
            }
        );

        if (two_site_terms.length > 0) {

            hamiltonian_tex_str = hamiltonian_tex_str + "\\sum_{j=0}^{L-2} \\left \\{";

            _.each(
                two_site_terms,
                function (hamiltonian_operator, index) {
                    var possible_new_line = ( ( (index) % 3 == 0 ) && (index != 0) ) ? "\\\\" : "";
                    var possible_plus_sign = (index == 0) ? "" : " + ";
                    var function_arguments = (hamiltonian_operator['include_temporal_function'] == true) ? "(j, t)" : "(j)";
                    var possible_left_bracket = (hamiltonian_operator['number_of_terms'] > 1) ? "\\left (" : "";
                    var possible_right_bracket = (hamiltonian_operator['number_of_terms'] > 1) ? "\\right )" : "";

                    hamiltonian_tex_str = hamiltonian_tex_str
                                        + possible_new_line
                                        + possible_plus_sign
                                        + "f_{" + hamiltonian_operator["index"] + "}"
                                        + function_arguments
                                        + possible_left_bracket
                                        + hamiltonian_operator["function_tex_str"]
                                        + possible_right_bracket;
                }
            );

            hamiltonian_tex_str = hamiltonian_tex_str + "\\right \\}";

        }

        if (single_site_terms.length > 0) {

            hamiltonian_tex_str = hamiltonian_tex_str + "\\\\ + \\sum_{j=0}^{L-1} \\left \\{";

            _.each(
                single_site_terms,
                function (hamiltonian_operator, index) {
                    var possible_new_line = ( ( (index) % 3 == 0 ) && (index != 0) ) ? "\\\\" : "";
                    var possible_plus_sign = (index == 0) ? "" : " + ";
                    var function_arguments = (hamiltonian_operator['include_temporal_function'] == true) ? "(j, t)" : "(j)";
                    var possible_left_bracket = (hamiltonian_operator['number_of_terms'] > 1) ? "\\left (" : "";
                    var possible_right_bracket = (hamiltonian_operator['number_of_terms'] > 1) ? "\\right )" : "";

                    hamiltonian_tex_str = hamiltonian_tex_str
                                        + possible_new_line
                                        + possible_plus_sign
                                        + "f_{" + hamiltonian_operator["index"] + "}"
                                        + function_arguments + " "
                                        + possible_left_bracket
                                        + hamiltonian_operator["function_tex_str"]
                                        + possible_right_bracket;
                }
            );

            hamiltonian_tex_str = hamiltonian_tex_str + "\\right \\}";

        }

        var hamiltonian_tex_str = "\\[ H = " + hamiltonian_tex_str + "\\]";

        $(hamiltonian_tex_str_el).html(hamiltonian_tex_str);

        tnt.render_mathjax();

    },

	attach_click_fn_to_spatial_and_temporal_fn_choices: function () {
		// Attach a click listener to the list elements representing different spatial function variations, updating parameter input fields accordingly
		$(".spatial-or-temporal-function-btn-group").on("change",

			function (e) {

				var selected_function_id = $(this).val();

				// Get info on the selected function
                // Is is a spatial or temporal function?

                var spatial_or_temporal
                = $("option:selected", this)
                    .data('function-type')
;
                if (spatial_or_temporal == 'spatial') {
    				var relevant_function = tnt.get_spatial_function(selected_function_id);
                } else if (spatial_or_temporal == 'temporal') {
    				var relevant_function = tnt.get_temporal_function(selected_function_id);
                }

				// When clicked, change the input form elements to
                // the relevant ones for this function choice
				var template = tnt.handlebars_templates["spatial-or-temporal-function-parameter-input-template"];

				var hamiltonian_term_containing_div
                    = $(this).closest('.hamiltonian-term');

                if (spatial_or_temporal == 'spatial') {

                    var function_parameter_input_form = $(hamiltonian_term_containing_div)
                        .find('.spatial_parameter_input_div .spatial_or_temporal_function_parameter_input_form');

                } else if (spatial_or_temporal == 'temporal') {

                    var function_parameter_input_form = $(hamiltonian_term_containing_div)
                        .find('.temporal_parameter_input_div .spatial_or_temporal_function_parameter_input_form');

                }

				$(function_parameter_input_form)
                .html(template(relevant_function));

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

    get_calculation_templates_for_system_type: function(system_type) {
        return _.filter(
            window.calculation_templates,
            function (el) {
                return (el['system_type'] == system_type);
            }
        )[0];
    },

    update_available_calculation_templates: function(system_type, name) {
        // update list of template a user can choose from for this type
        name = name || "";
        var select = document.getElementById("calculation_template_choice");

        var templates = tnt.get_calculation_templates_for_system_type(system_type).templates;

        $(select).empty();

        _.each(
            templates,
            function(template) {
                var option = document.createElement('OPTION');
                select.options.add(option);
                option.text = template['name'];
            }
        );

        if (name != "") {
            $(select).val(name);
        }
    },

    update_basic_system_dimensions: function() {
        // reads off chi, system size etc from window.calculation, updates selects
        $("#system_size_choice")
            .val(window.calculation.setup.system.system_size);
        $("#chi_choice")
            .val(window.calculation.setup.system.chi);
    },

    change_calculation_template: function(system_type, name) {
        //
        $("#calculation_name").val(name);
        window.calculation = tnt.get_calculation_template(system_type, name);
        tnt.update_available_calculation_templates(system_type, name);
        tnt.update_basic_system_dimensions();

    },

	// Following is a list of functions that verify data input and also set up the various data input panels for a new calculation
	initialise_new_calculation_basic_setup_step: function () {
		//
		console.log("Initialising new calculation basic setup input\n\n");

        // Pull in info on available calculation templates
        $.get(
            '/api/v1.0/calculation_templates',
            function(data) {
                window.calculation_templates = data.template_info;
                // Now set which one is the default calculation:
                var default_calc_type = "spin";
                var default_calc_name = "Blank spin calculation";

                tnt.change_calculation_template(default_calc_type, default_calc_name);

            }
        );

        tnt.compile_handlebars_templates();

        // Set up the selectors for system size
        tnt.set_up_numeric_range_dropdown(
            "system_size_choice",
            tnt.system_size_min,
            tnt.system_size_max,
            tnt.system_size_default
        );

        // Set up the selectors for chi
        tnt.set_up_numeric_range_dropdown(
            "chi_choice",
            tnt.chi_min,
            tnt.chi_max,
            tnt.chi_default
        );

        tnt.update_basic_system_dimensions();

        $("#calculation_template_choice")
            .on(
                "change",
                function (e) {
                    var system_type = tnt.get_system_type();
                    var name = $(this).val();

                    tnt.change_calculation_template(system_type, name);

                }
            );

		$(".btn-system-type")
			.click(function(el) {
				$(".btn-system-type").removeClass("active");
				$(this).addClass("active");

				var chosen_system_type = $(this).data("system-type");

                tnt.set_system_type(chosen_system_type);

				// Hide all extra input panels
				$(".system_type_extra_info").css("display", "none");

                // Update available calculation templates
                tnt.update_available_calculation_templates(chosen_system_type);

				// Choose what extra inputs to reveal:
				if (chosen_system_type == "spin") {
					$("#system_type_extra_info_spins").css("display", "block");
				} else if (chosen_system_type == "bosonic") {
					$("#system_type_extra_info_bosons").css("display", "block");
				} else if (chosen_system_type == "fermionic") {
					$("#system_type_extra_info_fermions").css("display", "block");
                }

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

        // Get the name the user has input, even if it's blank:
        window
        .calculation
        .meta_info
        .name = $("#calculation_name").val();

		var system_type = $(".btn-system-type.active").data("system-type"); // From the selected button, find system type

        tnt.set_system_type(system_type);

		var system_size = parseInt($("#system_size_choice").val());	// How many sites?

		window
        .calculation
        .setup
        .system
        .system_size = system_size;	// Update the calculation

		// Now process any extra info to do with the system type
		if (system_type == "spin") {

			var spin_magnitude = parseInt($("#system_type_extra_info_spins_choice").val());

			window
            .calculation
            .setup
            .system
            .system_type
            .extra_info['spin_magnitude'] = spin_magnitude;

		} else if (system_type == "bosonic") {

			console.log("System type = bosonic");

			var bosonic_truncation = parseInt($("#system_type_extra_info_bosons_choice").val());

			console.log("Bosonic truncation parameter = " + bosonic_truncation);

			window
            .calculation
            .setup
            .system
            .system_type
            .extra_info['bosonic_truncation'] = bosonic_truncation;

		} else if (system_type == "fermionic") {

            console.log("System type = fermionic");

            var fermion_type = $("label.active input",
                                          "#fermions_spinless_choice")
                                        .data("fermion-type");

            console.log("Fermion type = " + fermion_type);

			window
            .calculation
            .setup
            .system
            .system_type
            .extra_info['fermion_type'] = fermion_type;

        }


		var chi = parseInt($("#chi_choice").val());	// \chi

		window
        .calculation
        .setup
        .system
        .chi = chi;

		console.log("Validated new calculation basic setup input");

        // We're going to pull in all the operator data we need for the rest of the setup here before we proceed
        console.log("Pulling in operator data from API...")

        $.get("/api/v1.0/operators",
			function (data) {

				// First filter to operators corresponding to the chosen system type
                var system_type = tnt.get_system_type();
                var filtered_data =
                    {'operators':
                        _.filter(
                            data.operators,
                            function(el) {
                                return el['term_type'] == system_type;
                            }
                        )
                    };

				// Keep this data available:
				window.all_operators = filtered_data;

				window.hamiltonian_operators =
					{
						'operators':
						_.filter(
							window.all_operators.operators,
							function(el) {
								return el['use_for_hamiltonian'] == true;
							}
						)
					};

				// We use these same palette of operators to modify initial states - filter
				// appropriately and store them here rather than making an identical call later
				window.initial_state_modifier_operators =
					{
						'operators':
						_.filter(
							window.all_operators.operators,
							function(el) {
								return el['use_for_transform'] == true;
							}
						)
					};

			}
		).done(function () {
            console.log("Finished loading data from API");
            tnt.initialise_new_calculation_ground_state();
        })

	},

	initialise_new_calculation_define_ground_hamiltonian: function () {
		//
		console.log("Initialising new calculation Hamiltonian input");

		tnt.render_available_hamiltonian_operators(
            parseInt(window.calculation.setup.system.number_conservation.ground.apply_qn),
            "#new_calculation_available_ground_hamiltonian_operators",
            "#ground_hamiltonian_terms_container",
            "#no_ground_hamiltonian_terms_added_yet_warning",
            "#new_calculation_define_ground_hamiltonian .btn-next-step",
            "#ground_hamiltonian_tex_str",
            false);

        tnt.attach_click_fn_to_remove_all_terms();

		tnt.clear_all_new_calculation_stages();

		$("#new_calculation_define_ground_hamiltonian")
            .css('display', 'block');

        // Render in any terms defined int he template:
        if (window.calculation.setup.hamiltonian.ground.terms.length != 0) {
            var terms_to_add = window.calculation.setup.hamiltonian.ground.terms;
        } else {
            var terms_to_add = window.calculation.setup.hamiltonian.dynamic.terms;
        }

        _.each(
            terms_to_add,
            function(el) {
                var el_clone = _.cloneDeep(el);
                el_clone['include_temporal_function'] = false;
                tnt.add_hamiltonian_term(
                    el_clone,
                    "#ground_hamiltonian_terms_container",
                    "#no_ground_hamiltonian_terms_added_yet_warning",
                    "#new_calculation_define_ground_hamiltonian .btn-next-step",
                    "#ground_hamiltonian_tex_str",
                    false,
                    true
                );
            }
        );

		$("#new_calculation_define_ground_hamiltonian .btn-next-step")
            .click(
                tnt.validate_new_calculation_define_ground_hamiltonian
            );

		$("#new_calculation_define_ground_hamiltonian .btn-back-step").click(
			tnt.initialise_new_calculation_ground_state
		);

	},

	convert_operator_gui_element_into_hamiltonian_term_json: function (term) {
		// We pass in a jquery wrapped gui representation of a hamiltonian
		// (or more generally quantum operator) term, and we get back a
		// JSON struct describing the term's spatial dependence etc

		var hamiltonian_operator_id = $(term).data("hamiltonian-operator-id");
        var index = $(term).data("index");

		var this_hamiltonian_operator
            = _.filter(
                window.all_operators.operators,
                function (operator) {
                    return operator['operator_id'] == parseInt(hamiltonian_operator_id);
                }
            )[0];

		// Need a deep clone of this object
		var hamiltonian_operator = _.cloneDeep(this_hamiltonian_operator);

        hamiltonian_operator['index'] = index;

		// Now get the spatial function ID:
		var spatial_function_id
            = parseInt($(term)
                .find('.spatial_parameter_input_div select')
                .val()
            );

		// Now get the temporal function ID:
        if ($(term).find('.temporal_parameter_input_div').length == 0) {
            var temporal_function_id = 0;
            hamiltonian_operator["include_temporal_function"] = false;
        } else {
            var temporal_function_id
                = parseInt($(term)
                    .find('.temporal_parameter_input_div select')
                    .val()
                );
            hamiltonian_operator["include_temporal_function"] = true;
        }

		// Get the corresponding spatial and temporal function dict representation
        var spatial_function
            = _.cloneDeep(
                tnt.get_spatial_function(parseInt(spatial_function_id))
        );

        var temporal_function
            = _.cloneDeep(
                tnt.get_temporal_function(parseInt(temporal_function_id))
        );

        // Now get the values for each of the parameters for the spatial function variation
        var spatial_function_parameter_input_form
            = $(term).find('.spatial_parameter_input_div .spatial_or_temporal_function_parameter_input_form');

        // Loop over the spatial function parameters for this term

        _.each($(spatial_function_parameter_input_form).find('.form-control'),

           function(el) {

               var function_parameter_id = $(el).data("parameter-id");

               var function_parameter_val = $(el).val()

               spatial_function.parameters[function_parameter_id - 1]['value']
                = function_parameter_val;

           }

        );

		// Now temporal function parameters
		var temporal_function_parameter_input_form
            = $(term).find('.temporal_parameter_input_div .spatial_or_temporal_function_parameter_input_form');

		// Loop over the spatial function parameters for this term
		_.each($(temporal_function_parameter_input_form).find('.form-control'),

		   function(el) {

		       var function_parameter_id = $(el).data("parameter-id");

		       var function_parameter_val = $(el).val()

		       temporal_function.parameters[function_parameter_id - 1]['value']
                = function_parameter_val;

		   }

		);

		hamiltonian_operator['spatial_function'] = spatial_function;

		hamiltonian_operator['temporal_function'] = temporal_function;

		return hamiltonian_operator;

	},

	validate_new_calculation_define_ground_hamiltonian: function () {
		//

        window
        .calculation
        .setup
        .hamiltonian
        .ground
        .terms = [];

		_.each($('#ground_hamiltonian_terms_container .hamiltonian-term'),
	       function (term) {

	       	   var hamiltonian_operator = tnt.convert_operator_gui_element_into_hamiltonian_term_json(term);

	           window
	           .calculation
	           .setup
	           .hamiltonian
               .ground
	           .terms
	           .push(hamiltonian_operator);

	       }
		); 	// End of loop over Hamiltonian terms

		tnt.initialise_new_calculation_time_evolution();

	},

	initialise_new_calculation_ground_state: function () {
		//
		console.log("Initialising new calculation ground state input");

		tnt.clear_all_new_calculation_stages();

        // Initialise the precision dropdown
        //
        for (var i=tnt.log_ground_state_precision_min; i<tnt.log_ground_state_precision_max+1; i++)
        {
            var select=document.getElementById("input_ground_state_precision_choice");
            var option = document.createElement("OPTION");
            select.options.add(option);
            option.text = -i;
            option.value = i;
            if (i == window.calculation.setup.system.log_ground_state_precision) {
                option.selected = true;
            }
        }


        // Initialise the possible choices for the quantum number, depending on system type
        var system_type = tnt.get_system_type();

        var system_size = window.calculation
                            .setup
                            .system
                            .system_size;

        // Setup a range of quantities depending on system type
        if (system_type == "spin") {

            var qn_conserve_help_content = "Click yes if the ground state you wish to calculate is an eigenstate of the total spin.";
            var qn_magnitude_help_content = "This number gives twice the total spin of the calculated ground state. Only values that are physically possible (given the magnitude of the spin per site and the system size) are displayed in the dropdown.";
            var qn_conserve_prompt = "Conserve total spin";
            var qn_magnitude_prompt = "Total spin \\( \\sum{2S} \\)";

            var spin_magnitude = window.calculation
                                .setup
                                .system
                                .system_type
                                .extra_info
                                .spin_magnitude;


            var quantum_num_min = -spin_magnitude*system_size;
            var quantum_num_max = +spin_magnitude*system_size;
            var quantum_num_default = 0;

            // We initialise a list holding the range of quantum numbers
            var quantum_num_possibilities = _.range(quantum_num_min, quantum_num_max + 1);

            // TODO: factor out these functions into different quantum number filters depending on system type
            quantum_num_possibilities = _.reject(
                quantum_num_possibilities,
                function (num) {

                    if ( tnt.is_odd(spin_magnitude) != true ) {   // 2S is even
                        if ( tnt.is_odd(num) ) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    if ( tnt.is_odd(system_size) ) { // Odd number of sites
                        if ( tnt.is_odd(spin_magnitude) ) {   // 2S is odd
                            if ( tnt.is_odd(num) ) {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    } else {    // Even number of sites
                        if ( tnt.is_odd(spin_magnitude) ) {   // 2S is odd
                            if ( tnt.is_odd(num) ) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            );

        } else if (system_type == "bosonic") {

            var qn_conserve_help_content = "Click yes if the ground state you wish to calculate is an eigenstate of the total boson number.";
            var qn_magnitude_help_content = "This number gives the total boson number of the calculated ground state. Only values that are physically possible (given the maximum number of bosons per site \( n_{\mathrm{max}} \) and the system size \(L\)) are displayed in the dropdown.";
            var qn_conserve_prompt = "Conserve total boson number";
            var qn_magnitude_prompt = "Total boson number N";

            var bosonic_truncation = window.calculation
                                .setup
                                .system
                                .system_type
                                .extra_info
                                .bosonic_truncation;

            var quantum_num_min = 1;
            var quantum_num_max = bosonic_truncation*system_size;
            var quantum_num_default = quantum_num_max;

            var quantum_num_possibilities = _.range(quantum_num_min, quantum_num_max + 1);

        } else if (system_type == "fermionic") {
            // TODO

            var qn_conserve_help_content = "Fermionic conservation help content";
            var qn_magnitude_help_content = "Total fermion number \( N \)";
            var qn_conserve_prompt = "Conserve total fermion number";
            var qn_magnitude_prompt = "Total fermion number \( N \)";
        }

        $("#ground_state_quantum_info #qn_conserve_prompt a")
            .attr("data-content", qn_conserve_help_content);

        $("#ground_state_quantum_info #qn_magnitude_prompt a")
            .attr("data-content", qn_magnitude_help_content);

        $("#ground_state_quantum_info #qn_conserve_prompt span")
            .html(qn_conserve_prompt);

        $("#ground_state_quantum_info #qn_magnitude_prompt span")
            .html(qn_magnitude_prompt);

        // Now initialise the quantum number dropdown
        tnt.set_up_numeric_vals_dropdown(
            "quantum_number_ground_state_choice",
            quantum_num_possibilities,
            quantum_num_default
        );

        $('#ground_state_quantum_number_info')
            .css('display', 'none');

		// hiding / displaying further ground state info
		$("#ground_state_calculation_choice input")
			.change(
				function () {

					if ($(this).data('calculate-ground-state') == 0) {
						$('#ground_state_extra_info_specification')
							.css('display', 'none');
					} else {
						$('#ground_state_extra_info_specification')
							.css('display', 'block');
					}

				}
			);

        // Hiding / displaying quantum number choices
		$("#ground_number_conservation_choice input")
			.change(
				function () {

					if (parseInt($(this).data('number-conservation')) == 0) {
						$('#ground_state_quantum_number_info')
							.css('display', 'none');
					} else {
						$('#ground_state_quantum_number_info')
							.css('display', 'block');
					}

				}
			);

        tnt.render_mathjax_in_element_with_id("ground_state_quantum_info");

        // Update if our template calculation is calculating ground state
        $("#ground_state_calculation_choice label").removeClass("active");

        if (window.calculation.setup.system.calculate_ground_state == 0) {
            $('#ground_state_extra_info_specification')
                .css('display', 'none');

                $("#ground_state_calculation_choice label input[data-calculate-ground-state=0]")
                    .closest("label")
                    .addClass("active");

        } else {
            $('#ground_state_extra_info_specification')
                .css('display', 'block');

            $("#ground_state_calculation_choice label input[data-calculate-ground-state=1]")
                .closest("label")
                .addClass("active");

            // What about QN conservation?
            if (window.calculation.setup.system.number_conservation.ground.apply_qn == 0) {
                $('#ground_state_quantum_number_info')
                    .css('display', 'none');
            } else {
                // Now set whatever the quantum number is:
                $("#quantum_number_ground_state_choice").val(window.calculation.setup.system.number_conservation.ground.qn);
                $('#ground_state_quantum_number_info')
                    .css('display', 'block');
            }

        }

		$("#new_calculation_ground_state").css('display', 'block');

        //$("#ground_state_quantum_number_info").css("display", "none");

		// Navigation
		$("#new_calculation_ground_state .btn-next-step").click(
			tnt.validate_new_calculation_ground_state
		);

		$("#new_calculation_ground_state .btn-back-step").click(
			tnt.initialise_new_calculation_basic_setup_step
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

        if (calculation.setup.system.calculate_ground_state == 1) {

            // Ground state precision:
            var log_ground_state_precision = parseInt($("#input_ground_state_precision_choice").val());

            window
            .calculation
            .setup
            .system
            .log_ground_state_precision = log_ground_state_precision;

            // Now let's see if the user wants to enforce number conservation:
            var enforce_number_conservation = parseInt($("label.active input", "#ground_number_conservation_choice")
                .data("number-conservation"));

            window
            .calculation
            .setup
            .system
            .number_conservation
            .ground
            .apply_qn = enforce_number_conservation;

            if (enforce_number_conservation == 1) {
                // Now see which qn chosen, and do checks
                window
                .calculation
                .setup
                .system
                .number_conservation
                .ground
                .qn = parseInt($("#quantum_number_ground_state_choice").val());
            }

        }

		console.log("Validated new calculation ground state input");

		// We work out what to display next
		if (calculate_ground_state == 1) {
			tnt.initialise_new_calculation_define_ground_hamiltonian();
		} else  {
			tnt.initialise_new_calculation_time_evolution();
		}

	},

	initialise_new_calculation_time_evolution: function () {
		//
		console.log("Initialising new calculation time evolution input\n");
		tnt.clear_all_new_calculation_stages();

        // If no ground state calculation specified then we MUST calculate a time evolution
        var calculate_ground_state = window.calculation.setup.system.calculate_ground_state;
        if (calculate_ground_state == 0) {
                $("#time_evolution_choice label").removeClass('active');
                $($("#time_evolution_choice label")[0]).addClass('active');
                $("#time_evolution_choice label")
                    .attr("disabled", "disabled");
        }

		$("#new_calculation_time_evolution").css('display', 'block');

        // What does the template say?
        if (tnt.get_calculate_time_evolution() == 1) {
            // Fill out values:
            $("#input_num_time_steps")
                .val(tnt.get_num_time_steps());

            $("#input_time_step_size")
                .val(tnt.get_time_step());

            $("#input_num_expval_time_steps")
                .val(tnt.get_num_expval_time_steps());

            $("#time_evolution_time_step_specification")
                .css("display", "block");

            // Now QN
            $("#dynamical_number_conservation_choice label").removeClass("active");
            var apply_dynamic_qn = tnt.get_apply_dynamic_qn();
            var selector = '#dynamical_number_conservation_choice label input[data-dynamical-number-conservation="' + apply_dynamic_qn + '"]';
            $(selector).closest("label").addClass("active");

        } else {
            $("#time_evolution_time_step_specification")
                .css("display", "none");
        }

		// Add a function so that if the user chooses not to calculate time evolution, we don't display inputs for time step info
		$("#time_evolution_choice input")
			.change(
				function () {
					if ($(this).data('calculate-time-evolution') == 0) {
						$('#time_evolution_time_step_specification').css('display', 'none');
					} else {
						$('#time_evolution_time_step_specification').css('display', 'block');
					}
				}
			);

		$("#new_calculation_time_evolution .btn-next-step").click(
			tnt.validate_new_calculation_time_evolution
		);

		// We work out what to display going backwards
		if (window.calculation.setup.system.calculate_ground_state == 1) {
			var previous_stage_initialisation_fn = tnt.initialise_new_calculation_define_ground_hamiltonian;
		} else  {
			var previous_stage_initialisation_fn = tnt.initialise_new_calculation_ground_state;
		}

		$("#new_calculation_time_evolution .btn-back-step").click(
			previous_stage_initialisation_fn
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

			var num_expval_time_steps_val = $("#input_num_expval_time_steps").val();
            // If user has left this blank, assume we want every time step
            if (num_expval_time_steps_val == "") {
                var num_expval_time_steps = 10;
            } else {
                var num_expval_time_steps = parseFloat(num_expval_time_steps_val);
            }

            // If there's anything wrong with the inputs, disaply a message and don't go to next page
            if ( (isNaN(num_time_steps)) ||
                 (isNaN(time_step_size)) ||
                 (isNaN(num_expval_time_steps)) ||
                 (num_time_steps > tnt.max_num_time_steps) ||
                 (num_expval_time_steps < num_time_steps / 200) ||
                 (num_expval_time_steps > num_time_steps)
               ) {
                $("#time_evolution_parameter_warning_msg").css("display", "block");
                return;
            }

            tnt.set_num_time_steps(num_time_steps);

            tnt.set_time_step(time_step_size);

            tnt.set_num_expval_time_steps(num_expval_time_steps);

            // Number conservation checks:
            var enforce_dynamical_number_conservation = parseInt($("label.active input", "#dynamical_number_conservation_choice")
                .data("dynamical-number-conservation"));

            tnt.set_apply_dynamic_qn = enforce_dynamical_number_conservation;

		}

        $("#time_evolution_parameter_warning_msg").css("display", "none");

		// We work out what to display next
		if (calculate_time_evolution_choice == 1) {
			tnt.initialise_new_calculation_initial_state();
		} else  {
            tnt.initialise_new_calculation_expectation_operators();
		}

	},

    add_sum_or_product_modifier: function(sum_or_product, terms) {

        terms = terms || [];

        var existing_indices
            = _.map(
                $(".initial_state_modifier_sum_or_product"),
                function(el) {
                    return $(el).data("index");
                }
            );

        var index = tnt.min_int_not_in_array(existing_indices);

        var template = tnt.handlebars_templates["initial-state-modifier-sum-or-product-template"];

        $('#initial_state_modifier_container')
            .append(
                template(
                    {
                        'sum_or_product': sum_or_product,
                        'index': index
                    }
                )
            );

        var where_to_render_modifier_operator_btns
            = $('#initial_state_modifier_container .initial_state_modifier_sum_or_product:last  .initial_state_modifier_operators_container');

        var where_to_render_modifier_operator_terms
            = $('#initial_state_modifier_container .initial_state_modifier_sum_or_product:last  .initial_state_modifier_operators_terms');

        tnt.render_available_intitial_state_modifier_operators(
            where_to_render_modifier_operator_btns,
            sum_or_product,
            "#initial_state_modifiers_tex_str"
        );

        _.each(
            terms,
            function (term) {
                tnt.add_hamiltonian_term(
                    term,
                    $(where_to_render_modifier_operator_terms),
                    '',
                    '',
                    '',
                    false,
                    true
                );
            }
        );

        $('.initial_state_modifier_sum_or_product .remove-initial-state-modifier-btn')
            .click(function() {
                $(this)
                .closest('.initial_state_modifier_sum_or_product')
                .remove();

                tnt.update_initial_state_modifiers_tex_str(
                    '#initial_state_modifier_container',
                    "#initial_state_modifiers_tex_str"
                );
            }
        );

        tnt.update_initial_state_modifiers_tex_str(
            '#initial_state_modifier_container',
            "#initial_state_modifiers_tex_str"
        );

    },

	initialise_new_calculation_initial_state: function () {
		//
		console.log("Initialising new calculation initial state input");
		tnt.render_available_initial_base_states(); 	// Draw the choices available

		tnt.clear_all_new_calculation_stages(); // Clear all panels

        var dynamic_qn = tnt.get_apply_dynamic_qn();

        if (dynamic_qn == 0) {
            // Sum type allowed
        } else {
           $("#add_sum_modifier").css("display", "none");
        }

        // For reference further on, we build lists of spatial functions
        // filtered by sum, product, product non-covariant
        window.spatial_functions_sum_modifiers =
            {'fns':
                _.filter(
                    window.spatial_fns.fns,
                    function(el) {
                        return el['use_for_sum_modifier'] == true;
                    }
                )
            };

        window.spatial_functions_product_noncovariant_modifiers =
            {'fns':
                _.filter(
                    window.spatial_fns.fns,
                    function(el) {
                        return el['use_for_product_modifier_noncovariant'] == true;
                    }
                )
            };

        // Loading info from template:
        // Set initial base state
        var template_initial_base_state_id = tnt.get_initial_base_state_id();
        if ( (template_initial_base_state_id == 0 ) && ( tnt.get_calculate_ground_state() == 0 ) ) {
            // Template says start with ground, but user not selected a GS calculation
            // Pick a default
            template_initial_base_state_id = window.initial_base_states.states[0]['initial_base_state_id'];
            // Also clear modifiers
            window.calculation.setup.initial_state.applied_mpos = [];
        }

        $('.initial-state-btn[data-initial-base-state-id="' + template_initial_base_state_id + '"]')
            .addClass("active");

        // Template modifiers
        _.each(
            window.calculation.setup.initial_state.applied_mpos,
            function (mpo) {
                console.log(mpo['type']);
                tnt.add_sum_or_product_modifier(mpo['type'], mpo['applied_operators']);
            }
        );

        // renormalise?
        $("#renormalise_after_initial_state_modifiers_choice label")
            .removeClass("active");
        var renormalise = tnt.get_renormalise_wave_function() | 0;
        var selector = '#renormalise_after_initial_state_modifiers_choice label input[data-renormalise-initial-state="' + renormalise + '"]';
        $(selector).closest("label").addClass("active");

        $('.add-product-or-sum-modifier-btn')
            .click(function (e) {

                var sum_or_product = $(this).data('sum-product');

                tnt.add_sum_or_product_modifier(sum_or_product);

        });

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
		console.log("Validating the initial state choices...");

		var initial_base_state_choice = $(".initial-state-btn.active")
			.data("initial-base-state-id");

		console.log("initial_base_state_choice: " + initial_base_state_choice);

		var initial_base_state = _.filter(
			window.initial_base_states.states,
			function (el) {
				return el['initial_base_state_id'] == initial_base_state_choice;
			}
		)[0];

		console.log("initial_base_state: ");
		console.log(initial_base_state);

		window
        .calculation
        .setup
        .initial_state
        .base_state = initial_base_state;

        var dec_vals = {false: 0, true: 1};

        var renorm_initial_state = parseInt($("label.active input", "#renormalise_after_initial_state_modifiers_choice")
        .data("renormalise-initial-state"));
        window
        .calculation
        .setup
        .initial_state
        .renormalise = renorm_initial_state;

		// Now we look for modifiers to the base state:

        // First empty any existing modifiers:
        window
        .calculation
        .setup
        .initial_state
        .applied_mpos = [];

        // Loop over each product or sum operator
        _.each(
            $('#initial_state_modifier_container .initial_state_modifier_sum_or_product'),
            function(el) {

                var sum_or_product = $(el).data('sum-or-product');

                console.log("Found a " + sum_or_product + " modifier container...\n");

                var applied_operators_this_modifier = [];

                _.each(
                    $(el)
                    .find('.initial_state_modifier_operators_terms')
                    .find('.hamiltonian-term'),
                    function (term) {
                        console.log("In this container, found a Ham operator: \n");
                        var hamiltonian_operator = tnt.convert_operator_gui_element_into_hamiltonian_term_json(term);
                        console.log(hamiltonian_operator);
                        applied_operators_this_modifier.push(hamiltonian_operator);
                    }
                );

                window
                .calculation
                .setup
                .initial_state
                .applied_mpos
                .push({
                    "type": sum_or_product,
                    "applied_operators": applied_operators_this_modifier
                });

            }
        );

		tnt.initialise_new_calculation_define_dynamic_hamiltonian();

	},

	initialise_new_calculation_define_dynamic_hamiltonian: function () {
        //
		console.log("Initialising new calculation dynamic Hamiltonian specification input");

		tnt.clear_all_new_calculation_stages();

		console.log("All calculation stages cleared..");

        tnt.render_available_hamiltonian_operators(
            parseInt(window.calculation.setup.system.number_conservation.dynamic.apply_qn),
            "#new_calculation_available_dynamic_hamiltonian_operators",
            "#dynamic_hamiltonian_terms_container",
            "#no_dynamic_hamiltonian_terms_added_yet_warning",
            "#new_calculation_define_dynamic_hamiltonian .btn-next-step",
            "#dynamic_hamiltonian_tex_str",
            true
        );

        tnt.attach_click_fn_to_remove_all_terms();

        // If the ground state has been calculated, want to default
        // the dynamic Hamiltonian to the ground state one
        var default_temporal_function = tnt.get_temporal_function(0);

        if (window.calculation.setup.hamiltonian.dynamic.terms.length != 0) {
            var terms_to_add = window.calculation.setup.hamiltonian.dynamic.terms;
        } else {
            var terms_to_add = window.calculation.setup.hamiltonian.ground.terms;
        }

        _.each(
            terms_to_add,
            function(el) {
                var el_clone = _.cloneDeep(el);
                el_clone['include_temporal_function'] = true;
                el_clone['temporal_function'] = default_temporal_function;
                tnt.add_hamiltonian_term(
                    el_clone,
                    "#dynamic_hamiltonian_terms_container",
                    "#no_dynamic_hamiltonian_terms_added_yet_warning"
                );
            }
        );

        tnt.update_hamiltonian_tex_str(
            "#dynamic_hamiltonian_terms_container",
            "#dynamic_hamiltonian_tex_str"
        );

		$("#new_calculation_define_dynamic_hamiltonian")
			.css('display', 'block');

		console.log("made define dynamic hamiltonian stage visible");

		$("#new_calculation_define_dynamic_hamiltonian .btn-next-step").click(
			tnt.validate_new_calculation_define_dynamic_hamiltonian
		);

		$("#new_calculation_define_dynamic_hamiltonian .btn-back-step").click(
			tnt.initialise_new_calculation_initial_state
		);

    },

	validate_new_calculation_define_dynamic_hamiltonian: function () {
		//
		console.log("Validating the definition of the dynamic Hamiltonian...");

        window
        .calculation
        .setup
        .hamiltonian
        .dynamic
        .terms = [];

		_.each($('#dynamic_hamiltonian_terms_container .hamiltonian-term'),
	       function (term) {

	       	   var hamiltonian_operator = tnt.convert_operator_gui_element_into_hamiltonian_term_json(term);

	           window
	           .calculation
	           .setup
	           .hamiltonian
               .dynamic
	           .terms
	           .push(hamiltonian_operator);

	       }
		); 	// End of loop over Hamiltonian terms

        tnt.initialise_new_calculation_expectation_operators();

    },

	initialise_new_calculation_expectation_operators: function () {
		//
		console.log("Initialising new calculation expectation value input");

		tnt.clear_all_new_calculation_stages();

		console.log("All calculation stages cleared..");

        if (window.calculation.setup.system.calculate_ground_state == 1) {
            $("#calculate_overlap_with_ground_state_choice_div").css("display", "block");
        } else {
            $("#calculate_overlap_with_ground_state_choice_div").css("display", "none");
        }

        if (window.calculation.setup.system.calculate_time_evolution == 1)
        {
            $("#calculate_overlap_with_initial_state_choice_div").css("display", "block");

            if (window.calculation.setup.system.calculate_ground_state == 1) {
                $("#calculate_overlap_with_ground_state_choice_div").css("display", "block");
            } else {
                $("#calculate_overlap_with_ground_state_choice_div").css("display", "none");
            }

        } else {
            $("#calculate_overlap_with_initial_state_choice_div").css("display", "none");
            $("#calculate_overlap_with_ground_state_choice_div").css("display", "none");
        }

		tnt.render_available_expectation_operators();

		console.log("Rendered available expectation operators");

        // Load template data
        _.each(
            window.calculation.setup.expectation_values.operators,
            function(el) {
                $('.expectation-operator-btn[data-expectation-operator-id="' + el['operator_id'] + '"]').addClass("active");
                if (el['two_site'] == true) {
                    var selector = '.two-site-expectation-type-choice[data-expectation-operator-id="' + el['operator_id'] + '"]';
                    $(selector).val(el['exp_val_type']);
                }
            }
        );

        $("#calculate_overlap_with_initial_state_choice label")
            .removeClass("active");
        var selector = '#calculate_overlap_with_initial_state_choice label input[data-overlap-choice="' + tnt.get_calculate_overlap_with_initial() + '"]';
        $(selector).closest("label").addClass("active");

        $("#calculate_overlap_with_ground_state_choice label")
            .removeClass("active");
        var selector = '#calculate_overlap_with_ground_state_choice label input[data-overlap-choice="' + tnt.get_calculate_overlap_with_ground() + '"]';
        $(selector).closest("label").addClass("active");

		$("#new_calculation_expectation_operators")
			.css('display', 'block');

		console.log("made exp op stage visible");

		$("#new_calculation_expectation_operators .btn-next-step").click(
			tnt.validate_new_calculation_expectation_operators
		);

		// What comes before this stage depends on calculation parameters:
		if (window.calculation.setup.system.calculate_time_evolution == 1) {
			var previous_stage_initialisation_fn = tnt.initialise_new_calculation_initial_state;
		} else  {
			var previous_stage_initialisation_fn = tnt.initialise_new_calculation_time_evolution;
		}

		$("#new_calculation_expectation_operators .btn-back-step").click(
			//previous_stage_initialisation_fn
            //
            previous_stage_initialisation_fn
		);

	},  // End of initialise_new_calculation_expectation_operators

	validate_new_calculation_expectation_operators: function () {
		// Check that everything's OK and add the selected exp vals into the calculation JSON structure

        // Check if we want to calculate overlap with ground state:
        if (window.calculation.setup.system.calculate_ground_state == 1) {
            window
            .calculation
            .setup
            .expectation_values
            .calculate_overlap_with_ground = $("#calculate_overlap_with_ground_state_choice .btn.active input").data("overlap-choice");
        }

        // Check if we want to calculate overlap with initial state:
        if (window.calculation.setup.system.calculate_time_evolution == 1) {
            window
            .calculation
            .setup
            .expectation_values
            .calculate_overlap_with_initial = $("#calculate_overlap_with_initial_state_choice .btn.active input").data("overlap-choice");
        }

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

        $("#cancel_calculation").click(
            function () {
                window.location = '/';
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
