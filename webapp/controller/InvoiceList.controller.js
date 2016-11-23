"use strict";

sap.ui.define([

    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/demo/wt/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], (Controller, JSONModel, formatter, Filter, FilterOperator) => Controller.extend("sap.ui.demo.wt.controller.InvoiceList", {

    formatter: formatter,

    onInit: function () {

        let oViewModel = new JSONModel({
            currency: "EUR"
        });
        this.getView().setModel(oViewModel, "view");
    },

    onFilterInvoices: function (oEvent) {

        // build filter array
        let aFilter = [];
        let sQuery = oEvent.getParameter("query");
        if (sQuery) {
            aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
        }

        // filter binding
        let oList = this.getView().byId("invoiceList");
        let oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
    },

    groupHeaderFactory: function() {

        alert('foooo');        

    }

}));