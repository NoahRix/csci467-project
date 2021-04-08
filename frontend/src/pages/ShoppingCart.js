import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Table,
    TableContainer,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Grid,
    Paper,
    Select,
    MenuItem,
    TextField,
} from "@material-ui/core";

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
        textAlign: "center",
    },
    paymentFormItem: {
        padding: "15px",
        display: "flex",
        flexDirection: "row"
    },
    paymentFormItemInner: {
        margin: "auto"
    }

}));

const formatUSD = (amount) => {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function ShoppingCart() {
    //const { shoppingCartContents } = useContext(AuthContext);

    //Styles
    const classes = useStyles();

    const [parts, setParts] = useState([]);
    const [shippingOption, setShippingOption] = useState(0.0);
    const [totalPartsPrice, setTotalPartsPrice] = useState(0.12345667);
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [name, setName] = useState("");
    const [CCNumber, setCCNumber] = useState("");
    const [expireDate, setExpireDate] = useState("");
    const [nameError, setNameError] = useState(false);
    const [CCNumberError, setCCNumberError] = useState(false);
    const [expireDateError, setExpireDateError] = useState(false);

    // Test data for the shopping cart contents.
    const [shoppingCartContents, setShoppingCartContents] = useState([
        { number: 1, quantity: 3 },
        { number: 2, quantity: 10 },
        { number: 3, quantity: 12 },
        { number: 4, quantity: 34 },
        { number: 5, quantity: 31 },
    ]);

    // Some test shipping standards
    const [shippingInformation, setShippingInformation] = useState([
        { type: "Free", cost: 0.0 },
        { type: "Economy", cost: 5.0 },
        { type: "Premium", cost: 10.0 },
        { type: "Industrial", cost: 100.0 },
        { type: "Commercial", cost: 450.0 },
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
        console.log("lol");
        axios({
            method: "post",
            url: "http://localhost:3001/api/parts/by-part-numbers",
            data: {
                partNumbers: shoppingCartContents.map((item) => item.number),
            },
        }).then((res) => {
            // Prepare the new array to map on the DOM.
            let parts_temp = [];

            // Stitch the quantities to the new array.
            res.data.forEach((item, index) => {
                parts_temp[index] = {
                    ...item,
                    quantity: shoppingCartContents[index].quantity,
                };
            });

            setParts(parts_temp);
        });
    }, [shoppingCartContents]);

    // Sum up the total parts price of the shopping cart.
    useEffect(() => {
        let total_parts_price = 0.0;

        parts.forEach((part) => {
            total_parts_price += part.quantity * part.price;
        });

        setTotalPartsPrice(total_parts_price);
    }, [parts]);

    // Get the total price.
    useEffect(() => {
        setTotalPrice(totalPartsPrice + shippingOption);
    }, [totalPartsPrice, shippingOption]);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ margin: "auto", width: "650px" }}>
                <TableContainer style={{ marginTop: "15px" }} component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cellCustom}>
                                    <b>Image</b>
                                </TableCell>
                                <TableCell className={classes.cellCustom}>
                                    <b>Part Number</b>
                                </TableCell>
                                <TableCell className={classes.cellCustom}>
                                    <b>Quantity</b>
                                </TableCell>
                                <TableCell className={classes.cellCustom}>
                                    <b>Price Per Unit</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                ((quantities = []),
                                parts.map(
                                    (item, index) => (
                                        quantities.push(item.quantity),
                                        (
                                            <TableRow key={index}>
                                                <TableCell
                                                    className={
                                                        classes.cellCustom
                                                    }
                                                >
                                                    <img
                                                        alt="/"
                                                        height="75px"
                                                        src={item.pictureURL}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    className={
                                                        classes.cellCustom
                                                    }
                                                >
                                                    {item.number}
                                                </TableCell>
                                                <TableCell
                                                    className={
                                                        classes.cellCustom
                                                    }
                                                >
                                                    <TextField
                                                        style={{
                                                            width: "90px",
                                                        }}
                                                        type="number"
                                                        value={item.quantity}
                                                        inputProps={{ min: 0 }}
                                                        onChange={(e) => {
                                                            handleQuantityChange(
                                                                e,
                                                                index
                                                            );
                                                        }}
                                                    ></TextField>
                                                </TableCell>
                                                <TableCell
                                                    className={
                                                        classes.cellCustom
                                                    }
                                                >{`$${item.price}`}</TableCell>
                                            </TableRow>
                                        )
                                    )
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
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
                                    <Grid className={classes.paymentFormItem} item xs={6}>
                                        <TextField
                                            className={classes.paymentFormItemInner}
                                            label="Name"
                                            value={name}
                                            error={nameError}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid className={classes.paymentFormItem} item xs={6}>
                                        <TextField
                                            className={classes.paymentFormItemInner}
                                            value={CCNumber}
                                            error={CCNumberError}
                                            onChange={(e) => {
                                                setCCNumber(e.target.value);
                                            }}
                                            label="Credit Card Number"
                                        />
                                    </Grid>
                                    <Grid className={classes.paymentFormItem} item xs={6}>
                                        <TextField
                                            className={classes.paymentFormItemInner}
                                            value={expireDate}
                                            error={expireDateError}
                                            onChange={(e) => {
                                                setExpireDate(e.target.value);
                                            }}
                                            label="Expiration Date"
                                        />
                                    </Grid>
                                    <Grid className={classes.paymentFormItem} item xs={4}>
                                        <Button
                                            className={classes.paymentFormItemInner} 
                                            style={{marginLeft: "85px", minWidth: "130px", backgroundColor: "#eee"}}
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
        </div>
    );
}
