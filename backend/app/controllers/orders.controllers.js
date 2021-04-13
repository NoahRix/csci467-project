const orders = require("../models/orders.models.js");
const parts = require("../models/parts.models.js");
const customers = require("../models/customers.models.js");

exports.allOrders = (req, res) => {
    orders.allOrders(data => {
        res.send(data);
    })
}

exports.allOrdersWithNames = async (req, res) => {
    let orders_data = []; 

    let get_orders = new Promise(resolve => {
        orders.allOrders(data => {
            orders_data = data;
            resolve();
        });
    });

    await get_orders;

    let customers_data = []; 

    let get_customers = new Promise(resolve => {
        customers.customers(data => {
            customers_data = data;
            resolve();
        });
    });

    await get_customers;

    //console.log("customers_data");
    //console.log(customers_data);

    orders_data = orders_data.map(order => {
        let customer_name = customers_data.find(customer => customer.id === order.customer_id).name;

        if(order.customer_id === 1) 
            customer_name = order.payment_info.replace(/[0-9/]/g, "").trim(); 

        return {...order, customer_name: customer_name}
    });

    console.log(orders_data);

    res.send(orders_data);
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

exports.confirmOrder = (req, res) => {
    orders.confirmOrder(req.body.id, (data) => {
        res.send(data);
    })
}

exports.cancelOrder = (req, res) => {
    orders.cancelOrder(req.body.id, (data) => {
        res.send(data);
    })
}

exports.shipOrder = (req, res) => {
    orders.shipOrder(req.body.id, (data) => {
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

    order_parts = order_parts.map((order_part, index) => {
        return {...order_part, quantity: order_items[index].quantity}
    })

    res.send(order_parts);
}

exports.addOrderItems = (req, res) => {
    orders.addOrderItems(req.body, (data) => {
        res.send(data);
    });
}
