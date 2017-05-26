define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/store/JsonRest",
        "dojo/data/ObjectStore",
        "dojo/text!./templates/RoleMultiSelect.html"
], function(declare, WidgetBase, TemplatedMixin, JsonRest, ObjectStore, template){
    // module:
    //		strongblackcoffee/dijit/MultiSelect
    //
           
    return declare([WidgetBase,TemplatedMixin],{
	// summary:
	//	Moves items between candidate list and selected list.
	//
	// example:
	// |	<select data-dojo-type="strongblackcoffee/dijit/MultiSelect">
	// |	  <option id="He" selected="true">Helium</option>
	// |	  <option id="Ne" selected="true">Neon</option>
	// |	  <option id="Ar">Argon</option>
	// |	  <option id="Kr">Krypton</option>
	// |	  <option id="Xe">Xeon</option>
	// |	  <option id="Rn">Radon</option>
	// |	  <option id="Og">Oganesson</option>
	// |	</select>
	//

	// name: String
	//	The form variable's name.
	name: "you-didnt-set-me",+

	// candidatesLabel: String
	//	Label for the candidates list. Default is "candidates".
	candidatesLabel: "candidates",

	// selectedLabel: String
	//	Label for the selected list. Default is "selected".
	selectedLabel: "selected",

	// selectedSize: Integer
	//	Height, in rows, of the candidates and selected lists.
	selectSize: 7,
    
	templateString: template,

	constructor: function() {
	},

	chosenAdd: function() { console.log("chosenAdd"); return false; },

	ChosenRemove: function() { console.log("chosenAdd"); return false; },

	postCreate: function() {
            this.initialCandidateList.innerHTML = "<option>dog</option><option>cat</option>";
            this.inherited(arguments);
	},

    });
});
