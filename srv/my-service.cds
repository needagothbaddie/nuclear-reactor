using {ojt as my} from '../db/schema';

service MyService {
    entity Employees   as projection on my.Employees;
    entity Departments as projection on my.Departments;
    entity Roles       as projection on my.Roles;
    // get role + token
    function whoami()               returns MySelf;

    @(required: 'Admin')
    action   calSalary(id : String) returns Double;
};

annotate MyService with @(restrict: [
    {
        grant: 'READ',
        to   : 'ViewerOJT'
    },
    {
        grant: '*',
        to   : 'AdminOJT'
    },
]);

type MySelf : {
    username : String;
    jwt      : String;
    Role     : array of String;
};
