const db_tools = require("../utils/db-tools");
const legacy_db_tools = require("../utils/legacy-db-tools");

/**
 *  Gets all rows of parts.
 * 
 *  @param result Callback to send back data.
 */
exports.allParts = result => {
    legacy_db_tools.execute(`select * from parts`, result);
}

/**
 *  Gets row with a specific part number.
 * 
 *  @param result Callback to send back data.
 *  @param partNumber The part number to add into the query.
 */
exports.partNum = (result, partNumber) => {
    const query = `select * from parts where number = ?`;
    legacy_db_tools.execute(query, result, [partNumber]);
}

/**
 *  Gets parts in a specific price range.
 * 
 *  @param result Callback to send back data.
 *  @param body The body of a request object. Contains lower and upper price range.
 * 
 */
exports.priceRange = (result, body) => {
    
    const query = `select * from parts where price between ? and ?`;
    legacy_db_tools.execute(query, result, Object.values(body)); // gives the values of the object
}

/**
 *  Gets parts in a specific weight range.
 * 
 *  @param result Callback to send back data.
 *  @param body The body of a request object. Contains lower and uppper weight range.
 */
exports.weightRange = (result, body) => {

    const query = `select * from parts where weight between ? and ?`;
    legacy_db_tools.execute(query, result, Object.values(body));
}

exports.test = result => {
    db_tools.execute(`select * from bugs`, result);
}

/**
 *  Gets row with a specific part number.
 * 
 *  @param result Callback to send back data.
 *  @param partNumber The part number to add into the query.
 */
exports.partByNumber = (number, result) => {
    legacy_db_tools.execute(`select * from parts where number = ?`, result, [number]);
}