const db_tools = require("../utils/db-tools");

/**
 *  Gets all rows.
 * 
 *  @param result Callback to send back data.
 */
exports.customers = result => {
    db_tools.execute('select * from customers', result);
}

/**
 *  Gets the desired customer by their id.
 * 
 *  @param id The customer id.
 *  @param result Callback to send back data.
 */
exports.ID = (id, result) => {
    db_tools.execute('select * from customers where id = ?', result, [id]);
}

/**
 *  Gets the desired customer by their email.
 * 
 *  @param email The customer email.
 *  @param result Callback to send back data.
 */
exports.email = (email, result) => {
    db_tools.execute('select * from customers where email = ?', result, [email]);
}

/**
 *  Gets the desired customer by their phone.
 * 
 *  @param phone The customer phone.
 *  @param result Callback to send back data.
 */
exports.phone = (phone, result) => {
    db_tools.execute('select * from customers where phone = ?', result, [phone]);
}

/**
 *  Gets the desired customer by their name.
 * 
 *  @param name The customer name.
 *  @param result Callback to send back data.
 */
exports.name = (name, result) => {
    db_tools.execute('select * from customers where name = ?', result, [name]);
}

/**
 *  Gets the desired customer by their address.
 * 
 *  @param address The customer address.
 *  @param result Callback to send back data.
 */
exports.address = (address, result) => {
    db_tools.execute('select * from customers where address = ?', result, [address]);
}

/**
 *  Inserts a new customer.
 * 
 *  @param customer The customer object.
 *  @param result Callback to send back data.
 */
 exports.addCustomer = (customer, result) => {
    db_tools.execute('insert into customers (name, address, email, phone, password, refresh_token) values (?, ?, ?, ?, ?, ?); select last_insert_id() as last_id;', 
        result, 
        [
            customer.name,
            customer.address,
            customer.email,
            customer.phone,
            customer.password,
            customer.refresh_token
        ]
    );
}

/**
 *  Updates a customer row.
 * 
 *  @param customer The customer object.
 *  @param result Callback to send back data.
 */
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

/**
 *  Deletes a new customer.
 * 
 *  @param id The customer id.
 *  @param result Callback to send back data.
 */
 exports.deleteCustomer = (id, result) => {
    db_tools.execute('delete from customers where id = ?', result, [id]);
}
