const db_tools = require("../utils/db-tools");

/**
 *  Gets the desired worker by their id.
 * 
 *  @param id The worker id.
 *  @param result Callback to send back data.
 */
exports.ID = (id, result) => {
    db_tools.execute('select * from workers where id = ?', result, [id]);
}

/**
 *  Gets all rows.
 * 
 *  @param result Callback to send back data.
 */
 exports.workers = result => {
    db_tools.execute('select * from workers', result);
}