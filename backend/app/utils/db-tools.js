const sql = require("./db.js");

exports.execute = (query, result, params = null) => {
    new Promise((resolve, reject) => {
        sql.query(query, params, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        })
    })
    .then((res) => result(res))
    .catch((err) => result(err));
}