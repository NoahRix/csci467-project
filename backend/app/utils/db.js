let aws = false;

//Database configuration.
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: aws ? 'pxukqohrckdfo4ty.cbetxkdyhwsb.us-east-1.rds.amazonaws.com' : 'localhost',
    user: aws ? 'lk29l9vskr8x2w7e' : 'root',
    password: aws ? 'kbi6sgrvps0wiorm' : 'password',
    database: 'h1gtfw3uuuyktywj',
    port: 3306,
    multipleStatements: true
})

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;