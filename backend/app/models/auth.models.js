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
    db_tools.execute("update customers set refresh_token = NULL where id = ?", result, [id]);
}

/**
 *  Expires the refresh token of the customer to be logged out.
 *
 *  @param id Customer's id number.
 *  @param result Callback function to send the response data.
 */
 exports.customerLogout = (id, result) => {
    db_tools.execute("update customers set refresh_token = NULL where id = ?", result, [id]);
}

/**
 *  Expires the refresh token of the employee to be logged out.
 *
 *  @param id Employee's id number.
 *  @param result Callback function to send the response data.
 */
 exports.employeeLogout = (id, result) => {
    db_tools.execute("update workers set refresh_token = NULL where id = ?", result, [id]);
}

/**
 *  Sets the customer's refresh token.
 *
 *  @param customer_info Customer's new refresh token to set and id.
 *  @param result Callback function to send the response data.
 */
 exports.setCustomerRefreshToken = (customer_info, result) => {
    db_tools.execute("update customers set refresh_token = ? where id = ?", result, Object.values(customer_info));
}

/**
 *  Sets the employee's refresh token.
 *
 *  @param employee_info Employee's new refresh token to set and id.
 *  @param result Callback function to send the response data.
 */
 exports.setEmployeeRefreshToken = (employee_info, result) => {
    db_tools.execute("update workers set refresh_token = ? where id = ?", result, Object.values(employee_info));
}

/**
 *  Gets the customer's refresh token from the database.
 *
 *  @param id Customer's id.
 *  @param result Callback function to send the response data.
 */
 exports.getCustomerRefreshToken = (id, result) => {
    db_tools.execute("select refresh_token from customers where id = ?", result, [id])
}

/**
 *  Gets the employee's refresh token from the database.
 *
 *  @param id Employees's id.
 *  @param result Callback function to send the response data.
 */
 exports.getEmployeeRefreshToken = (id, result) => {
    db_tools.execute("select refresh_token from workers where id = ?", result, [id])
}
