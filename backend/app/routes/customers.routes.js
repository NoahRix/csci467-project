const user_auth = require('../utils/auth');

module.exports = app => {
    const customers = require("../controllers/customers.controllers.js");

    app.get("/api/customers/all", user_auth.middleware, customers.customers);
    app.post("/api/customers/by-id", customers.ID);
    app.post("/api/customers/by-email", user_auth.middleware, customers.email);
    app.post("/api/customers/by-phone", user_auth.middleware, customers.phone);
    app.post("/api/customers/by-name", user_auth.middleware, customers.name);
    app.post("/api/customers/by-address", user_auth.middleware, customers.address);
    app.post("/api/customers/add", user_auth.middleware, customers.addCustomer);
    app.patch("/api/customers/update", user_auth.middleware, customers.updateCustomer);
    app.delete("/api/customers/delete", user_auth.middleware, customers.deleteCustomer);
}