const test = require("../models/test.models.js");

/*
let html = "";
data.forEach(item => {
    html += `<img src="${item.pictureURL}"><br>\n` 
});
res.send(html);
*/
/*
let html = "";
        data.forEach(item => {
            html += `<div>`
            html += `<p>number: ${item.number}</p>`;
            html += `<p>description: ${item.description}</p>`;
            html += `<p>price: ${item.price}</p>`;
            html += `<p>weight: ${item.weight}</p>`;
            html += `<p>pictureURL: ${item.pictureURL}</p>`;
            html += `</div>`
        });
*/

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