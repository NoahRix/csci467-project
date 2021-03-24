const db_tools = require("../utils/db-tools");
const legacy_db_tools = require("../utils/legacy-db-tools");

exports.all = result => {
    db_tools.execute(`select * from inventory`, result);
}

exports.update = (inventory_row_object, result) => {
    db_tools.execute(`update inventory set quantity = ? where part_id = ?`, result, Object.values(inventory_row_object));
}

exports.new = (inventory_row_object, result) => {
    db_tools.execute(`insert into inventory values(?, ?)`, result, Object.values(inventory_row_object));
}

exports.updateAllRows = (query, result) => {
    db_tools.execute(query, result);
}

exports.deleteRowsByIDs = (query, result) => {
    db_tools.execute(query, result);
}