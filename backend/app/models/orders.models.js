const db_tools = require("../utils/db-tools");

/**
 *  Gets all order rows. 
 * 
 *  @param result Result set data.
 */
 exports.allOrders = result => {
    db_tools.execute('select * from orders', result);
}

/**
 *  Gets all order rows of a customer.  
 * 
 *  @param customerId ID number of a customer.
 *  @param result Result set data.
 */
 exports.ordersOfCustomer = (customerId, result) => {
    db_tools.execute('select * from orders where customer_id = ?', result, [customerId]);
}

/**
 *  Adds a new order to the orders table. 
 * 
 *  @param order Oject of an order.
 *  @param result Result set data.
 */
 exports.addOrder = (order, result) => {
    console.log(order);
    db_tools.execute(`insert into orders (
                        timestamp, 
                        order_shipped, 
                        order_confirmed, 
                        payment_info, 
                        tax_amount, 
                        shipping_handling_price, 
                        total_price,
                        total_items,
                        billing_address, 
                        shipping_address, 
                        shipping_email, 
                        shipping_name, 
                        customer_id, 
                        worker_id
                    ) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                    select last_insert_id() as last_id;`, 
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
            order.shipping_email,
            order.shipping_name,
            order.customer_id,
            order.worker_id
        ]
    );
}

/**
 *  Updates and existing order row.
 * 
 *  @param order Order object.
 *  @param result Result set data.
 */
 exports.updateOrder = (order, result) => {
    db_tools.execute(`UPDATE orders SET 
                        timestamp = ?, 
                        order_shipped = ?, 
                        order_confirmed = ?, 
                        payment_info = ?, 
                        tax_amount = ?, 
                        shipping_handling_price = ?, 
                        total_price = ?, 
                        total_items = ?, 
                        billing_address = ?, 
                        shipping_address = ?, 
                        shipping_email = ?, 
                        shipping_name = ?, 
                        customer_id = ?, 
                        worker_id = ? 
                        where id = ?`, 
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
            order.shipping_email,
            order.shipping_name,
            order.customer_id,
            order.worker_id,
            order.order_id,
        ]
    );
}

/**
 *  Gets a single order row based on an order id.
 * 
 *  @param id Order ID Number.
 *  @param result Result set data.
 */
exports.byID = (id, result) => {
    db_tools.execute('select * from orders where id = ?', result, [id]);
}

/**
 *  Deletes and existing order row. 
 * 
 *  @param id Order ID Number.
 *  @param result Result set data.
 */
exports.deleteOrder = (id, result) => {
    db_tools.execute('delete from orders where id = ?', result, [id]);
}

/**
 *  Sets the confirmed flag to true. 
 * 
 *  @param id Order ID Number.
 *  @param result Result set data.
 */
exports.confirmOrder = (id, result) => {
    db_tools.execute('update orders set order_confirmed = 1 where id = ?', result, [id]);
}

/**
 *  Sets the shipped flag to true.
 * 
 *  @param id Order ID Number.
 *  @param result Result set data.
 */
 exports.shipOrder = (id, result) => {
    db_tools.execute('update orders set order_shipped = 1 where id = ?', result, [id]);
}

/**
 *  Gets the order_items rows of a single order.
 * 
 *  @param orderId Order ID Number.
 *  @param result Result set data.
 */
 exports.orderItems = (orderId, result) => {
    db_tools.execute('select * from order_items where order_id = ?', result, [orderId]);
}

/**
 *  Inserts new order items of single order.
 * 
 *  @param 
 *  @param result Result set data.
 */
exports.addOrderItems = (orderItems, result) => {

    let sqlStatement = "insert into order_items values "
    let values = [];

    orderItems.forEach((orderItem, index) => {
        let insertRow = `(?, ?, ?)` + (index + 1 !== orderItems.length ? ',' : ';');   
        sqlStatement += insertRow;
        values.push(orderItem.order_id);
        values.push(orderItem.part_id);
        values.push(orderItem.quantity);
    });
    
    console.log(sqlStatement);
    console.log(values);
    db_tools.execute(sqlStatement, result, values);
}
