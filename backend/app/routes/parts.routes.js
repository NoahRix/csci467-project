const user_auth = require('../utils/auth');

module.exports = app => {
    const parts = require("../controllers/parts.controllers.js");

    app.get("/api/parts/all", parts.all);
    app.post("/api/parts/by-part-number", parts.partNum);
    app.post("/api/parts/by-part-numbers", parts.byPartNumbers);
    app.post("/api/parts/by-price-range", user_auth.middleware, parts.priceRange);
    app.post("/api/parts/by-weight-range", user_auth.middleware, parts.weightRange);
    app.get("/api/test/test", user_auth.middleware, parts.test);
}