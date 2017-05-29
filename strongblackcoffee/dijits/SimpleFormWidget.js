define([
    "dojo/_base/declare",
    "dojo/dom",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/SimpleFormWidget.html",
],function(declare,dom,_WidgetBase,_TemplatedMixin,template){
    return declare([_WidgetBase,_TemplatedMixin],{
	labelA: "A",
	labelB: "B",
	templateString: template,

	postCreate: function() {
	    this.inherited(arguments);
	    dom.byId(this.id+"-disp").innerHTML = "start clicking";
	},

	clickedA: function() {
	    dom.byId(this.id+"-disp").innerHTML = "A was clicked";
	    this.set("value","A");
	},

	clickedB: function() {
	    dom.byId(this.id+"-disp").innerHTML = "B was clicked";
	    this.set("value","B");
	},
    });
});








