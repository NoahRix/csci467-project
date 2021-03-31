import React, {useContext, useState} from 'react';
import { Button, TextField, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';

const useStyles = makeStyles((theme) => ({
    mainBody: {
        width: "100%",
        display: "flex",
    },
    formBody: {
        margin: "20px auto",
        width: "30%",
    },
}));
  
export default function LoginPage(){

    const classes = useStyles();

    const [IdInput, setIdInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [showError, setShowError] = useState(false);

    const { setIsCustomerAuthed, setId } = useContext(AuthContext);

    const handleLogin = () => {
        axios({
            method: 'post',
            url: 'http://localhost:3001/api/auth/user-login',
            data: {id: IdInput, password: passwordInput, is_customer: true}
        }).then(res => {
            console.log(res.data);
            if(res.data.is_authed)
                setId(parseInt(IdInput))
            setIsCustomerAuthed(res.data.is_authed);
        });
    }

    return(
        <div className={classes.mainBody}>
            <form className={classes.formBody}>
                <Paper style={{display: "flex", flexDirection: "column"}}>
                    <TextField
                        onBlur={e => {setIdInput(e.target.value)}}
                    />
                    <TextField
                        type="password"
                        onBlur={e => {setPasswordInput(e.target.value)}}
                     />
                    <Button
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Paper>
            </form>
        </div>
    );
}