const shippingInfo = require("../models/shippingInfo.models.js");

exports.allShippingInfo = (req, res) => {
    shippingInfo.allShippingInfo(data => {
        res.send(data);
    })
}

exports.shippingInfoByType = (req, res) => {
    shippingInfo.shippingInfoByType( req.body.type, data => {
        res.send(data);
    })
}

exports.updateShippingInfo = (req, res) => {
    shippingInfo.updateShippingInfo( req.body, data => {
        res.send(data);
    })
}