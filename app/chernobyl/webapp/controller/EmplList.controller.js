sap.ui.define(
    ["sap/ui/core/mvc/Controller", "chernobyl/utils/constants"],
    (Controller, constants) => {
        "use strict";
        let router;
        return Controller.extend("chernobyl.controller.EmplList", {
            onInit() {
                router = this.getOwnerComponent().getRouter();
            },
            onNavDetail(e) {
                const rowData = e
                    .getParameter("row")
                    .getBindingContext()
                    .getObject();
                router.navTo(constants.EMPLOYEE_INFO, { id: rowData.ID });
            },
        });
    }
);
