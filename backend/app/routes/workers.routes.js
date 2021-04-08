module.exports = app => {
    const workers = require("../controllers/workers.controllers.js");

    app.post("/api/workers/by-id", workers.ID);
    app.get("/api/workers/all", workers.workers);
}