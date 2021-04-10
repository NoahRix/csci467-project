const db_tools = require("../utils/db-tools");

exports.allOrders = result => {
    db_tools.execute('select * from orders', result);
}

exports.ordersOfCustomer = (customerId, result) => {
    db_tools.execute('select * from orders where customer_id = ?', result, [customerId]);
}

exports.addOrder = (order, result) => {
    db_tools.execute(`insert into orders (
                        order_shipped, 
                        order_confirmed, 
                        payment_info, 
                        tax_rate, 
                        shipping_handling_price, 
                        billing_address, 
                        shipping_address, 
                        timestamp, 
                        customer_id, 
                        worker_id
                    ) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                    select last_insert_id();`, 
        result, 
        [
            order.timestamp,
            order.order_shipped,
            order.order_confirmed,
            order.payment_info,
            order.tax_amount,
            order.shipping_handling_price,
            order.total_price,
            order.total_items,
            order.billing_address,
            order.shipping_address,
            order.customer_id,
            order.worker_id,
        ]
    );
}

exports.updateOrder = (order, result) => {
    db_tools.execute('UPDATE orders SET timestamp = ?, order_shipped = ?, order_confirmed = ?, payment_info = ?, tax_amount = ?, shipping_handling_price = ?, total_price = ?, total_items = ?, billing_address = ?, shipping_address = ?, customer_id = ?, worker_id = ? where id = ?', 
        result, 
        [
            order.timestamp,
            order.order_shipped,
            order.order_confirmed,
            order.payment_info,
            order.tax_amount,
            order.shipping_handling_price,
            order.total_price,
            order.total_items,
            order.billing_address,
            order.shipping_address,
            order.customer_id,
            order.worker_id,
            order.order_id,
        ]
    );
}

exports.deleteOrder = (id, result) => {
    db_tools.execute('delete from orders where id = ?', result, [id]);
}

exports.orderItems = (orderId, result) => {
    db_tools.execute('select * from order_items where order_id = ?', result, [orderId]);
}