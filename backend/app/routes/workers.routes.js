const user_auth = require('../utils/auth');

module.exports = app => {
    const workers = require("../controllers/workers.controllers.js");

    app.post("/api/workers/by-id", workers.ID);
    app.get("/api/workers/all", user_auth.middleware, workers.workers);
}