define(["dojo/_base/declare",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/query",
	"dijit/registry",
	"dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
	"dijit/form/_FormValueMixin",
	"dojo/store/JsonRest",
	"dojo/data/ObjectStore",
	"dojo/text!./templates/MultiSelect.html"
], function( declare, dom, domConstruct, query, registry, WidgetBase, TemplatedMixin, FormValueMixin, JsonRest, ObjectStore, template){
    // module:
    //		strongblackcoffee/dijit/MultiSelect
    //

    
   //return declare([WidgetBase,TemplatedMixin,FormValueMixin],{
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
	name: "you-didnt-set-me",

	// candidatesLabel: String
	//	Label for the candidates list. Default is "candidates".
	candidatesLabel: "candidates",

	// selectedLabel: String
	//	Label for the selected list. Default is "selected".
	selectedLabel: "selected",

	// selectedSize: Integer
	//	Height, in rows, of the candidates and selected lists.
	selectSize: 7,
	selectWidth: '12em',
    
	templateString: template,


	constructor: function(params,srcNodeRef) {
	    console.log("constructor");
	    this.universe = query("option",srcNodeRef);
	},



        _setValueAttr: function(newValue, priorityChange){
	    // param: newValue
	    //		An array of {value}, where {value} is as in <option value="{value}">
	    //		
            this.inherited(arguments);
	    console.log("_setValueAttr: " + JSON.stringify(newValue));

	    domConstruct.empty(this.selectedOptionList);
	    domConstruct.empty(this.unselectedOptionList);
	    for (var i=0; i < this.universe.length; ++i) {
		var opt = this.universe[i];
		var isselected = false;
		for (var j=0; j < newValue.length; ++j) {
		    if (opt.value == newValue[j]) {
			isselected = true;
			break;
		    }
		}
		console.log("opt " + opt.value + " is " + (isselected?"selected":"not selected"));
		opt.selected = false;

		if (isselected) {
		    this.selectedOptionList.appendChild(opt);
		} else {
		    this.unselectedOptionList.appendChild(opt);
		}

	    }
	},



	debugPrintUniverse: function() {
	    for (var i=0; i < this.universe.length; ++i) {
		var opt = this.universe[i];
		console.log("==> \"" + opt.value + "\" [" + opt.text + "]" + (opt.selected?" selected":""));
	    }
	},




	postCreate: function() {
            this.inherited(arguments);
	    var initialValues = [];
	    for (var i=0; i < this.universe.length; ++i) {
		if (this.universe[i].selected) {
		    initialValues.push(this.universe[i].value);
		}
	    }
	    this.set("value",initialValues);
	},



	moveSelectedToUnselected: function() {
	    console.log("moveSelectedToUnselected");
	    
	    var chosens = query("option",this.id+"-slist").filter(function(n){return n.selected});
	    if (chosens.length == 0) return;

	    var j=0;
	    for (var i=0; i < this.universe.length; ++i) {
		console.log("comparing "+chosens[j].value+" vs "+ this.universe[i].value);
		if (chosens[j].value == this.universe[i].value) {
		    console.log("unselecting " + this.universe[i].value + "["+this.universe[i].text+"]");
		    this.universe[i].selected = false;
		    if (++j >= chosens.length) break;
		}
	    }
	    this.debugPrintUniverse();
	    this.updateSelectionLists();
	},

	moveUnselectedToSelected: function() { 
	},

    });
});
