const customers = require("../models/customers.models.js");

exports.customers = (req, res) => {
    customers.customers(data => {
        res.send(data);
    })
}

exports.ID = (req, res) => {
    customers.ID(req.body.id, (data) => {
        res.send(data);
    })
}

exports.email = (req, res) => {
    customers.email(req.body.email, (data) =>{
        res.send(data);
    })
}

exports.phone = (req, res) => {
    customers.phone(req.body.phone, (data) => {
        res.send(data);
    })
}

exports.name = (req, res) => {
    customers.name(req.body.name, (data) => {
        res.send(data);
    })
}

exports.address = (req, res) => {
    customers.address(req.body.address, (data) => {
        res.send(data);
    })
}

exports.addCustomer = (req, res) => {
    customers.addCustomer(req.body, (data) => {
        res.send(data);
    })
}

exports.updateCustomer = (req, res) => {
    customers.updateCustomer(req.body, (data) => {
        res.send(data);
    })
}

exports.deleteCustomer = (req, res) => {
    customers.deleteCustomer(req.body.id, (data) => {
        res.send(data);
    })
}