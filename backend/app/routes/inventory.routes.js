const user_auth = require('../utils/auth');

module.exports = app => {
    const inventory = require("../controllers/inventory.controllers.js");

    app.get("/api/inventory/all", user_auth.middleware, inventory.all);
    app.get("/api/inventory/all-with-parts", user_auth.middleware, inventory.allWithParts);
    app.get("/api/inventory/by-part-id", user_auth.middleware, inventory.byPartID);
    app.post("/api/inventory/update", user_auth.middleware, inventory.update);
    app.post("/api/inventory/update-rows", user_auth.middleware, inventory.updateRows);
    app.post("/api/inventory/by-part-ids", inventory.getRowsByIDs);
    app.post("/api/inventory/new", user_auth.middleware, inventory.new);
    app.get("/api/inventory/total-floor-price", user_auth.middleware, inventory.totalFloorPrice);
    app.get("/api/inventory/update-all-rows", user_auth.middleware, inventory.updateAllRows);
    app.post("/api/inventory/delete-rows-by-ids", user_auth.middleware, inventory.deleteRowsByIDs);
}