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

exports.addCustomer = (customer, result) => {
    db_tools.execute('insert into customers (name, address, email, phone) values (?, ?, ?, ?)', 
        result, 
        [
            customer.name,
            customer.address,
            customer.email,
            customer.phone
        ]
    );
}

exports.updateCustomer = (customer, result) => {
    db_tools.execute('update customers set name = ?, address = ?, email = ?, phone = ? where id = ?', 
        result, 
        [
            customer.name,
            customer.address,
            customer.email,
            customer.phone,
            customer.id
        ]
    );
}

exports.deleteCustomer = (id, result) => {
    db_tools.execute('delete from customers where id = ?', result, [id]);
}
