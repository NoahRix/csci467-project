import React, { useContext, useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    makeStyles,
    Button,
    Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import axios from "axios";
import logo from "../images/carLogo.png";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'block',
    },
    link: {
        marginRight: 15,
    },
}));

export default function Navbar() {
    const classes = useStyles();

    const {
        isAdmin,
        setIsAdmin,
        isCustomerAuthed,
        isEmployeeAuthed,
        setIsEmployeeAuthed,
        setIsCustomerAuthed,
        id,
    } = useContext(AuthContext);

    const [userName, setUserName] = useState("");

    const handleLogout = () => {
        setIsCustomerAuthed(false);
        setIsEmployeeAuthed(false);
        setIsAdmin(false);

        axios({
            method: "post",
            url: "http://localhost:3001/api/auth/user-logout",
            data: { id },
        }).then((res) => {
            console.log(res.data);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        let url = "http://localhost:3001/";
        if (isCustomerAuthed) url += "api/customers/by-id";
        if (isEmployeeAuthed) url += "api/workers/by-id";

        if (isCustomerAuthed || isEmployeeAuthed) {
            axios({
                method: "post",
                url: url,
                data: { id },
            }).then((res) => {
                if (res.data[0]) setUserName(res.data[0].name);
                else setUserName("");
            }).catch(err => console.log(err));
        }
    }, [isCustomerAuthed, isEmployeeAuthed, id, setUserName]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img 
                        src={logo}
                        alt="Logo could not load"
                        width="50px"
                        height="50px"
                    />
                    <Button className={classes.title} component={Link} to="/" color="inherit">
                        1A Project
                    </Button>
                    <Button className={classes.link} component={Link} to="/" color="inherit">
                        Home
                    </Button>
                    {isCustomerAuthed && (
                        <Button
                            className={classes.link}
                            component={Link}
                            to="/CustomerOrders"
                            color="inherit"
                        >
                            Orders
                        </Button>
                    )}
                    <Button className={classes.link} component={Link} to="/ShoppingCart" color="inherit">
                        Shopping Cart
                    </Button>
                    {isEmployeeAuthed && (
                        <Button
                            className={classes.link}
                            component={Link}
                            to="/InventoryDashboard"
                            color="inherit"
                        >
                            Inventory
                        </Button>
                    )}
                    {isAdmin && (
                        <Button
                            className={classes.link}
                            component={Link}
                            to="/ShippingDashboard"
                            color="inherit"
                        >
                            Shipping
                        </Button>
                    )}
                    {isAdmin && (
                        <Button
                            className={classes.link}
                            component={Link}
                            to="/OrdersDashboard"
                            color="inherit"
                        >
                            Fulfill Orders
                        </Button>
                    )}
                    {isCustomerAuthed || isEmployeeAuthed ? (
                        <>
                            <Button className={classes.link} onClick={handleLogout} color="inherit">
                                Logout
                            </Button>
                            <Typography>{`${userName.toUpperCase()}`}</Typography>
                        </>
                    ) : (
                        <Button className={classes.link} component={Link} to="/Login" color="inherit">
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
