const db_tools = require("../utils/db-tools");

exports.allOrders = result => {
    db_tools.execute('select * from orders', result);
}

exports.addOrder = (order, result) => {
    db_tools.execute('insert into orders (order_shipped, order_confirmed, order_recieved, payment_info, tax_rate, shipping_handling_price, billing_address, shipping_address, timestamp, customer_id, worker_id) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        result, 
        [
            order.order_shipped,
            order.order_confirmed,
            order.order_recieved,
            order.payment_info,
            order.tax_rate,
            order.shipping_handling_price,
            order.billing_address,
            order.shipping_address,
            order.timestamp,
            order.customer_id,
            order.worker_id
        ]
    );
}

exports.updateOrder = (order, result) => {
    db_tools.execute('UPDATE orders SET order_shipped = ?, order_confirmed = ?, order_recieved = ?, payment_info = ?, tax_rate = ?, shipping_handling_price = ?, billing_address = ?, shipping_address = ?, timestamp = ?, customer_id = ?, worker_id = ? where id = ?', 
        result, 
        [
            order.order_shipped,
            order.order_confirmed,
            order.order_recieved,
            order.payment_info,
            order.tax_rate,
            order.shipping_handling_price,
            order.billing_address,
            order.shipping_address,
            order.timestamp,
            order.customer_id,
            order.worker_id,
            order.order_id
        ]
    );
}

exports.deleteOrder = (id, result) => {
    db_tools.execute('delete from orders where id = ?', result, [id]);
}