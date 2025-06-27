sap.ui.define(["sap/ui/core/mvc/Controller"], (BaseController) => {
    "use strict";
    let router;
    return BaseController.extend("chernobyl.controller.DeptList", {
        onInit() {
            router = this.getOwnerComponent().getRouter();
        },
    });
});
