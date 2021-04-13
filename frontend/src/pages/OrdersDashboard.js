import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Typography,
    Paper,
    IconButton,
    Collapse,
    Box,
    Tooltip
} from "@material-ui/core";
import {
    KeyboardArrowDown,
    KeyboardArrowUp,
    Delete,
    Check,
    LocalShipping,
} from "@material-ui/icons";
import ImageFrame from "../components/ImageFrame";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        width: "800px",
        margin: "auto"
    },
    cellCustom: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
    },
    center: {
        marginLeft: "10px"
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
}));

function formatUSD(amount) {
    return `$${Number(amount.toFixed(2)).toLocaleString()}`;
}

function Row({ row, updateOrders }) {
    
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [orderItems, setOrderItems] = useState([]);
    
    const handleDeleteOrder = (id) => {
        console.log("DELETE: " + id);

        axios({
            method: "delete",
            url: "http://localhost:3001/api/orders/delete",
            data: {id}
        }).then(res => {
            console.log(res.data);
            updateOrders();
        }).catch(err => {
            console.log(err);
        });
    }

    const handleShipOrder = (id) => {
        axios({
            method: "post",
            url: "http://localhost:3001/api/orders/ship",
            data: {id}
        }).then(res => {
            console.log(res.data);
            updateOrders();
        }).catch(err => {
            console.log(err);
        });
    }

    const handleConfirmOrder = (id) => {
        console.log("CONFIRM: " + id);

        axios({
            method: "post",
            url: "http://localhost:3001/api/orders/confirm",
            data: {id}
        }).then(res => {
            console.log(res.data);
            updateOrders();
        }).catch(err => {
            console.log(err);
        });
    }   

    useEffect(() => {
        if(open) {
            console.log("Order ID: " + row.id);
            axios({
                method: "post",
                url: "http://localhost:3001/api/orders/orderItemsJoined",
                data: {orderId: row.id}
            }).then(res => {
                console.log(res.data);
                setOrderItems(res.data);
            });
        }
    }, [open, row.id, setOrderItems]);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{row.customer_name}</TableCell>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">
                    {row.order_shipped === 1 && <Typography>Shipped</Typography>}
                    {row.order_confirmed === 1 && row.order_shipped === 0 && (
                        <Typography>Confirmed</Typography>
                    )}
                    {row.order_confirmed === 0 && (
                        <Typography>Unconfirmed</Typography>
                    )}
                </TableCell>
                <TableCell align="center">
                    {formatUSD(row.total_price)}
                </TableCell>
                <TableCell align="center">
                    <Tooltip title="Delete">                        
                        <IconButton onClick={() => {handleDeleteOrder(row.id)}}><Delete/></IconButton>
                    </Tooltip>
                    {
                        (row.order_confirmed === 1 && row.order_shipped === 0) &&
                        <Tooltip title="Ship">                        
                            <IconButton onClick={() => {handleShipOrder(row.id)}}><LocalShipping/></IconButton>
                        </Tooltip>
                    }
                    {
                        row.order_confirmed === 0 &&
                        <Tooltip title="Confirm">                        
                            <IconButton onClick={() => {handleConfirmOrder(row.id)}}><Check/></IconButton>
                        </Tooltip>
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Order Items
                            </Typography>
                            <Table size="small" aria-label="order items">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Part Image</TableCell>
                                        <TableCell align="center">Part Number</TableCell>
                                        <TableCell align="center">Part Description</TableCell>
                                        <TableCell align="center">Part Price</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        orderItems.map((order_item, index) => 
                                            <TableRow  key={index}>    
                                                <TableCell >
                                                    <div className={classes.cellCustom}>
                                                        <div style={{margin: "auto"}}>
                                                            <ImageFrame url={order_item.pictureURL}/>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className={classes.cellCustom}>
                                                        <Typography>{order_item.number}</Typography>
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className={classes.cellCustom}>
                                                        <Typography>{order_item.description}</Typography>
                                                    </div>
                                                </TableCell>
                                                <TableCell >
                                                    <div className={classes.cellCustom}>
                                                        <Typography>{formatUSD(order_item.price)}</Typography>
                                                    </div>
                                                </TableCell>                                                
                                                <TableCell >
                                                    <div className={classes.cellCustom}>
                                                        <Typography>{order_item.quantity}</Typography>
                                                    </div>
                                                </TableCell>                                                
                                            </TableRow>    
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function OrdersDashboard() {
    const classes = useStyles();

    const [tabValue, setTabValue] = useState(0);
    const [allOrders, setAllOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortFlag, setSortFlag] = useState(0b00000000);
  
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    const updateOrders = () => {
        console.log("Update Orders!");

        axios({
            method: "get",
            url: "http://localhost:3001/api/orders/allWithNames",
        }).then((res) => {
            console.log(res.data);
            setAllOrders(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const compare = (alpha, beta) => {
        
        let ret_val;
    
        switch(sortFlag){
            
            case 0b00000001:
                return alpha.customer_name > beta.customer_name;  
            case 0b00000010:
                return alpha.customer_name < beta.customer_name;  
            case 0b00000100:
                return alpha.id < beta.id;  
            case 0b00001000:
                return alpha.id > beta.id;  
            case 0b00010000:
                return alpha.total_price < beta.total_price;  
            case 0b00100000:
                return alpha.total_price > beta.total_price;  

            default:
                break;
        }
        
        return ret_val;
    }

    useEffect(() => {
        updateOrders();
    }, []);
    
    useEffect(() => {
        console.log(tabValue);
        
        setPage(0);

        switch(tabValue){
            case 0:
                setOrders(allOrders.filter(order => order.order_shipped === 0 && order.order_confirmed === 1));
                break;
            case 1:
                setOrders(allOrders.filter(order => order.order_shipped === 0 && order.order_confirmed === 0));
                break;
            case 2:
                setOrders(allOrders.filter(order => order.order_shipped === 1));
                break;    
            case 3:
                console.log("Update All Orders!");
                setOrders([...allOrders]);
                break;
            default:
                setOrders([]);
        }
    
    }, [tabValue, allOrders]);

    const SortButton = (alpha, beta) => {
        return (
            <IconButton onClick={() => {setSortFlag(sortFlag === alpha ? beta : alpha )}}>
                {
                    sortFlag === alpha ?
                    <KeyboardArrowUp/>
                    :
                    <KeyboardArrowDown/>
                }
            </IconButton>
        );
    }

    return (
        <div>
            <Tabs centered value={tabValue} onChange={(e, value) => setTabValue(value)}>
                <Tab label="Confirmed Orders" />
                <Tab label="Unconfirmed Orders" />
                <Tab label="Shipped Orders" />
                <Tab label="All Orders" />
            </Tabs>
            <Paper className={classes.root}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell align="center">
                                    <div className={classes.flexRow}>
                                        {SortButton(0b00000001, 0b00000010)}
                                        <Typography>Customer</Typography>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <div className={classes.flexRow}>
                                        {SortButton(0b00000100, 0b00001000)}
                                        <Typography>Order ID</Typography>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>Order Status</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <div className={classes.flexRow}>
                                        {SortButton(0b00010000, 0b00100000)}
                                        <Typography>Total Price</Typography>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>Action</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.sort(compare).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
                                <Row key={index} row={order} updateOrders={updateOrders} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
