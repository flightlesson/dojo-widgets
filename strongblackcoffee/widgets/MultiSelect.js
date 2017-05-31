define(["dojo/_base/declare",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/_base/array",
	"dojo/query",
	"dijit/registry",
	"dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
	"dojo/text!./templates/MultiSelect.html"
], function( declare, dom, domConstruct, array, query, registry, WidgetBase, TemplatedMixin, template){
    // module:
    //		strongblackcoffee/widgets/MultiSelect
    //

    
    return declare([WidgetBase,TemplatedMixin],{
	// summary:
	//	Moves items between candidate list and selected list.
	//
	// example:
	// |	<select data-dojo-type="strongblackcoffee/widgets/MultiSelect">
	// |	  <option id="H">Hydrogen</option>
	// |	  <option id="He" selected="true">Helium</option>
	// |	  <option id="Ne" selected="true">Neon</option>
	// |	  <option id="Ar">Argon</option>
	// |	  <option id="Kr">Krypton</option>
	// |	  <option id="Xe">Xeon</option>
	// |	  <option id="Rn">Radon</option>
	// |	</select>
	//
	// example:
	// |    <!-- store returns a JSON string like:
	// |	     [{"value":"H","label":"Hydrogen","selected":false},
	// |	      {"value":"He","label":"Helium","selected":true},
	// |	      {"value":"Ne","label":"Neon","selected":true},
	// |	      {"value":"Ar","label":"Argon","selected":false},
	// |	      {"value":"Kr","label":"Krypton","selected":false},
	// |	      {"value":"Xe","label":"Xeon","selected":false},
	// |	      {"value":"Rn","label":"Radon","selected":false}]
	// |    -->
	// |	<select data-dojo-type="strongblackcoffee/widgets/MultiSelect"
	// |            data-dojo-options="store: myStore"><select>
	//
	// TODO:
	//	Reset doesn't work
	//	

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

	//store: null,

	constructor: function(params,srcNodeRef) {
	    this.optionsUniverse = [];
	    var opts = this.optionsUniverse;
	    array.forEach(query("option",srcNodeRef),function(opt){
		opts.push({value:opt.value,label:opt.label,selected:opt.selected});
	    });
	},

	drawInternalSelects: function() {
	    //console.log("drawInternalSelects: " + this.optionsUniverse.length);
	    domConstruct.empty(this.selectedOptionList);
	    domConstruct.empty(this.unselectedOptionList);
	    var newValue = [];
	    for (var i=0; i < this.optionsUniverse.length; ++i) {
		var opt = this.optionsUniverse[i];
		//console.log("opt is " + JSON.stringify(opt));
		var node = domConstruct.toDom("<option value="+opt.value+">"+opt.label+"</option>");
		//console.log("node is " + node);
		if (opt.selected) {
		    this.selectedOptionList.appendChild(node);
		    newValue.push(opt.value);
		} else {
		    this.unselectedOptionList.appendChild(node);
		}
	    }
	    this.set("value",newValue);
	},

	postCreate: function() {
            this.inherited(arguments);
	    //console.log("optionsUniverse is "+JSON.stringify(this.optionsUniverse));

	    // add options from store
	    if (this.store) {
		//console.log("adding options from store");
		var thisMultiSelect = this;
		var qr = this.store.query(this.query,this.queryOpts);
                if (qr.then) {
                    qr.then(function(r){
                        //console.log("query results: " + JSON.stringify(r));
                        for (var i=0; i < r.length; ++i) {
                            thisMultiSelect.optionsUniverse.push(r[i]);
                            thisMultiSelect.drawInternalSelects();
                        }
                    });
                } else {
                    qr.forEach(function(opt) {
                        thisMultiSelect.optionsUniverse.push(opt);
                    });
                    this.drawInternalSelects();
                }
	    }

	    //console.log("After adding options from store, this.optionsUniverse: " + JSON.stringify(this.optionsUniverse));

	    this.drawInternalSelects();
	    //console.log("leaving postCreate");
	},

	_moveSelecteds: function(fromListId,toListId,becomeSelected) {

	    var moveThese = query("option",fromListId).filter(function(x){return x.selected});
	    //console.log("_moveSelecteds: moveThese.length is " + moveThese.length);
	    if (moveThese.length == 0) return;

	    //for (var j=0; j < moveThese.length; ++j) {
	    //	console.log("_moveSelecteds: moveThese["+j+"] value=" + moveThese[j].value + ", selected=" + moveThese[j].selected);
	    //}

	    for (var i=0; i < this.optionsUniverse.length; ++i) {
		var opt = this.optionsUniverse[i];
		//console.log("_moveSelecteds: opt is " + JSON.stringify(opt));
		var inMoveThese = false;
		for (var j=0; j < moveThese.length; ++j) {
		    if (opt.value == moveThese[j].value) {
			inMoveThese = true;
			break;
		    }
		}

		if (inMoveThese) {
		    //console.log("Changing "+opt.value+" from "+opt.selected+" to "+becomeSelected);
		    opt.selected = becomeSelected;
		}
	    }
	    this.drawInternalSelects();
	},

	moveSelectedToUnselected: function() {
	    //console.log("moveSelectedToUnselected");
	    this._moveSelecteds(this.id+"-slist",this.id+"-clist",false);
	},

	moveUnselectedToSelected: function() { 
	    //console.log("moveUnselectedToSelected");
	    this._moveSelecteds(this.id+"-clist",this.id+"-slist",true);
	},

    });
});
