const orders = require("../models/orders.models.js");
const parts = require("../models/parts.models.js");
const customers = require("../models/customers.models.js");
const inventory = require("../models/inventory.models.js");
const nodemailer = require('nodemailer');
const { networkInterfaces } = require("os");

exports.allOrders = (req, res) => {
    orders.allOrders(data => {
        res.send(data);
    })
}

exports.allOrdersWithNames = async (req, res) => {
    
    let orders_data = []; 

    // get all orders.
    let get_orders = new Promise(resolve => {
        orders.allOrders(data => {
            orders_data = data;
            resolve();
        });
    });

    await get_orders;

    let customers_data = []; 
    
    // Get all of the customers.
    let get_customers = new Promise(resolve => {
        customers.customers(data => {
            customers_data = data;
            resolve();
        });
    });

    await get_customers;

    // Merge the customer names to there respective orders.
    orders_data = orders_data.map(order => {
        let customer_name = customers_data.find(customer => customer.id === order.customer_id).name;

        // If the customer is not logged in, user the shipping_name field.
        if(order.customer_id === 1) 
            customer_name = order.shipping_name; 

        return {...order, customer_name: customer_name}
    });

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

exports.shipOrder = async (req, res) => {
    
    // Set the shipping flag of the order.
    orders.shipOrder(req.body.id, (data) => {
        res.send(data);
    })

    let order = null;

    // Get the order based on the given order id.
    let get_order_info = new Promise(resolve => {
        orders.byID(req.body.id, (data) => {
            order = data;
            resolve();
        });
    });

    await get_order_info;

    let order_items = null;

    // Get the items of that order.
    let get_order_items = new Promise(resolve => {
        orders.orderItems(req.body.id, (data) => {
            order_items = data;
            resolve();
        });
    });

    await get_order_items;

    let parts_info = null;
    
    // Get the parts info of those items.
    let get_parts_info = new Promise(resolve => {
        parts.byPartNumbers((data) => {
            parts_info = data;
            resolve();
        }, order_items.map(item => item.part_id));
    });
    
    await get_parts_info;

    let customer_name = "";
    let customer_email = "";

    // Get the customers name
    let get_customer_name_and_email = new Promise(resolve => {
        customers.ID(order[0].customer_id, (data) => {
            customer_name = data[0].name;
            customer_email = order[0].customer_id === 1 ? order[0].shipping_email : data[0].email; 
            resolve();
        });
    });
    
    await get_customer_name_and_email;
    
    // Get the name of the customers who are not logged in.
    if(customer_name = "anonymous")
        customer_name = order[0].shipping_name;

    // This holds the complete row information of all the part per order for the email data.
    let order_info = parts_info.map((part, index) => {return {...part, quantity: order_items[index].quantity}})

    // CA$H MONEY DOLLAS
    const formatUSD = (amount) => {
        return `$${Number(amount).toFixed(2).toLocaleString()}`
    }

    let html = `
    <body>
    <style>
        table, td, tr {
            border: 1px solid black;
            text-align: center;
        }
    </style>
    <div>
        <h4>Your order has been shipped! <br/> Here is a review of your order:</h4>
        <ul>
            <li><b>Name: </b>${customer_name}</li>
            <li><b>Order ID: </b>${order[0].id}</li>
            <li><b>Date & Time Ordered: </b>${order[0].timestamp}</li>
            <li><b>Payment Information: </b>${order[0].payment_info}</li>
            <li><b>Tax Amount: </b>${formatUSD(order[0].tax_amount)}</li>
            <li><b>Shipping Price: </b>${formatUSD(order[0].shipping_handling_price)}</li>
            <li><b>Total Price: </b>${formatUSD(order[0].total_price)}</li>
            <li><b>Total # of Items: </b>${order[0].total_items}</li>
            <li><b>Billing Address: </b>${order[0].billing_address}</li>
            <li><b>Shipping Address: </b>${order[0].shipping_address}</li>
        </ul>
    </div><br/>
    <div>
        <table>
            <tr>
                <td>Part Image</td> 
                <td>Part Number</td> 
                <td>Part Decsription</td> 
                <td>Part Price (USD)</td> 
                <td>Quantity</td> 
            </tr>
        ${order_info.map(row => `  
            <tr>
                <td><img src="${row.pictureURL}"/></td> 
                <td>${row.number}</td> 
                <td>${row.description}</td> 
                <td>${row.price}</td> 
                <td>${row.quantity}</td> 
            </tr>
        `
        ).join("")}
        </table>
    </div>
    </body>
    `;

    const fs = require('fs');

    fs.writeFile('./emailtest.html', html, err => {if(err) console.log(err); return;});
    
    if(true) {
        // Set up the mailer service.
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'group1yeet@gmail.com',
                pass: 'BigYeet!'
            }
        });

        let mailOptions = {
            from: 'group1yeet@gmail.com',
            to: customer_email,
            subject: '1A Market Shipping Notice',
            html
        };
        
        transporter.sendMail(mailOptions, (err, info) => {
            if(err)
            console.log(err);
            else 
            console.log('Email sent: ' + info.response);
        });   
    }

    // Prepare to deduct from the inventory table.
    // Get the part id/numbers and quantities.

    let part_quantities = order_info.map(row => {return {part_id: row.number, quantity: row.quantity}}); 

    let current_quantities = [];

    let get_current_quantities = new Promise(resolve => {
        inventory.getRowsByIDs(part_quantities.map(row => row.part_id), (data) => {
            current_quantities = data;
            resolve();
        });
    });

    await get_current_quantities;
    
    // Get the cuurent inventory rows with subtraction.
    let new_quantities = current_quantities.map((current, index) => {
        return {
            part_id: current.part_id, 
            quantity: current.quantity - part_quantities[index].quantity
        }
    });

    // Update the rows
    let update_inventory_rows = new Promise(resolve => {
        inventory.updateRows(new_quantities, (data) => {
            console.log(data);
            resolve();
        });
    });

    await update_inventory_rows;
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
