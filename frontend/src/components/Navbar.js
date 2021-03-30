import React from 'react';
import { AppBar, Toolbar, makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
    toolBar: {
        alignContent: "start"
    }
  }));
  
  export default function Navbar() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <Button component={Link} to="/" color="inherit"> 1A Project </Button>
            <Button component={Link} to="/CustomerOrders" color="inherit">Orders</Button>
            <Button component={Link} to="/ShoppingCart" color="inherit">Shopping Cart</Button>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }