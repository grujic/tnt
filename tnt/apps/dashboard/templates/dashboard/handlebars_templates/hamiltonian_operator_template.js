{% verbatim %}

<script id="hamiltonian-operator-template" type="text/x-handlebars-template"> 
        
	    <div class="row">
	        {{#operators}}
		        <div class="col-md-3">
		            <button
		             type="button" 
		             class="btn btn-default form-control hamiltonian-operator-btn"
		             data-operator-id="{{operator_id}}">
		              <i>{{function_description}}</i>
		              \[ {{function_tex_str }} \]
		              <br>
		            </button>
		        </div>
	        {{/operators}}
	    </div>

</script>

{% endverbatim %}