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
    Typography,
    IconButton
} from "@material-ui/core";
import { Delete } from '@material-ui/icons';
import { DataGrid } from "@material-ui/data-grid";
import { AuthContext } from "../utils/AuthContext";

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
        wordWrap: "break-word"
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

export default function ShoppingCart(props) {
    const { id, emailAddress, isCustomerAuthed, shoppingCartContents, setShoppingCartContents } = useContext(AuthContext);

    //Styles
    const classes = useStyles();

    const [parts, setParts] = useState([]);
    const [shippingInformation, setShippingInformation] = useState([
        { type: "Free", cost: 0.0 },
    ]);
    const [shippingOption, setShippingOption] = useState(0.0);
    const [totalPartsPrice, setTotalPartsPrice] = useState(0.12345667);
    const [taxRate] = useState(0.075);
    const [taxAmount, setTaxAmount] = useState(0.0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [CCNumber, setCCNumber] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [CCNumberError, setCCNumberError] = useState(false);
    const [expireDateError, setExpireDateError] = useState(false);
    const [billingAddressError, setBillingAddressError] = useState(false);
    const [shippingAddressError, setShippingAddressError] = useState(false);
    const [orderRecieved, setOrderRecieved] = useState(false);

    // Test data for the shopping cart contents.
    //const [shoppingCartContents, setShoppingCartContents] = useState([]);

    // To help with updating the quantities.
    let quantities = [];

    // This handles making the transaction with the credit card service.
    const handlePlaceOrder = (e) => {

        let trans = uuidv4();

        //let trans = "0a10a449-ef91-434a-8632-16b1ca89a3ab";
        let vendor = "VE341-34";

        let name_empty = name === "";
        let email_empty = email === "";
        let CCNumber_empty = CCNumber === "";
        let expireDate_empty = expireDate === "";
        let billingAddress_empty = billingAddress === "";
        let shippingAddress_empty = shippingAddress === "";

        //console.log("name:" + name);
        //console.log("email:" + email);
        //console.log("CCNumber:" + CCNumber);
        //console.log("expireDate:" + expireDate);
        //console.log("billingAddress:" + billingAddress);
        //console.log("shippingAddress:" + shippingAddress);

        //console.log("name_empty:" + name_ready);
        //console.log("email_empty:" + email_ready);
        //console.log("CCNumber_empty:" + CCNumber_ready);
        //console.log("expireDate_empty:" + expireDate_ready);
        //console.log("billingAddress_empty:" + billingAddress_ready);
        //console.log("shippingAddress_empty:" + shippingAddress_ready);

        let ready = 
            !name_empty &&
            !(email_empty && !isCustomerAuthed) &&
            !CCNumber_empty &&
            !expireDate_empty &&
            !billingAddress_empty &&
            !shippingAddress_empty

        // Text field input errors for empty fields.
        setNameError(name_empty);
        setEmailError(email_empty);
        setCCNumberError(CCNumber_empty);
        setExpireDateError(expireDate_empty);
        setBillingAddressError(billingAddress_empty);
        setShippingAddressError(shippingAddress_empty);

        console.log("ready: " + ready);

        if(ready){
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
                console.log(res.data);
                if (res.data.authorization) handleStoreOrderItems();
                else console.log("Error: " + res.data.errors[0]);
            });
        }
    };

    const handleStoreOrderItems = async () => {
        let now = new Date(Date.now())
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        console.log("customer_id: " + id);
        console.log("emailAddress: " + emailAddress);

        // Create a new order row.
        let order_row = {
            timestamp: now,
            order_shipped: 0,
            order_confirmed: 0,
            payment_info: name + " " + CCNumber + " " + expireDate,
            tax_amount: taxAmount.toFixed(2),
            shipping_handling_price: shippingOption,
            total_price: totalPrice,
            total_items: totalItems,
            billing_address: billingAddress,
            shipping_address: shippingAddress,
            shipping_email: isCustomerAuthed ? emailAddress : email, // Global email, or else local email.
            shipping_name: name,
            customer_id: isCustomerAuthed !== null ? id : 50,
            worker_id: 1,
        };

        let last_order_id = null;

        // Submit the new order, and wait for the last inserted ID.
        let insert_new_order = new Promise((resolve) => {
            axios({
                method: "post",
                url: "http://localhost:3001/api/orders/add",
                data: order_row,
            }).then((res) => {
                console.log("res.data");
                console.log(res.data);
                last_order_id = res.data[1][0].last_id;
                resolve();
            }).catch(err => {
                console.log(err);
            });
        });

        await insert_new_order;

        console.log("Last Inserted ID: " + last_order_id);

        // build the array of order items for the order_items many-to-many table.
        let order_items = parts.map((part) => {
            return {
                order_id: last_order_id,
                part_id: part.number,
                quantity: part.quantity,
            };
        });

        console.log("order_items");
        console.log(order_items);

        let affected_rows = 0;

        // Insert the new items and wait for the number of rows affected.
        let insert_order_items = new Promise((resolve) => {
            axios({
                method: "post",
                url: "http://localhost:3001/api/orders/addOrderItems",
                data: order_items,
            }).then((res) => {
                affected_rows = res.data.affectedRows;
                resolve();
            });
        });

        await insert_order_items;

        console.log("Affected rows: " + affected_rows);
        if (affected_rows > 0) {
            setParts([]);
            setShoppingCartContents([]);
            setOrderRecieved(true);
        }
    };

    // This updates the quantity values when ever the user changes a quantity from a row.
    const handleQuantityChange = (e, index) => {
        quantities[index] = e.target.value;
        setParts(
            parts.map((part, index) => {
                part.quantity = parseInt(quantities[index]);
                return part;
            })
        );
    }

    // Make a random shopping cart
    useEffect(() => {
        if(false)
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/test/test'
        }).then(res => {
            console.log("shopping");
            console.log(res.data);
            setShoppingCartContents(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, [])

    // Get a random name and address.
    useEffect(() => {
        if(true){
            axios({
                    method: 'get',
                    url: 'https://randomuser.me/api/'
                }).then(res => {
                    console.log(res.data.results[0].name);
                    console.log(res.data.results[0].location);
                    let name = res.data.results[0].name.first + " " + res.data.results[0].name.last 
                    let address = 
                    res.data.results[0].location.street.name + " " + 
                    res.data.results[0].location.street.number + " " + 
                    res.data.results[0].location.city + " " + 
                    res.data.results[0].location.country + " ";
                    
                    setName(name);
                    setShippingAddress(address);
                    setBillingAddress(address);
                    setCCNumber("6011 1234 4321 1234");
                    setExpireDate("12/2024");
                })
                .catch(err => {
                    console.log(err);
            });
        }
    }, [setName, setShippingAddress, setBillingAddress, setCCNumber.apply, setExpireDate]);

    // On page load, get all of the parts info from the shopping cart contents.
    // Array construction occurs to solve this problem.
    useEffect(() => {
        console.log("NEW");
        if (shoppingCartContents[0]) {
            axios({
                method: "post",
                url: "http://localhost:3001/api/parts/by-part-numbers",
                data: {
                    partNumbers: shoppingCartContents.map(
                        (item) => item.number
                    ),
                },
            }).then((res) => {

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
        }
    }, [shoppingCartContents, setParts]);

    // Get the shipping information for the select menu.
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:3001/api/shipping_information/all",
            data: {},
        }).then((res) => {
            console.log("Shipping info");
            setShippingInformation(res.data.sort((a, b) => a.cost > b.cost));
        });
    }, [setShippingInformation]);

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
        setTaxAmount(taxRate * (totalPartsPrice + shippingOption));
        setTotalPrice(totalPartsPrice + shippingOption + (taxRate * (totalPartsPrice + shippingOption)));
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
            headerName: "Action",
            width: 130,
            renderCell: (params) => (
                <div className={classes.cellCustom}>
                    <IconButton
                        style={{
                            margin: "auto",
                            width: "50px"
                        }}
                        onClick={() => {setParts(parts.filter(part => part.number !== params.row.number))}}
                    >
                        <Delete/>
                    </IconButton>
                </div>
            ),
        },
        {
            field: "pictureURL",
            headerName: "Image",
            width: 125,
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
            field: "description",
            headerName: "Part Description",
            width: 155,
            renderCell: (params) => (
                <div className={classes.cellCustom}>{params.row.description}</div>
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
            ),
        },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {orderRecieved ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    <Paper 
                        style={{
                            width: "300px",
                            padding: "15px",
                            margin: "20px auto auto auto",
                            display: "flex",
                            flexDirection: "column"
                            }}
                    >
                        <Typography
                            style={{
                                textAlign: "center"
                            }}
                        >
                            Your order has been received, thank you for shopping
                            with us. 
                        </Typography>
                        <Button
                            style={{
                                backgroundColor: "#eee"
                            }}
                            onClick={() => {props.history.push("/")}}
                        >
                            Home
                        </Button>
                    </Paper>
                </div>
            ) : (
                <div style={{ margin: "auto", width: "800px" }}>
                    <div style={{ width: "100%" }}>
                        <DataGrid
                            autoHeight
                            rowHeight={100}
                            rows={parts.map((part) => {
                                quantities.push(part.quantity);
                                return part;
                            })}
                            columns={columns}
                            pageSize={5}
                        />
                    </div>
                    <Grid
                        container
                        className={classes.formContainer}
                        spacing={2}
                    >
                        <Grid item xs={6}>
                            <Paper className={classes.formBox}>
                                <Typography>
                                    Shipping:
                                </Typography>
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
                        <Grid item xs={6}>
                            <Paper className={classes.formBox}>
                                <Typography>Total Parts price: </Typography>
                                <Typography>{`$${formatUSD(totalPartsPrice)}`}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.formBox}>
                                <Typography>Tax Rate: {taxRate * 100}%</Typography>
                                <Typography>Tax Amount: {`$${formatUSD(taxAmount)}`}</Typography>
                                
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.formBox}>
                            <Typography>Total Price </Typography>
                            <Typography>{`$${formatUSD(totalPrice)}`}</Typography>
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
                                                    setExpireDate(
                                                        e.target.value
                                                    );
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
                                                    setBillingAddress(
                                                        e.target.value
                                                    );
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
                                                    setShippingAddress(
                                                        e.target.value
                                                    );
                                                }}
                                                label="Shipping Address"
                                            />
                                        </Grid>
                                        {!isCustomerAuthed && <Grid
                                            className={classes.paymentFormItem}
                                            item
                                            xs={6}
                                        >
                                            <TextField
                                                className={
                                                    classes.paymentFormItemInner
                                                }
                                                value={email}
                                                error={emailError}
                                                onChange={(e) => {
                                                    setEmail(
                                                        e.target.value
                                                    );
                                                }}
                                                label="Email Address"
                                            />
                                        </Grid>}
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
                                                    marginLeft: "123px",
                                                    minWidth: "130px",
                                                    backgroundColor: "#eee",
                                                }}
                                                onClick={handlePlaceOrder}
                                            >
                                                Place Order
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
}
