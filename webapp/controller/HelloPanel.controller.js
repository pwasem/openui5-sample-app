"use strict";


(function() {


})();

sap.ui.define([

    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"

], (Controller, MessageToast) => Controller.extend("sap.ui.demo.wt.controller.HelloPanel", {

    onShowHello: function() {

        // read msg from i18n model¸
        let oBundle = this.getView().getModel("i18n").getResourceBundle();
        let sRecipient = this.getView().getModel().getProperty("/recipient/name");
        let sMsg = oBundle.getText("helloMsg", [sRecipient]);

        // show message
        MessageToast.show(sMsg);

    },

    onOpenDialog: function() {
      
        this.getOwnerComponent().getHelloDialog().open(this.getView());
    }

}));
