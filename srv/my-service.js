import cds from "@sap/cds";
import moment from "moment";

class MyService extends cds.ApplicationService {
    init() {
        // cal salary action
        this.on("calSalary", this.calculateSalary);
        // set base salary
        this.before("CREATE", async (req) => {
            const baseSalary = await SELECT.one
                .from("Roles")
                .where({ ID: id })
                .columns((r) => {
                    r.baseSalary;
                });

            req.data.baseSalary = baseSalary;
        });

        return super.init();
    }
    async calculateSalary(id) {
        const baseSal = await SELECT.one
            .from("Roles")
            .where({ ID: id })
            .columns((r) => {
                r.baseSalary;
            });
        const empl = await SELECT.one
            .from("Employees")
            .where({ ID: id })
            .columns((e) => {
                e.hireDate, e.salary, e.role;
            });

        const now = moment();
        const hireDate = moment(empl.hireDate);
        const years = now.subtract(hireDate, "years");

        const salary = baseSal + 1000 * years;
        await UPDATE("Employees").where({ ID: id }).with({ salary });
        return salary;
    }
}

export { MyService };
