const db_tools = require("../utils/db-tools");

exports.allShippingInfo = result => {
    db_tools.execute('select * from shipping_information', result);
}

exports.shippingInfoByType = (type, result) => {
    db_tools.execute('select * from shipping_information where type = ?', result, [type]);
}

exports.updateShippingInfo = (info, result) => {
    db_tools.execute('update shipping_information set cost = ? where type = ?', 
        result, 
        [
            info.cost,
            info.type,
        ]
    );
}

exports.addShippingRecord = (info, result) => {
    db_tools.execute('insert into shipping_information (type, cost) values ( ?, ? )',
    result,
    [
        info.type,
        info.cost,
    ]);
}

exports.deleteShippingRecord = (info, result) => {
    db_tools.execute('delete from shipping_information where type = ?',
    result,
    [
        info.type,
    ]);
}