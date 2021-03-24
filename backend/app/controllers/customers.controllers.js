const customers = require("../models/customers.models.js");

exports.customers = (req, res) => {
    customers.customers(data => {
        res.send(data);
    })
}

exports.ID = (req, res) => {
    const customerID = req.body.id;
    const query = 'select * from customers where id = ${customerID}';

    customers.ID(data => {
        res.send(data);
    }, query)
}

exports.email = (req, res) => {
    const email = req.body.email;
    const query = 'select * from customers where email = ${email}';

    customers.email(data =>{
        res.send(data);
    }, query)
}

exports.phone = (req, res) => {
    const phone = req.body.phone;
    const query = 'select * from customers where phone = ${phone}';

    customers.phone(data => {
        res.send(data);
    }, query)
}

exports.name = (req, res) => {
    const name = req.body.name;
    const query = 'select * from customers where name = ${name}';

    customers.name(data => {
        res.send(data);
    }, query)
}

exports.address = (req, res) => {
    const address = req.body.address;
    const query = 'select * from customers where address = ${address}';

    customers.address(data => {
        res.send(data);
    }, query)
}
