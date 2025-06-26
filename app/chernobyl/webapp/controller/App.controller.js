sap.ui.define(
    ["sap/ui/core/mvc/Controller", "chernobyl/utils/constants"],
    (BaseController, constants) => {
        "use strict";
        let router;
        return BaseController.extend("chernobyl.controller.App", {
            onInit() {
                router = this.getOwnerComponent().getRouter();
            },
            onNavHome(_) {
                router.navTo(constants.EMPLOYEE_LIST);
            },
            onNavRole(_) {
                router.navTo(constants.ROLE_LIST);
            },
            onNavDept() {
                router.navTo(constants.DEPT_LIST);
            },
        });
    }
);
