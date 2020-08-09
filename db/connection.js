const mysql = require('mysql2');
const header = require('../utils/Header');
const connection = mysql.createConnection({
    host: 'localhost',
    //MySQL Username
    user:'root',
    //MySQL password
    password: 'July201992$',
    database: 'employees'
});

console.log(header);
console.log('\n');
connection.connect(function (err) {
    
    if(err) throw err;
    
}) ;



module.exports = connection;