const db_tools = require("../utils/db-tools");
/**
 *  Gets all shipping information rows.
 * 
 *  @param result Result set data.
 */
exports.allShippingInfo = result => {
    db_tools.execute('select * from shipping_information', result);
}

/**
 *  Gets a shipping information row by type.
 * 
 *  @param type shipping info type (String).
 *  @param result Result set data.
 */
exports.shippingInfoByType = (type, result) => {
    db_tools.execute('select * from shipping_information where type = ?', result, [type]);
}

/**
 *  Updates a single shipping information row.
 * 
 *  @param info shipping info object.
 *  @param result Result set data.
 */
exports.updateShippingInfo = (info, result) => {
    db_tools.execute('update shipping_information set cost = ? where type = ?', 
        result, 
        [
            info.cost,
            info.type,
        ]
    );
}

/**
 *  Adds a new shipping record.
 * 
 *  @param info shipping info object.
 *  @param result Result set data. 
 */
 exports.addShippingRecord = (info, result) => {
    db_tools.execute('insert into shipping_information (type, cost) values ( ?, ? )',
    result,
    [
        info.type,
        info.cost,
    ]);
}

/**
 *  Deletes an existing shipping info row.
 * 
 *  @param info shipping info object.
 *  @param result Result set data. 
 */
 exports.deleteShippingRecord = (info, result) => {
    db_tools.execute('delete from shipping_information where type = ?',
    result,
    [
        info.type,
    ]);
}