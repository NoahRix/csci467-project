module.exports = app => {
    const inventory = require("../controllers/inventory.controllers.js");

    app.get("/api/inventory/all", inventory.all);
    app.get("/api/inventory/by-part-id", inventory.byPartID);
    app.post("/api/inventory/update", inventory.update);
    app.post("/api/inventory/update-rows", inventory.updateRows);
    app.post("/api/inventory/by-part-ids", inventory.getRowsByIDs);
    app.post("/api/inventory/new", inventory.new);
    app.get("/api/inventory/total-floor-price", inventory.totalFloorPrice);
    app.get("/api/inventory/update-all-rows", inventory.updateAllRows);
    app.post("/api/inventory/delete-rows-by-ids", inventory.deleteRowsByIDs);
}