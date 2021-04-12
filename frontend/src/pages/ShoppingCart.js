import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Grid,
    Paper,
    Select,
    MenuItem,
    TextField,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { AuthContext } from '../utils/AuthContext';

const useStyles = makeStyles(() => ({
    formContainer: {
        marginTop: "15px",
    },
    formBox: {
        height: "60px",
        textAlign: "center",
        padding: "auto",
    },
    cellCustom: {
        display: "flex",
        flexDirection: "column",      
        textAlign: "center",
        width: "100%",
    },
    paymentFormItem: {
        padding: "15px",
        display: "flex",
        flexDirection: "row",
    },
    paymentFormItemInner: {
        margin: "auto",
    },
}));

const formatUSD = (amount) => {
    return Number(amount.toFixed(2)).toLocaleString();
};

export default function ShoppingCart() {
    const { id, isCustomerAuthed } = useContext(AuthContext);

    //Styles
    const classes = useStyles();

    const [parts, setParts] = useState([]);
    const [shippingInformation] = useState([]);
    const [shippingOption, setShippingOption] = useState(0.0);
    const [totalPartsPrice, setTotalPartsPrice] = useState(0.12345667);
    const [taxAmount] = useState(0.0075);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [name, setName] = useState("");
    const [CCNumber, setCCNumber] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [nameError, setNameError] = useState(false);
    const [CCNumberError, setCCNumberError] = useState(false);
    const [expireDateError, setExpireDateError] = useState(false);
    const [billingAddressError, setBillingAddressError] = useState(false);
    const [shippingAddressError, setShippingAddressError] = useState(false);

    // Test data for the shopping cart contents.
    const [shoppingCartContents] = useState([
        { number: 1, quantity: 3 },
        { number: 2, quantity: 10 },
        { number: 3, quantity: 12 },
        { number: 4, quantity: 34 },
        { number: 5, quantity: 31 },
    ]);


    // To help with updating the quantities.
    let quantities = [];

    // This handles making the transaction with the credit card service.
    const handlePlaceOrder = (e) => {
        //console.log("name");
        //console.log(name);
        //console.log("CCNumber");
        //console.log(CCNumber);
        //console.log("expireDate");
        //console.log(expireDate);

        let trans = uuidv4();

        //let trans = "0a10a449-ef91-434a-8632-16b1ca89a3ab";
        let vendor = "VE341-34";

        // Text field input errors for empty fields.
        setNameError(name === "");
        setCCNumberError(CCNumber === "");
        setExpireDateError(expireDate === "");
        setBillingAddressError(billingAddress === "");
        setShippingAddressError(shippingAddress === "");

        // Make a request for the credit card service.
        axios({
            method: "post",
            url: "http://blitz.cs.niu.edu/CreditCard/",
            data: {
                vendor,
                trans,
                cc: CCNumber,
                name,
                exp: expireDate,
                amount: totalPrice,
            },
        }).then((res) => {
            if (res.data.authorization) console.log("SAVE ORDER");
            else console.log("BAD ORDER");
        });
    };

    const handleStoreOrderItems = () => {

        let now = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');

        console.log("customer_id: " + id)

        // Create a new order row.
        let order_row = {
            timestamp: now,
            order_shipped: 0,
            order_confirmed: 0,
            payment_info: name + " " + CCNumber + " " + expireDate,
            tax_amount: taxAmount,      // DISPLAY THIS
            shipping_handling_price: shippingOption,
            total_price: totalPrice,
            total_items: totalItems,
            billing_address: billingAddress,
            shipping_address: shippingAddress,
            customer_id: isCustomerAuthed !== null ? id : 50,
            worker_id: 1
        };

        axios({
            method: "post",
            url: "http://localhost:3001/api/orders/add",
            data: order_row
        }).then(res => {
            console.log("order_info");
            console.log(res.data);
        });

        console.log("order_row");
        console.log(order_row);
    }

    // This updates the quantity values when ever the user changes a quantity from a row.
    const handleQuantityChange = (e, index) => {
        quantities[index] = e.target.value;
        setParts(
            parts.map((part, index) => {
                part.quantity = quantities[index];
                return part;
            })
        );
    };

    // On page load, get all of the parts info from the shopping cart contents.
    // Array construction occurs to solve this problem.
    useEffect(() => {
        console.log("NEW")
        axios({
            method: "post",
            url: "http://localhost:3001/api/parts/by-part-numbers",
            data: {
                partNumbers: shoppingCartContents.map((item) => item.number),
            },
        }).then((res) => {
            console.log(res.data);
            // Prepare the new array to map on the DOM.
            let parts_temp = [];

            // Stitch the quantities to the new array.
            res.data.forEach((item, index) => {
                parts_temp[index] = {
                    id: index,
                    ...item,
                    quantity: shoppingCartContents[index].quantity,
                };
            });

            setParts(parts_temp);
        });
    }, [shoppingCartContents]);

    //useEffect(() => {
    //    axios({
    //        method
    //    });
    //}, [shippingInformation, setShippingInformation])

    // Sum up the total parts price of the shopping cart.
    useEffect(() => {
        let total_parts_price = 0.0;
        let total_items = 0;

        parts.forEach((part) => {
            total_parts_price += part.quantity * part.price;
            total_items += part.quantity;
        });

        setTotalPartsPrice(total_parts_price);
        setTotalItems(total_items);
    }, [parts]);

    // Get the total price.
    useEffect(() => {
        setTotalPrice(totalPartsPrice + shippingOption);
    }, [totalPartsPrice, shippingOption]);

    const ImageFrame = ({ url }) => {
        return (
            <>
                {url === "http://blitz.cs.niu.edu/pics/wip.jpg" ? (
                    <div
                        style={{
                            overflow: "hidden",
                            width: "72px",
                            height: "54px",
                            border: "0.75px solid black",
                            scale: "1.39",
                            marginLeft: "14px",
                        }}
                    >
                        <img alt="/" height="75px" src={url} />
                    </div>
                ) : (
                    <img
                        style={{ border: "1px solid black" }}
                        alt="/"
                        height="75px"
                        src={url}
                    />
                )}
            </>
        );
    };

    const columns = [
        {
            field: "id",
            headerName: "Item Group",
            width: 130,
            renderCell: (params) => (
                <div className={classes.cellCustom}>{params.row.id}</div>
            ),
        },
        {
            field: "pictureURL",
            headerName: "Image",
            width: 130,
            renderCell: (params) => <ImageFrame url={params.row.pictureURL} />,
        },
        {
            field: "number",
            headerName: "Part Number",
            width: 135,
            renderCell: (params) => (
                <div className={classes.cellCustom}>{params.row.number}</div>
            ),
        },
        { 
            field: "price", 
            headerName: "Unit Price", 
            width: 130,
            renderCell: (params) => (
                <div className={classes.cellCustom}>{params.row.price}</div>
            ), 
        },
        {
            field: "quantity",
            headerName: "Quantity",
            width: 120,
            renderCell: (params) => (
                <div className={classes.cellCustom}>
                    <TextField
                        style={{
                            width: "90px",
                        }}
                        type="number"
                        value={params.row.quantity}
                        inputProps={{ min: 0 }}
                        onChange={(e) => {
                            console.log(e.target.value);
                            console.log(params.row.id);
                            handleQuantityChange(e, params.row.id);
                        }}
                    />
                </div>
            )
        }
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ margin: "auto", width: "650px" }}>
                <div style={{ width: "100%" }}>
                    <DataGrid
                        autoHeight
                        rowHeight={100}
                        rows={parts.map((part) => {
                            quantities.push(part.quantity);
                            return part;
                        })}
                        columns={columns}
                        pageSize={4}
                    />
                </div>
                <Grid container className={classes.formContainer} spacing={2}>
                    <Grid item xs={4}>
                        <Paper className={classes.formBox}>
                            <Select
                                value={shippingOption}
                                onChange={(e) => {
                                    setShippingOption(e.target.value);
                                }}
                            >
                                {shippingInformation.map((row, index) => (
                                    <MenuItem
                                        key={index}
                                        value={row.cost}
                                    >{`${row.type} - $${row.cost}`}</MenuItem>
                                ))}
                            </Select>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.formBox}>
                            Total Parts price: <br />
                            {`$${formatUSD(totalPartsPrice)}`}
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.formBox}>
                            Shipping Price <br />
                            {`$${formatUSD(shippingOption)}`}
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={classes.formBox}>
                            Total Price <br />
                            {`$${formatUSD(totalPrice)}`}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <form noValidate autoComplete="off">
                                <Grid container>
                                    <Grid
                                        className={classes.paymentFormItem}
                                        item
                                        xs={6}
                                    >
                                        <TextField
                                            className={
                                                classes.paymentFormItemInner
                                            }
                                            label="Name"
                                            value={name}
                                            error={nameError}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        className={classes.paymentFormItem}
                                        item
                                        xs={6}
                                    >
                                        <TextField
                                            className={
                                                classes.paymentFormItemInner
                                            }
                                            value={CCNumber}
                                            error={CCNumberError}
                                            onChange={(e) => {
                                                setCCNumber(e.target.value);
                                            }}
                                            label="Credit Card Number"
                                        />
                                    </Grid>
                                    <Grid
                                        className={classes.paymentFormItem}
                                        item
                                        xs={6}
                                    >
                                        <TextField
                                            className={
                                                classes.paymentFormItemInner
                                            }
                                            value={expireDate}
                                            error={expireDateError}
                                            onChange={(e) => {
                                                setExpireDate(e.target.value);
                                            }}
                                            label="Expiration Date"
                                        />
                                    </Grid>
                                    <Grid
                                        className={classes.paymentFormItem}
                                        item
                                        xs={6}
                                    >
                                        <TextField
                                            className={
                                                classes.paymentFormItemInner
                                            }
                                            value={billingAddress}
                                            error={billingAddressError}
                                            onChange={(e) => {
                                                setBillingAddress(e.target.value);
                                            }}
                                            label="Billing Address"
                                        />
                                    </Grid>
                                    <Grid
                                        className={classes.paymentFormItem}
                                        item
                                        xs={6}
                                    >
                                        <TextField
                                            className={
                                                classes.paymentFormItemInner
                                            }
                                            value={shippingAddress}
                                            error={shippingAddressError}
                                            onChange={(e) => {
                                                setShippingAddress(e.target.value);
                                            }}
                                            label="Shipping Address"
                                        />
                                    </Grid>
                                    <Grid
                                        className={classes.paymentFormItem}
                                        item
                                        xs={4}
                                    >
                                        <Button
                                            className={
                                                classes.paymentFormItemInner
                                            }
                                            style={{
                                                marginLeft: "85px",
                                                minWidth: "130px",
                                                backgroundColor: "#eee",
                                            }}
                                            onClick={handlePlaceOrder}
                                        >
                                            Place Order
                                        </Button>
                                    </Grid>
                                    <Grid
                                        className={classes.paymentFormItem}
                                        item
                                        xs={4}
                                    >
                                        <Button
                                            className={
                                                classes.paymentFormItemInner
                                            }
                                            style={{
                                                marginLeft: "85px",
                                                minWidth: "130px",
                                                backgroundColor: "#eee",
                                            }}
                                            onClick={handleStoreOrderItems}
                                        >
                                            Place Order TEST
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
