'use strict';

sap.ui.define([

  'sap/ui/core/mvc/Controller',
  'sap/m/MessageToast',
  'sap/ui/model/json/JSONModel',
  'sap/ui/model/resource/ResourceModel'

], (Controller, MessageToast, JSONModel, ResourceModel) => Controller.extend('sap.ui.demo.wt.controller.App', {

  onInit: function () {

    // get the view
    let oView = this.getView();

    // set data model on view
    let oData = {
      recipient: {
        name: 'World'
      }
    };
    let oModel = new JSONModel(oData);
    oView.setModel(oModel);

    // set i18n model on view
    let oMsgModel = new ResourceModel({
      bundleName: 'sap.ui.demo.wt.i18n.message'
    });
    oView.setModel(oMsgModel, 'message');
  },

  onShowHello: function () {

    // get the view
    let oView = this.getView();

    // read msg from i18n model
    let oBundle = oView.getModel('message').getResourceBundle();
    let sRecipient = oView.getModel().getProperty('/recipient/name');
    let sMsg = oBundle.getText('helloMsg', [sRecipient]);

    // show message
    MessageToast.show(sMsg);
  }

}));