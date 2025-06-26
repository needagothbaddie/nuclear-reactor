import cds from "@sap/cds";
import moment from "moment";

class MyService extends cds.ApplicationService {
    init() {
        // cal salary action
        this.on("calSalary", this.calculateSalary);
        // set base salary
        this.before("CREATE", "Employees", this.setBaseSalary);
        // get current user
        this.on("whoami", this.whoami);
        // overwrite delete
        // this.on("DELETE", "Employees", this.deleteEmpl);

        return super.init();
    }
    whoami(req) {
        return {
            username: req.user.username,
            token: req.user?.tokenInfo?.jwt,
            roles: req.user.roles,
        };
    }
    async setBaseSalary(req) {
        const baseSalary = await SELECT.one
            .from("Roles")
            .where({ ID: req.data.role_ID })
            .columns((r) => {
                r.baseSalary;
            });
        req.data.baseSalary = baseSalary;
    }
    async calculateSalary(req) {
        const empl = await SELECT.one
            .from("Employees")
            .where({ ID: req.data.id })
            .columns((e) => {
                e.hireDate, e.salary, e.role_ID;
            });
        const role = await SELECT.one
            .from("Roles")
            .where({ ID: empl.role_ID })
            .columns((r) => {
                r.baseSalary;
            });
        // calculate working years
        const now = moment();
        const hireDate = moment(empl.hireDate);
        const years = now.diff(hireDate, "years");

        const salary = role.baseSalary + 1000 * years;

        await UPDATE("Employees").where({ ID: req.data.id }).set({ salary });
        return salary;
    }
    async deleteEmpl(req) {
        // await UPDATE("Employees")
        //     .where({ ID: req.data.id })
        //     .set({ isDelete: true });
    }
}

export { MyService };
