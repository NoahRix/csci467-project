const test = require("../models/test.models.js");

exports.parts = (req, res) => {
    test.parts(data => {
        let html = "";
        data.forEach(item => {
            html += `<img src="${item.pictureURL}"><br>\n` 
        });
        res.send(html);
    })
}

exports.test = (req, res) => {
    test.test(data => {
        res.send(data);
    })
}

exports.partByNumber = (req, res) => {
    console.log(req.body.number);
    test.partByNumber(req.body.number, (data) => {
        res.send(data);
    })
}