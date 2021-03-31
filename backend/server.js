const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options('*', cors()); 

app.get("/", (req, res) => {
    res.send("Hello");
});

require("./app/routes/parts.routes.js")(app);

require("./app/routes/inventory.routes.js")(app);

require("./app/routes/customers.routes")(app);

require("./app/routes/orders.routes")(app);

require("./app/routes/auth.routes")(app);

app.listen(3001);