const db_tools = require("../utils/db-tools");
const legacy_db_tools = require("../utils/legacy-db-tools");

exports.parts = result => {
    legacy_db_tools.execute(`select * from parts`, result);
}

exports.test = result => {
    db_tools.execute(`select * from bugs`, result);
}

exports.partByNumber = (number, result) => {
    legacy_db_tools.execute(`select * from parts where number = ?`, result, [number]);
}