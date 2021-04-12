const orders = require("../models/orders.models.js");
const parts = require("../models/parts.models.js");

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
    console.log(req.body);
    orders.deleteOrder(req.body.id, (data) => {
        res.send(data);
    })
}

exports.cancelOrder = (req, res) => {
    orders.cancelOrder(req.body, (data) => {
        res.send(data);
    })
}

exports.shipOrder = (req, res) => {
    orders.shipOrder(req.body, (data) => {
        res.send(data);
    })
}

exports.orderItems = (req, res) => {
    orders.orderItems(req.body.orderId, (data) => {
        res.send(data);
    })
}

exports.orderItemsJoined = async (req, res) => {
    
    let order_items = [];
    
    let get_order_items = new Promise(resolve => {
        orders.orderItems(req.body.orderId, (data) => {
            order_items = data;
            resolve();
        })
    });

    await get_order_items;
    
    let order_parts = []; 

    let get_parts = new Promise(resolve => {
        parts.byPartNumbers((data) => {
            order_parts = data;
            resolve();
        }, order_items.map(order_item => order_item.part_id));
    });

    await get_parts;

    order_parts.sort((a, b) => a.number < b.number);
    order_items.sort((a, b) => a.part_id < b.part_id);

    console.log(order_parts);
    console.log(order_items);

    order_parts = order_parts.map((order_part, index) => {
        
        return {...order_part, quantity: order_items[index].quantity}
    })

    res.send(order_parts);
}