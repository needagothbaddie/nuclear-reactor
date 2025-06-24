using {ojt as my} from '../db/schema';

service MyService {
    entity Employees   as projection on my.Employees;
    entity Departments as projection on my.Departments;
    entity Roles       as projection on my.Roles;
    action callSalary(id : String) returns Double;
};
