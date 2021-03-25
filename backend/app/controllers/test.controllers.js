const test = require("../models/test.models.js");

exports.parts = (req, res) => {
    test.parts(data => {
        res.send(data);
    })
}

exports.partNum = (req, res) => {
    const partNumber = req.body.partNumber;
    const query = `select * from parts where number = ${partNumber}`;

    test.partNum(data => {
        res.send(data);
    }, query)
}

exports.priceRange = (req, res) => {
    const lowerPrice = req.body.lowerPrice;
    const upperPrice = req.body.upperPrice;

    const query = `select * from parts where price between ${lowerPrice} and ${upperPrice}`;

    test.priceRange(data => {
        res.send(data);
    }, query);
}

exports.weightRange = (req, res) => {
    const lowerWeight = req.body.lowerWeight;
    const upperWeight = req.body.upperWeight;

    const query = `select * from parts where weight between ${lowerWeight} and ${upperWeight}`;

    test.weightRange(data => {
        res.send(data);
    }, query);
}

exports.test = (req, res) => {
    test.test(data => {
        res.send(data);
    })
}