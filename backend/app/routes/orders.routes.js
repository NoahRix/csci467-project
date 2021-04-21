const user_auth = require('../utils/auth');

module.exports = app => {
    const orders = require("../controllers/orders.controllers.js");

    app.get("/api/orders/all", user_auth.middleware, orders.allOrders);
    app.get("/api/orders/allWithNames", user_auth.middleware, orders.allOrdersWithNames);
    app.post("/api/orders/add", orders.addOrder);
    app.patch("/api/orders/update", user_auth.middleware, orders.updateOrder);
    app.delete("/api/orders/delete", user_auth.middleware, orders.deleteOrder);
    app.post("/api/orders/cancel", user_auth.middleware, orders.cancelOrder);
    app.post("/api/orders/confirm", user_auth.middleware, orders.confirmOrder);
    app.post("/api/orders/ship", user_auth.middleware, orders.shipOrder);
    app.post("/api/orders/ordersOfCustomer", user_auth.middleware, orders.ordersOfCustomer);
    app.post("/api/orders/orderItems", orders.orderItems);
    app.post("/api/orders/orderItemsJoined", user_auth.middleware, orders.orderItemsJoined);
    app.post("/api/orders/addOrderItems", orders.addOrderItems);
}