var mysql = require('mysql');
var dbconfig = require('./database');

var connection = mysql.createConnection(dbconfig.connection);

// var connection_local = mysql.createConnection(dbconfig.connection_local);

// console.log(connection_local)
// connection.query('CREATE DATABASE ' + dbconfig.database);
connection.query('use ' + dbconfig.database);
// connection_local.query('use ' + dbconfig.database_local);

// connection.query('\
// CREATE TABLE `' + dbconfig.tables.users_table + '` ( \
//     `UserID` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
//     `email` VARCHAR(225) NOT NULL, \
//     `password` VARCHAR(60) NOT NULL, \
//     `proj` VARCHAR(225), \
//     `contact` VARCHAR(225), \
//     `comment` VARCHAR(225), \
//         PRIMARY KEY (`UserID`) \
// )');

// console.log('Success: login Created!');

connection.query('CREATE TABLE proptrading_subscription_list ( id INT NOT NULL AUTO_INCREMENT, contact_number VARCHAR(225), PRIMARY KEY (id) )');

connection.on('error', function(err) {
    console.log("[mysql error]",err);
  });

console.log('Success: table Created!');

connection.end();
