"use strict";

sap.ui.define([

    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"

], (Controller, MessageToast) => Controller.extend("sap.ui.demo.wt.controller.App", {

    onOpenDialog: function () {
        this.getOwnerComponent().getHelloDialog().open(this.getView());
    }

}));

