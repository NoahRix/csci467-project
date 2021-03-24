module.exports = app => {
    const inventory = require("../controllers/inventory.controllers.js");

    app.get("/api/inventory/all", inventory.all);
    app.post("/api/inventory/update", inventory.update);
    app.post("/api/inventory/new", inventory.new);
    app.post("/api/inventory/update-all-rows", inventory.updateAllRows);
    app.post("/api/inventory/delete-rows-by-ids", inventory.deleteRowsByIDs);
}