const db_tools = require("../utils/db-tools");

exports.customers = result => {
    db_tools.execute('select * from customers');
}

exports.ID = (result, query) => {
    db_tools.execute(query, result);
}

exports.email = (result, query) => {
    db_tools.execute(query, result);
}

exports.phone = (result, query) => {
    db_tools.execute(query, result);
}

exports.name = (result, query) => {
    db_tools.execute(query, result);
}

exports.address = (result, query) => {
    db_tools.execute(query, result);
}