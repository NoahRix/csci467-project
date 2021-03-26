const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("Hello");
});

require("./app/routes/test.routes.js")(app);
require("./app/routes/customers.routes")(app);
app.listen(3001);