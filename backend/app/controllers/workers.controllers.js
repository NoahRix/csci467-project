const workers = require("../models/workers.models.js");


/**
 *  This gets a single row in the workers table based on their ID.
 *
 *  @param req Request data that holds the workers ID.
 *  @param res Response data that holds a workers row.
 */
exports.ID = (req, res) => {
    workers.ID(req.body.id, (data) => {
        res.send(data);
    })
}

/**
 *  This gets all of the rows in the workers table.
 *
 *  @param req Request data (not used).
 *  @param res Response data that shows all of the workers table.
 */
exports.workers = (req, res) => {
    workers.workers(data => {
        res.send(data);
    })
}

