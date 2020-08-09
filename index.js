const {prompt} = require('inquirer');
const db = require('./db');
const header = require('./utils/Header');
const footer = require('./utils/Footer');
const inquirer = require('inquirer');
const { connection } = require('./db');
require('ascii-art');

init();

// initial function when started

function init() {
    startPrompts();
};

function startPrompts() {
    prompt ([
        {
            // prompt user
            type:'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name:'View All Departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View All Roles',
                    value:'VIEW_ROLES'
                },
                {
                    name: 'View All Employees',
                    value:'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add a Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add a Roles',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Quit!',
                    value: 'QUIT'
                }
            ]
        }
    ])
    .then(res => {
        let choice = res.choice;
        //Call functions based on what user selected
        switch(choice) {
            case 'VIEW_DEPARTMENTS':
                viewAllDepartments();
                break;
            case 'VIEW_ROLES':
                viewAllRoles();
                break;
            case 'VIEW_EMPLOYEES':
                viewAllEmployees();
                break;
            case 'ADD_DEPARTMENT':
                createDepartment();
                break;
            case 'ADD_ROLE':
                createRole();
                break;
            default:
                quit();
        };
    });
};

// view employees
function viewAllEmployees() {
    db.allEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => startPrompts());
};

// View roles
function viewAllRoles() {
    db.allRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log('\n');
            console.table(roles);
        })
        .then(() => startPrompts());
};

// View Departments
function viewAllDepartments() {
    db.allDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log('\n');
            console.table(departments);
        })

        .then(() => startPrompts());
};

// Add roles
function createRole() {
    db.allDepartments()
        .then(([rows]) => {
            let departments = rows;
            const deptChoices = departments.map(({id, name}) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    name: 'title',
                    message: 'What is the title of the new role?'
                },
                {
                    name: 'salary',
                    message: 'What is the salary rate for this position?'
                },
                {
                    type:'list',
                    name:'department_id',
                    message: 'Which department should we place this role under?',
                    choices: deptChoices
                }
            ])
            .then(role => {
                db.addRole(role)
                    .then(() => console.log(`Added ${role.title} to the database successfully!`))
                    .then(() => startPrompts())
            });
        });
};

// Add departments
function createDepartment() {
    prompt ([
        {
            name:'name',
            message: 'What is the name of the new department?'
        }
    ])
    .then(res => {
        let name = res;
        db.addDepartment(name)
            .then(() => console.log(`Added ${name.name} to the database succesfully`))
            .then(() => startPrompts())
    });
};


//Quit

function quit() {
    console.log(footer);
    process.exit();
};