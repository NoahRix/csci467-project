const inventory = require("../models/inventory.models.js");
const parts = require("../models/parts.models.js");

/**
 *  This gets all of the rows in the inventory table.
 *
 *  @param req Request data (not used).
 *  @param res Response data that shows all of the inventory table.
 */
 exports.all = (req, res) => {
    check_invalid_parts().then(async (is_invalid) => {
        if(is_invalid)
            await fix_rows();        
        inventory.all(data => {
            res.send(data);
        });
    });
}

/**
 *  This gets all of the rows with parts information in the inventory table.
 *
 *  @param req Request data (not used).
 *  @param res Response data that shows all of the inventory table.
 */
 exports.allWithParts = async (req, res) => {
    check_invalid_parts().then(async (is_invalid) => {
        if(is_invalid)
            await fix_rows();
        
        let inventory_rows = [];

        let get_inventory_rows = new Promise(resolve => {
            inventory.all(data => {
                inventory_rows = data;
                resolve();
            });
        });
            
        await get_inventory_rows;

        let parts_rows = [];

        let get_parts_rows = new Promise(resolve => {
            parts.allParts(data => {
                parts_rows = data;
                resolve();
            });
        });
            
        await get_parts_rows;

        console.log(parts_rows);

        inventory_rows = inventory_rows.sort((a, b) => a.part_id < b.part_id );
        parts_rows = parts_rows.sort((a, b) => a.number < b.number );

        parts_rows = parts_rows.map((row, index) => {
            return {...row, quantity: inventory_rows[index].quantity}
        });

        res.send(parts_rows);
    });
}

/**
 *  This gets a single row in the inventory table.
 * 
 *  @param req Request data that holds the part id.
 *  @param res Response data that holds an inventory row.
 */
 exports.byPartID = (req, res) => {
    check_if_part_exists(req.body.part_id).then(found => {
        if(found)
            inventory.byPartID(req.body.part_id, (data) => {
                res.send(data);
            });
        else
            res.send("Part does not exist in the parts table.");
    });
}

/**
 *  This will update a row in the inventory table.
 *  
 *  @param req Request data that holds the part id.
 *  @param res Response data that holds the sql server status.
 */
 exports.update = (req, res) => {
    check_if_part_exists(req.body.part_id).then(found => {
        if(found)
            inventory.update(req.body, (data) => {
                res.send(data);
            });
        else
            res.send("Part does not exist in the parts table.");
    });

}

/**
 *  This will update multiple rows in the inventory table.
 *  
 *  @param req Request data that holds the array of part ids and quantities.
 *  @param res Response data that holds the sql server status.
 */
 exports.updateRows = (req, res) => {
    inventory.updateRows(req.body, (data) => {
        res.send(data);
    });    
}

/**
 *  This will add a new inventory row.
 * 
 *  @param req Request data that holds the row object.
 *  @param res Response data hold the sql server status.
 */
 exports.new = (req, res) => {
    check_if_part_exists(req.body.part_id).then(found => {
        if(found)
            inventory.new(req.body, (data) => {
                res.send(data);
            });
        else
            res.send(`Part of number ${req.body.part_id} does not exist, inventory unchanged.`);
    });
}

/**
 *  This gets the total inventory value based on all parts quanities and prices.
 * 
 *  @param req Request data (not used)
 *  @param res Response data that holds a float value of the total value.
 */
 exports.totalFloorPrice = (req, res) => {

    // First check if the part numbers in the inventory table are valid.
    check_invalid_parts().then(async (is_invalid) => {
        
        // If any discrepancies, update the rows.
        if(is_invalid){
            console.log("Some are invalid");
            this.updateAllRows(req, res);
            this.totalFloorPrice(req, res);
        }
        else{

            let part_prices = [];   // Holds the part numbers nad prices.
            let quantities = [];    // Holds the part numbers and quantities.

            // Use a promise to populate part_prices.
            const get_part_prices = new Promise(resolve => {
                parts.allParts(data => {
                    part_prices = data.map(row => {
                        return {number: parseInt(row.number), price: parseFloat(row.price)}});
                    resolve();
                })
            });

            await get_part_prices;  // Wait for the query to finish.

            // Use a promise to populate quantities.
            const get_part_quantities = new Promise(resolve => {
                inventory.all(data => {
                    quantities = data.map(row => {
                        return {part_id: parseInt(row.part_id), quantity: parseInt(row.quantity)}});
                    resolve();
                })
            });

            await get_part_quantities;  // Wait for the query to finish.

            // Sort both arrays based on their part numbers for easy row matching.
            part_prices.sort((a, b) => (a.number < b.number) ? 1 : -1);
            quantities.sort((a, b) => (a.part_id < b.part_id) ? 1 : -1);

            // The total value.
            let total_price = 0.0;

            // Go through each row and calculate the total value.
            for(let i = 0; i < part_prices.length; i++){
                total_price += (quantities[i].quantity * part_prices[i].price);
            }
        
            // Send the total value back to the client.
            res.send(total_price.toFixed(2));
        }
    });
}

/**
 *  This deletes rows from the inventory table based on the list of part ids
 * 
 *  @param req Request data that holds the array of part ids to be deleted.
 *  @param res Response data the hold the sql server status.
 */
 exports.deleteRowsByIDs = (req, res) => {
    inventory.deleteRowsByIDs(req.body.part_ids, (data) => {
        res.send(data);
    });
}

/**
 *  This gets rows from the inventory table based on the list of part ids
 * 
 *  @param req Request data that holds the array of part ids to be fetched.
 *  @param res Response data the hold the sql server status.
 */
 exports.getRowsByIDs = (req, res) => {
    inventory.getRowsByIDs(req.body.part_ids, (data) => {
        res.send(data);
    });
}

/**
 *  This handles the fix in discrepancies in the inventory table.
 * 
 *  @param req Request data (not used).
 *  @param res Response data the hold the sql server status.
 */
 exports.updateAllRows = (req, res) => {
    fix_rows().then(data => {
        console.log(data);
        res.send(data);
    })
}

/**
 *  This will validate if a specific part exists in the parts table (from the legacy database)
 * 
 *  @param part_id part id to check.
 *  @returns Boolean.
 */
 const check_if_part_exists = async (part_id) => {

    let return_val = null;

    // Check if the given part_id exists in the part table.
    let check_part = new Promise(resolve => {
        require('../models/parts.models').partByNumber(part_id, (data) => {
            return_val = data[0] ? true : false;
            resolve();
        });        
    });

    await check_part;

    return return_val;
}

/**
 *  This fixes the inventory table to match the exact part numbers from the parts table.
 *  
 *  @returns Success message or sql server status.
 */
 const fix_rows = async () => {

    // Get part numbers from both tables.
    let part_nums_of_parts = [];
    let part_nums_of_inventory = [];
    
    // Get only the part numbers.
    let get_parts = new Promise(resolve => {
        parts.allParts(data => {
            part_nums_of_parts = data.map(item => item.number);
            resolve();
        });    
    });

    await get_parts;    // Wait for the query to finish.

    // Get only the part ids.
    let get_inventory = new Promise(resolve => {
        inventory.all(data => {
            part_nums_of_inventory = data.map(item => item.part_id);
            resolve();
        });
    });

    await get_inventory;    // Wait for the query to finish.

    // Begin the insert statement.
    let insert_sql_statement = "insert into `inventory`(`part_id`, `quantity`) values\n";

    // This flag is set to true if there are an differences in part numbers.
    let inventory_discrepancy_flag = false;
    let part_discrepancy_flag = false;

    // Check each part number from the parts table to see if the inventory table contains it.
    // If not, flag that there is a difference and build the sql string.  
    part_nums_of_parts.forEach(part_num => {
        if(!part_nums_of_inventory.includes(part_num))
        {
            inventory_discrepancy_flag = true;
            insert_sql_statement += `(${part_num}, 0),\n`
        }
    });

    // Array for excess part_ids to be deleted from the inventory table.
    let excess_part_ids = [];
    
    // Check each part number from the inventory table to see if the parts table contains it.
    // If not, flag that there is a difference and build the sql string.  
    part_nums_of_inventory.forEach(part_num => {
        if(!part_nums_of_parts.includes(part_num))
        {
            part_discrepancy_flag = true;
            excess_part_ids.push(part_num);
        }
    });
    
    return_val = null;

    // If there are any discrepancies, delete the excess rows.
    let delete_rows = new Promise(resolve => {
        inventory.deleteRowsByIDs(excess_part_ids, (data) => {
            if(!inventory_discrepancy_flag){
                return_val = data;
                resolve();
            }
            else{
                insert_sql_statement = insert_sql_statement.replace(/,\n$/, ';');
                inventory.updateAllRows(insert_sql_statement, (data) => {         
                    return_val = data;
                    resolve();
                });
            }
        });
    });

    await delete_rows;

    return return_val;
}

/**
 *  This checks for differences in the part numbers in both the parts 
 *  and inventory table. Any difference will return true, else false.
 * 
 *  @returns Boolean.
 */
 const check_invalid_parts = async () => {

    // Get part numbers from both tables.
    let part_nums_of_parts = [];
    let part_nums_of_inventory = [];

    // Get only the part numbers from both tables.
    // Promises are need for waiting on the callback to finish 
    // fetching the data.
    let get_parts = new Promise((resolve) => { 
        parts.allParts(data => {
            // Retrive the part number as numbers for sorting.
            part_nums_of_parts = data.map(item => parseInt(item.number));
            resolve();
        });
    })
        
    await get_parts;    // Wait for the query to finish.
    
    let get_inventory = new Promise((resolve) => { 
        inventory.all(data => {
            // Retrive the part ids as numbers for sorting.
            part_nums_of_inventory = data.map(item => parseInt(item.part_id));
            resolve();
        });
    })
    
    await get_inventory;    // Wait for the query to finish.

    //Check if the row counts are not equal.
    if(part_nums_of_parts.length != part_nums_of_inventory.length)
        return true;
    
    // If the sizes are equal, perform a deeper check.
    let discrepancy_flag = false;

    // Sort both sets of part numbers
    part_nums_of_parts.sort((a, b) => (a < b) ? 1 : -1);
    part_nums_of_inventory.sort((a, b) => (a < b) ? 1 : -1);
    
    // Compare one-by-one.
    part_nums_of_inventory.forEach((inv_num, index) => {
         if(inv_num !== part_nums_of_parts[index])
            discrepancy_flag = true 
    });

    return discrepancy_flag;
}