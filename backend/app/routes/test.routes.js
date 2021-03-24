module.exports = app => {
    const test = require("../controllers/test.controllers.js");

    app.get("/api/test/parts", test.parts);
    app.get("/api/test/test", test.test);
    app.get("/api/test/part-by-number", test.partByNumber);
}