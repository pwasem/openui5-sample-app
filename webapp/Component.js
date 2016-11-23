"use strict";

sap.ui.define([

    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/demo/wt/controller/HelloDialog"

], (UIComponent, JSONModel, HelloDialog) => UIComponent.extend("sap.ui.demo.wt.Component", {

    metadata: {
        manifest: "json"
    },

    init: function() {

        // call the init function of the parent
        UIComponent.prototype.init.apply(this, arguments);

        // set data model
        var oData = {
            recipient: {
                name: "World"
            }
        };
        var oModel = new JSONModel(oData);
        this.setModel(oModel);
    },

    getHelloDialog: function() {

        // create dialog lazily
        if (!this.helloDialog) {

            // set dialog
            this.helloDialog = new HelloDialog();

        }

        return this.helloDialog;
    },

    exit: function() {

        if (!this.helloDialog) {

            this.helloDialog.destroy();
        }

    }

}));