const shippingInfo = require("../models/shippingInfo.models.js");

/**
 *  This gets all shipping information rows.
 *
 *  @param res Response data.
 */
 exports.allShippingInfo = (req, res) => {
    shippingInfo.allShippingInfo(data => {
        res.send(data);
    })
}

/**
 *  This gets a shipping information row by a type.
 *
 *  @param req Request body that holds the type.
 *  @param res Response data.
 */
 exports.shippingInfoByType = (req, res) => {
    shippingInfo.shippingInfoByType( req.body.type, data => {
        res.send(data);
    })
}

/**
 *  This gets a row of shipping information. The 
 *  cost is the main target.
 *
 *  @param req Request body that holds the type.
 *  @param res Response data.
 */
 exports.updateShippingInfo = (req, res) => {
    shippingInfo.updateShippingInfo( req.body, data => {
        res.send(data);
    })
}

/**
 *  This adds a new shipping information record.
 *
 *  @param req Request body that holds the shipping
 *             information.
 *  @param res Response data.
 */
 exports.addShippingRecord = (req, res) => {
    shippingInfo.addShippingRecord( req.body, data => {
        res.send(data);
    })
}

/**
 *  This deletes a shipping information row.
 *
 *  @param req Request body that holds the type.
 *  @param res Response data.
 */
 exports.deleteShippingRecord = (req, res) => {
    shippingInfo.deleteShippingRecord( req.body, data => {
        res.send(data);
    })
}