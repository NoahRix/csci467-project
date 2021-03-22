const db_tools = require("../utils/db-tools");
const legacy_db_tools = require("../utils/legacy-db-tools");

exports.parts = result => {
    legacy_db_tools.execute(`select * from parts`, result);
}

exports.partNum = (result, query) => {
    legacy_db_tools.execute(query, result);
}

exports.priceRange = (result, query) => {
    legacy_db_tools.execute(query, result);
}

exports.weightRange = (result, query) => {
    legacy_db_tools.execute(query, result);
}

exports.test = result => {
    db_tools.execute(`select * from bugs`, result);
}