define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "dijit/_TemplatedMixin",
        "dojo/store/JsonRest",
        "dojo/data/ObjectStore",
        "dojo/text!dat/templates/RoleMultiSelect.html"],
       function(declare, WidgetBase, TemplatedMixin, JsonRest, ObjectStore, template) {
           
return declare([WidgetBase,TemplatedMixin],{
    name: "you-didnt-set-me",
    candidatesLabel: "candidates",
    selectedLabel: "selected",
    
    templateString: template,
    chosenAdd: function() { console.log("chosenAdd"); return false; },
    chosenRemove: function() { console.log("chosenAdd"); return false; },

    postCreate: function() {
        this.initialcandidatelist.innerHTML = "<option>dog</option><option>cat</option>";
        this.inherited(arguments);
    },
               
    store: new ObjectStore({
        objectStore: new JsonRest({
            target: "/npa/roles?map=id,role:label",
        }),
    }),
});
       });
