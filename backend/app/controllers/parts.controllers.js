const parts = require("../models/parts.models.js");

/**
 *  This gets all of the rows in the parts table.
 *
 *  @param req Request data (not used).
 *  @param res Response data that shows all of the inventory table.
 */
exports.all = (req, res) => {
    parts.allParts(data => {
        res.send(data);
    })
}

/**
 *  This gets a single row in the part table ( based on part number )
 *
 *  @param req Request data. Used to get the part number.
 *  @param res Response data that shows the row in the parts table with the specified part.
 */
 exports.partNum = (req, res) => {
    const partNumber = req.body.partNumber;

    parts.partNum(data => {
        res.send(data);
    }, partNumber)
}

/**
 *  This gets a single row in the part table ( based on part number )
 *
 *  @param req Request data. Holds the list of part numbers.
 *  @param res Response data that shows the row in the parts table with the specified part.
 */
 exports.byPartNumbers = (req, res) => {
    const partNumbers = req.body.partNumbers;

    parts.byPartNumbers(data => {
        res.send(data);
    }, partNumbers)
}

/**
 *  This gets multiple rows in the parts table ( based on price range )
 *
 *  @param req Request data. Used to get the price range.
 *  @param res Response data that shows the rows in the parts table within the price range.
 */
exports.priceRange = (req, res) => {

    parts.priceRange(data => {
        res.send(data);
    }, req.body);
}

/**
 *  This gets multiple rows in the parts table ( based on weight range ) 
 *
 *  @param req Request data. Used to get the weight range.
 *  @param res Response data that shows the rows in the parts table in the specified weight range.
 */
exports.weightRange = (req, res) => {

    parts.weightRange(data => {
        res.send(data);
    }, req.body);
}

exports.test = async (req, res) => {

    let part_numbers = [];
    
    let  get_part_numbers = new Promise(resolve => {
        parts.allParts(data => {
            part_numbers = 
            data.map(part => part.number)
            .filter(() => Math.floor(Math.random() * 10) === 1 )
            .map(part_number => {return {number: part_number, quantity: Math.floor(Math.random() * 100)}});
            resolve();
        })
    });

    await get_part_numbers;



    res.send(part_numbers);
}

/**
 *  This gets a single row in the part table ( based on part number )
 *
 *  @param req Request data. Used to get the part number.
 *  @param res Response data that shows the row in the parts table with the specified part.
 */
exports.partByNumber = (req, res) => {
    parts.partByNumber(req.body.number, (data) => {
        res.send(data);
    })
}