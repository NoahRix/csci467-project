const customers = require("../models/customers.models.js");

/**
 *  This gets all of the rows in the customers table.
 *
 *  @param req Request data (not used).
 *  @param res Response data that shows all of the customers table.
 */
exports.customers = (req, res) => {
    customers.customers(data => {
        res.send(data);
    })
}

/**
 *  This gets a single row in the customers table based on their ID.
 *
 *  @param req Request data that holds the customer ID.
 *  @param res Response data that holds a customer row.
 */
exports.ID = (req, res) => {
    customers.ID(req.body.id, (data) => {
        res.send(data);
    })
}

/**
 *  This gets a single row in the customers table based on their email.
 *
 *  @param req Request data that holds the customer email.
 *  @param res Response data that holds a customer row.
 */
exports.email = (req, res) => {
    customers.email(req.body.email, (data) =>{
        res.send(data);
    })
}

/**
 *  This gets a single row in the customers table based on their phone.
 *
 *  @param req Request data that holds the customer phone.
 *  @param res Response data that holds a customer row.
 */
exports.phone = (req, res) => {
    customers.phone(req.body.phone, (data) => {
        res.send(data);
    })
}

/**
 *  This gets a single row in the customers table based on their name.
 *
 *  @param req Request data that holds the customer name.
 *  @param res Response data that holds a customer row.
 */
exports.name = (req, res) => {
    customers.name(req.body.name, (data) => {
        res.send(data);
    })
}

/**
 *  This gets a single row in the customers table based on their address.
 *
 *  @param req Request data that holds the customer address.
 *  @param res Response data that holds a customer row.
 */
exports.address = (req, res) => {
    customers.address(req.body.address, (data) => {
        res.send(data);
    })
}

/**
 *  This controls inserting a new customer.
 *
 *  @param req Request data that holds the customer object.
 *  @param res Response data.
 */
 exports.addCustomer = (req, res) => {
    customers.addCustomer(req.body, (data) => {
        res.send(data);
    })
}

/**
 *  This controls updating an existing customer.
 *
 *  @param req Request data that holds the customer object.
 *  @param res Response data.
 */
 exports.updateCustomer = (req, res) => {
    customers.updateCustomer(req.body, (data) => {
        res.send(data);
    })
}

/**
 *  This controls deleting an existing customer.
 *
 *  @param req Request data that holds the customer id.
 *  @param res Response data.
 */
 exports.deleteCustomer = (req, res) => {
    customers.deleteCustomer(req.body.id, (data) => {
        res.send(data);
    })
}