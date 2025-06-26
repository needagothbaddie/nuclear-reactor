sap.ui.define(
    ["sap/ui/core/mvc/Controller", "chernobyl/utils/constants"],
    (BaseController, constants) => {
        "use strict";
        let router;
        return BaseController.extend("chernobyl.controller.DeptList", {
            onInit() {
                router = this.getOwnerComponent().getRouter();
            },
        });
    }
);
