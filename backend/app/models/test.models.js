const db_tools = require("../utils/db-tools");
const legacy_db_tools = require("../utils/legacy-db-tools");

exports.parts = result => {
    legacy_db_tools.execute(`select * from parts`, result);
}

exports.partNum = (result, partNumber) => {
    const query = `select * from parts where number = ?`;
    legacy_db_tools.execute(query, result, [partNumber]);
}

exports.priceRange = (result, body) => {
    
    const query = `select * from parts where price between ? and ?`;
    legacy_db_tools.execute(query, result, Object.values(body)); // gives the values of the object
}

exports.weightRange = (result, body) => {

    const query = `select * from parts where weight between ? and ?`;
    legacy_db_tools.execute(query, result, Object.values(body));
}

exports.test = result => {
    db_tools.execute(`select * from bugs`, result);
}

exports.partByNumber = (number, result) => {
    legacy_db_tools.execute(`select * from parts where number = ?`, result, [number]);
}