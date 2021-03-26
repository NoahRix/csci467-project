const db_tools = require("../utils/db-tools");

/**
 *  Gets all rows.
 * 
 *  @param result Callback to send back data.
 */
exports.all = result => {
    db_tools.execute(`select * from inventory`, result);
}

/**
 *  Gets one row by a part id. 
 * 
 *  @param part_id part_id of a row. (Number)
 *  @param result Callback to send back data.
 */
exports.byPartID = (part_id, result) => {
    db_tools.execute(`select * from inventory where part_id = ?`, result, [part_id]);
}

/**
 *  Updates an existing row.
 * 
 *  @param result Callback to send back data.
 *  @param inventory_row_object {quantity: (Number), part_id, (Number)}
 */
exports.update = (inventory_row_object, result) => {
    db_tools.execute(`update inventory set quantity = ? where part_id = ?`, result, Object.values(inventory_row_object));
}

/**
 *  Inserts a new row.
 * 
 *  @param result Callback to send back data.
 *  @param inventory_row_object {quantity: (Number), part_id, (Number)}
 */
exports.new = (inventory_row_object, result) => {
    db_tools.execute(`insert into inventory values(?, ?)`, result, Object.values(inventory_row_object));
}

/**
 *  This handles the built query from the controller 
 *  to fix missing or excess rows that constrained to
 *  the parts table.
 * 
 *  @param query Built sql statement.
 *  @param result Callback to send back data.
 */
exports.updateAllRows = (query, result) => {
    db_tools.execute(query, result);
}

/**
 *  This deletes rows based on a list of part ids.
 * 
 *  @param part_ids Array of part ids for where-in clause.
 *  @param result Callback to send back data.
 */
exports.deleteRowsByIDs = (part_ids, result) => {
    console.log("part_ids: " + part_ids)
    let placholders = '';

    part_ids.forEach(() => {
        placholders += '?, ';
    });

    db_tools.execute(`delete from inventory where part_id in (` + placholders.replace(/, $/, " ") + `)`, result, part_ids);
}