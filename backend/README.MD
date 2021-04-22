### Routes

#### Parts (legacy)
`/api/parts/all ` - Grabs all parts (with all fields) from the legacy database.
`/api/parts/by-part-number` - Grab a part based on its part number.
`/api/parts/by-price-range` - Grab parts based on a price range.
`/api/parts/by-weight-range` - Grab parts based on a weight range.

#### Customers
`/api/customers/all` - Grabs all customers (with all fields) from the legacy database.
`/api/customers/by-id` - Gets a single customer by its id.
`/api/customers/by-email` - Gets customers by their email address.
`/api/customers/by-phone` - Gets customers by their phone number.
`/api/customers/by-name` - Gets customers by their name.
`/api/customers/by-address` - Gets customers by the city and street they live in.
`/api/customers/add` - Adds a new customer.
`/api/customers/update` - Update an existing customer.
`/api/customers/delete` - Delete a customer.

#### Orders
`/api/orders/all` - Gets all orders.
`/api/orders/add` - Adds a new order.
`/api/orders/update` - Update an existing order.
`/api/orders/delete` - Delete an order.

#### Inventory
`/api/inventory/add` - New inventory row
`/api/inventory/quantity-by-part-id` - Get quantity of a part
`/api/inventory/total-floor-price` - Gets the total inventory value.
`/api/inventory/update-parts` - update the exisiting parts based on the parts table in the legacy database. 

    ^
    |
    |

Get all of the parts from the legacy database (just the part numbers).

Compare the part numbers in the inventory table.

If there are parts that do not match or missing, update the parts in the inventory table based on the new parts list from the legacy database.

This will always run when any other api, that interacts with this table, runs.



