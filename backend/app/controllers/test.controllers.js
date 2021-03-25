const test = require("../models/test.models.js");

exports.parts = (req, res) => {
    test.parts(data => {
        res.send(data);
    })
}

exports.partNum = (req, res) => {
    const partNumber = req.body.partNumber;

    test.partNum(data => {
        res.send(data);
    }, partNumber)
}

exports.priceRange = (req, res) => {

    test.priceRange(data => {
        res.send(data);
    }, req.body);
}

exports.weightRange = (req, res) => {

    test.weightRange(data => {
        res.send(data);
    }, req.body);
}

exports.test = (req, res) => {
    test.test(data => {
        res.send(data);
    })
}