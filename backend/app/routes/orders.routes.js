module.exports = app => {
    const orders = require("../controllers/orders.controllers.js");

    app.get("/api/orders/all", orders.allOrders);
    app.post("/api/orders/add", orders.addOrder);
    app.patch("/api/orders/update", orders.updateOrder);
    app.delete("/api/orders/delete", orders.deleteOrder);

    app.post("/api/orders/ordersOfCustomer", orders.ordersOfCustomer);
    app.post("/api/orders/orderItems", orders.orderItems);
    app.post("/api/orders/addOrderItems", orders.addOrderItems);
}