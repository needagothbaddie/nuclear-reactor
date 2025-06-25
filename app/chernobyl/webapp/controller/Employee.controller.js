sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "chernobyl/utils/constants",
        "chernobyl/utils/types/EmailType",
        "chernobul/components/BetterToast",
    ],
    (BaseController, constants, EmailType, BetterToast) => {
        "use strict";
        let router;
        let isAdmin;
        return BaseController.extend("chernobyl.controller.Employee", {
            onInit() {
                isAdmin = true;
                // config routes
                router = this.getOwnerComponent().getRouter();
                // set handler for Detail page
                router
                    .getRoute(constants.EMPLOYEE_INFO)
                    .attachPatternMatched(this._renderDetail, this);
                router.initialize();
            },

            onSubmitForm: function (_) {
                let bValid = true;
                // validate required fields
                this.getView()
                    .byId("FormEmpl")
                    .getControlsByFieldGroupId("isRequired")
                    .forEach(function (oControl) {
                        if (oControl.getRequired && oControl.getRequired()) {
                            var sValue = oControl.getValue
                                ? oControl.getValue()
                                : oControl.getSelectedKey();
                            if (!sValue) {
                                oControl.setValueState("Error");
                                oControl.setValueStateText("Required");
                                bValid = false;
                            } else {
                                oControl.setValueState("None");
                                oControl.setValueStateText("");
                            }
                        }
                    });
                if (!bValid) return;

                // get bound context
                const oContext = this.oAddDialog.getBindingContext();
                const oModel = oContext.getModel();
                // create
                oModel
                    .submitBatch("createGroup")
                    .then()
                    .catch(function (err) {
                        this.oAddDialog.close();
                        BetterToast.error(err.message);
                    });
            },
            _validateInput: function (oInput) {
                var sValueState = "None";
                var bValidationError = false;
                var oBinding = oInput.getBinding("value");
                try {
                    oBinding.getType().validateValue(oInput.getValue());
                } catch (oException) {
                    sValueState = "Error";
                    bValidationError = true;
                }

                oInput.setValueState(sValueState);

                return bValidationError;
            },
            _renderDetail: async function name(e) {
                const id = e.getParameter("arguments").id;
                const form = this.getView().byId("FormEmplDetail");

                form.setEditable(false);
                form.bindElement({
                    path: `/Employees('${id}')`,
                });
            },
            EmailType,
        });
    }
);
