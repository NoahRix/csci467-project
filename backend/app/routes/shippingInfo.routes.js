const user_auth = require('../utils/auth');

module.exports = app => {
    const shippingInfo = require("../controllers/shippingInfo.controllers.js");

    app.get("/api/shipping_information/all", shippingInfo.allShippingInfo);
    app.get("/api/shipping_information/by_type", user_auth.middleware, shippingInfo.shippingInfoByType);
    app.patch("/api/shipping_information/update", user_auth.middleware, shippingInfo.updateShippingInfo);
    app.post("/api/shipping_information/add", user_auth.middleware, shippingInfo.addShippingRecord); //-> this should add a record into the table with data that I send in
    app.delete("/api/shipping_information/delete", user_auth.middleware, shippingInfo.deleteShippingRecord); //-> this should delete a record that matches the primary key I send in
}