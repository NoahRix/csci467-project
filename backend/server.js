const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(3001);