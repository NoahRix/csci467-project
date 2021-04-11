const orders = require("../models/orders.models.js");

exports.allOrders = (req, res) => {
    orders.allOrders(data => {
        res.send(data);
    })
}

exports.ordersOfCustomer = (req, res) => {
    orders.ordersOfCustomer(req.body.customerId, data => {
        res.send(data);
    })
}

exports.addOrder = (req, res) => {
    orders.addOrder(req.body, (data) => {
        res.send(data);
    })
}

exports.updateOrder = (req, res) => {
    orders.updateOrder(req.body, (data) => {
        res.send(data);
    })
}

exports.deleteOrder = (req, res) => {
    orders.deleteOrder(req.body.id, (data) => {
        res.send(data);
    })
}

exports.orderItems = (req, res) => {
    orders.orderItems(req.body.orderId, (data) => {
        res.send(data);
    })
}

exports.addOrderItems = (req, res) => {
    orders.addOrderItems(req.body, (data) => {
        res.send(data);
    })
}