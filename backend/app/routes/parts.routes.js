module.exports = app => {
    const parts = require("../controllers/parts.controllers.js");

    app.get("/api/parts/all", parts.all);
    app.post("/api/parts/by-part-number", parts.partNum);
    app.post("/api/parts/by-part-numbers", parts.byPartNumbers);
    app.post("/api/parts/by-price-range", parts.priceRange);
    app.post("/api/parts/by-weight-range", parts.weightRange);

    app.get("/api/test/test", parts.test);
}