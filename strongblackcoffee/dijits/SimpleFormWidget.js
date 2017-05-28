define([
    "dojo/_base/declare",
    "dojo/dom",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/SimpleFormWidget.html",
],function(declare,dom,WidgetBase,TemplatedMixin,template){
    return declare([WidgetBase,TemplatedMixin],{
	labelA: "A",
	labelB: "B",
	templateString: template,

	//_setValueAttr: function(newValue) {
	//    this.inherited(arguments);
	//    dom.byId(this.id+"-curval").innerHTML = newValue;
	//},

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








