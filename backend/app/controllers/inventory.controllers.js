const inventory = require("../models/inventory.models.js");
const test = require("../models/test.models.js");

exports.all = (req, res) => {
    inventory.all(data => {
        res.send(data);
    });
}

exports.update = (req, res) => {
    inventory.update(req.body, (data) => {
        res.send(data);
    });
}

exports.new = (req, res) => {

    // Check if the given part_id exists in the part table.
    require('../models/test.models').partByNumber(req.body.part_id, (data) => {
        let found = data[0] ? true : false;
        
        if(found)
            inventory.new(req.body, (data) => {
                res.send(data);
            });
        else
            res.send(`Part of number ${req.body.part_id} does not exist, inventory unchanged.`);
    });    
}

exports.deleteRowsByIDs = (req, res) => {
    //inventory.deleteRowsByIDs(data => {
        res.send("req");
    //});
}

exports.updateAllRows = (req, res) => {
    
    // Get part numbers from both tables.
    let part_nums_of_parts = [];
    let part_nums_of_inventory = [];
    
    // Get only the part numbers.
    test.parts(data => {
        part_nums_of_parts = data.map(item => item.number);
    });

    inventory.all(data => {

        // Begin the insert statement.
        let insert_sql_statement = "insert into `inventory`(`part_id`, `quantity`) values\n";
        let delete_sql_statement = "delete from `inventory` where `part_id` in (";

        // Get only the part numbers.
        part_nums_of_inventory = data.map(item => item.part_id);

        //console.log("parts");
        //console.log(part_nums_of_parts);

        //console.log("inventory");
        //console.log(part_nums_of_inventory);

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
 
        // Check each part number from the inventory table to see if the parts table contains it.
        // If not, flag that there is a difference and build the sql string.  
        console.log("Checking");

        part_nums_of_inventory.forEach(part_num => {
            if(!part_nums_of_parts.includes(part_num))
            {
                part_discrepancy_flag = true;
                delete_sql_statement += `${part_num}, `
            }
        });

        delete_sql_statement = delete_sql_statement.replace(/,\s$/, "");

        delete_sql_statement += ");";

        inventory.deleteRowsByIDs(delete_sql_statement, ()=>{
            if(!inventory_discrepancy_flag)
                res.send("All up to date");
            else{
                insert_sql_statement = insert_sql_statement.replace(/,\n$/, ';');
                inventory.updateAllRows(insert_sql_statement, (data) => {         
                    res.send(data);
                });
            }
        });
    });   
}