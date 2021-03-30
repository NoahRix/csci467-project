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
    db_tools.execute('sellect * from customers where address = ?', result, [address]);
}