sap.ui.define(
    ["sap/ui/core/UIComponent", "chernobyl/model/models"],
    (UIComponent, models) => {
        "use strict";

        return UIComponent.extend("chernobyl.Component", {
            metadata: {
                manifest: "json",
                interfaces: ["sap.ui.core.IAsyncContentCreation"],
            },

            init() {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // enable routing
                this.getRouter().initialize();

                // try {
                //     jQuery.sap.require(
                //         "sap.ushell.cpv2.services.cloudServices.SiteService"
                //     );
                // } catch (oException) {}
            },
        });
    }
);
