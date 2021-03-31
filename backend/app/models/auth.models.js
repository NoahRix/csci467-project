const db_tools = require("../utils/db-tools");

/**
 *  Gets the customers password based on the email.
 * 
 *  @param email Customer's email string.
 *  @param result Callback to send back data.
 */
 exports.getCustomerPassword = (email, result) => {
    db_tools.execute('select password from customers where email = ?', result, [email]);
}
