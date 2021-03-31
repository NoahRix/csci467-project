const db_tools = require("../utils/db-tools");

/**
 *  Gets the customer's password based on the id.
 * 
 *  @param id Customer'sid number.
 *  @param result Callback to send back data.
 */
 exports.getCustomerPassword = (id, result) => {
    db_tools.execute('select password from customers where id = ?', result, [id]);
}

/**
 *  Gets the employee's password based on the id.
 * 
 *  @param id Employee's id number.
 *  @param result Callback to send back data.
 */
 exports.getEmployeePasswordAndRole = (id, result) => {
    db_tools.execute('select password, is_admin from workers where id = ?', result, [id]);
}

/**
 *  Expires the access token of the customer to be logged out.
 *
 *  @param id Customer's id number.
 *  @param result Callback function to send the response data.
 */
 exports.logout = (id, result) => {
    dbt.execute("update customers set refresh_token = NULL where id = ?", result, [id]);
}

/**
 *  Expires the access token of the employee to be logged out.
 *
 *  @param id Employee's id number.
 *  @param result Callback function to send the response data.
 */
 exports.logout = (id, result) => {
    dbt.execute("update workers set refresh_token = NULL where id = ?", result, [id]);
}
