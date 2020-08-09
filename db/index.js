const connection = require('./connection');

class employeeData {
    constructor(connection) {
        this.connection = connection;
    }

    // show employees
    allEmployees() {
        return this.connection.promise().query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;'
            );
        }
    
    // Add employee
    addEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }


    // Show managers
    allManagers(employeeId) {
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }


    // Show roles
    allRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    // Create new role
    addRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    }


    // Show departments
    allDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }

    // Add department
    addDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    }
}


module.exports = new employeeData(connection);