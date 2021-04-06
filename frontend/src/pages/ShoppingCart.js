import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableRow,
    TableCell,
    TableBody,
    Grid,
    Paper,
} from "@material-ui/core";

export default function ShoppingCart() {
    //const { shoppingCartContents } = useContext(AuthContext);

    const [parts, setParts] = useState([]);
    const [shoppingCartContents, setShoppingCartContents] = useState([ 
        {number: 1, quantity: 3},
        {number: 2, quantity: 100},
        {number: 3, quantity: 12},
        {number: 4, quantity: 34},
        {number: 5, quantity: 31}
    ]);
    
    useEffect(() => {
        axios({
            method: "post",
            url: "http://localhost:3001/api/parts/by-part-numbers",
            data: {
                partNumbers: shoppingCartContents.map((item) => item.number),
            },
        }).then((res) => {
            let parts_temp = [];
            
            console.log(res.data);
            res.data.forEach((item, index) => {
                parts_temp[index] = {
                    ...item,
                    quantity: shoppingCartContents[index].quantity,
                };
            });

            console.log("parts_temp");
            console.log(parts_temp);
            setParts(parts_temp);
        });
    }, [shoppingCartContents]);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ margin: "auto", width: "650px" }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <b>Image</b>
                            </TableCell>
                            <TableCell>
                                <b>Part Number</b>
                            </TableCell>
                            <TableCell>
                                <b>Quantity</b>
                            </TableCell>
                            <TableCell>
                                <b>Price</b>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableBody>
                        {parts.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <img
                                        alt="/"
                                        height="75px"
                                        src={item.pictureURL}
                                    />
                                </TableCell>
                                <TableCell>{item.number}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{`$${item.price}`}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Paper>Choose Shipping</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>Total Parts price</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>Shipping Price</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>Total Price</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>Payment info form</Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
