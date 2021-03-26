const db_tools = require("../utils/db-tools");

exports.customers = result => {
    db_tools.execute('select * from customers', result);
}

exports.ID = (id, result) => {
    db_tools.execute('select * from customers where id = ?', result, [id]);
}

exports.email = (email, result) => {
    db_tools.execute('select * from customers where email = ?', result, [email]);
}

exports.phone = (phone, result) => {
    db_tools.execute('select * from customers where phone = ?', result, [phone]);
}

exports.name = (name, result) => {
    db_tools.execute('select * from customers where name = ?', result, [name]);
}

exports.address = (address, result) => {
    db_tools.execute('sellect * from customers where address = ?', result, [address]);
}