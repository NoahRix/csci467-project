module.exports = app => {
    const customers = require("../controllers/customers.controllers.js");

    app.get("/api/customers/all", customers.customers);
    app.post("/api/customers/by-id", customers.ID);
    app.post("/api/customers/by-email", customers.email);
    app.post("/api/customers/by-phone", customers.phone);
    app.post("/api/customers/by-name", customers.name);
    app.post("/api/customers/by-address", customers.address);

    app.post("/api/customers/add", customers.addCustomer);
    app.patch("/api/customers/update", customers.updateCustomer);
    app.delete("/api/customers/delete", customers.deleteCustomer);
}