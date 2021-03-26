module.exports = app => {
    const test = require("../controllers/test.controllers.js");

    app.get("/api/parts/all", test.parts);
    app.post("/api/parts/by-part-number", test.partNum);
    app.post("/api/parts/by-price-range", test.priceRange);
    app.post("/api/parts/by-weight-range", test.weightRange);

    app.get("/api/test/test", test.test);
}