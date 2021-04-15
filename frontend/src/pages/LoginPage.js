import React, { useContext, useState } from "react";
import {
    Button,
    TextField,
    Paper,
    Checkbox,
    FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";

const useStyles = makeStyles(() => ({
    mainBody: {
        width: "100%",
        display: "flex",
    },
    formBody: {
        margin: "20px auto",
        width: "30%",
    },
}));

export default function LoginPage(props) {
    const classes = useStyles();

    const [IdInput, setIdInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [showError, setShowError] = useState(false);
    const [isEmployee, setIsEmployee] = useState(false);

    const { setIsAdmin, setIsCustomerAuthed, setIsEmployeeAuthed, setId, id, setEmailAddress } = useContext(
        AuthContext
    );

    const getCustomerInfo = () => {

        axios({
            method: "post",
            url: "http://localhost:3001/api/customers/by-id",
            data: { id },
        }).then((res) => {
            if(res.data[0])
                setEmailAddress(res.data[0].email)
        }).catch(err =>  console.log(err));
    }
    
    const handleLogin = () => {
        axios({
            method: "post",
            url: "http://localhost:3001/api/auth/user-login",
            data: {
                id: IdInput,
                password: passwordInput,
                is_customer: !isEmployee,
            },
        }).then((res) => {
            console.log(res.data);
            if (res.data.is_authed) {
                setId(parseInt(IdInput));
                if (isEmployee) setIsEmployeeAuthed(isEmployee);
                else setIsCustomerAuthed(!isEmployee);
                setIsAdmin(res.data.is_admin);
                getCustomerInfo();
                props.history.push("/");
            } else setShowError(true);
        });
    };

    return (
        <div className={classes.mainBody}>
            <form className={classes.formBody}>
                <Paper style={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                        style={{ width: "200px", margin: "auto" }}
                        label="User"
                        error={showError}
                        onBlur={(e) => {
                            setIdInput(e.target.value);
                        }}
                    />
                    <TextField
                        style={{ width: "200px", margin: "auto" }}
                        label="Password"
                        type="password"
                        error={showError}
                        onBlur={(e) => {
                            setPasswordInput(e.target.value);
                        }}
                    />
                    <FormControlLabel
                        style={{ margin: "auto" }}
                        control={
                            <Checkbox
                                onChange={(e) =>
                                    setIsEmployee(e.target.checked)
                                }
                                color="default"
                            />
                        }
                        label="Employee?"
                        labelPlacement="start"
                    />
                    <Button onClick={handleLogin}>Login</Button>
                </Paper>
            </form>
        </div>
    );
}
