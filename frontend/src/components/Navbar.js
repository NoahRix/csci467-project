import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import axios from 'axios';

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
  
    //const [ isCustomerAuthed, setA ] = useState(false);
    const { isCustomerAuthed, setIsCustomerAuthed, id } = useContext(AuthContext);

    const handleLogout = () => {
      console.log("logging out");
      console.log("id: " + id);

      setIsCustomerAuthed(false);

      axios({
        method: 'post',
        url: "http://localhost:3001/api/auth/user-logout",
        data: {id}
      }).then(res => {
        console.log(res.data)
      });
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <Button component={Link} to="/" color="inherit"> 1A Project </Button>
            <Button component={Link} to="/CustomerOrders" color="inherit">Orders</Button>
            <Button component={Link} to="/ShoppingCart" color="inherit">Shopping Cart</Button>
            
            {
              isCustomerAuthed ?
              <Button onClick={handleLogout} color="inherit">Logout</Button>
              :
              <Button component={Link} to="/Login"color="inherit">Login</Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }