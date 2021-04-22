import React, { 
    useEffect,
    //useContext, 
    useState 
} from "react";
import {
    Button,
    TextField,
    Paper,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(() => ({
    mainBody: {
        width: "100%",
        display: "flex",
    },
    formBody: {
        margin: "20px auto",
        width: "300px",
    },
}));

function InputField({label, type, error, onBlur}){
    return (
        <TextField
            style={{ width: "200px", margin: "auto" }}
            type={type}
            label={label}
            error={error}
            onBlur={(e) => {
                onBlur(e.target.value);
            }}
        />
    );
}

export default function LoginPage(props) {
    const classes = useStyles();

    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [addressInput, setAddressInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [dupeEmailError, setDupeEmailError] = useState(false);
    
    const [loginID, setLoginID] = useState(0);
    const [showLoginMessage, setShowLoginMessage] = useState(false);

    const handleRegisterCustomer = () => {
        
        let nameInputEmpty = nameInput === "";
        let emailInputEmpty = emailInput === "";
        let addressInputEmpty = addressInput === "";
        let phoneInputEmpty = phoneInput === "";
        let passwordInputEmpty = passwordInput === "";
        let confirmPasswordInputEmpty = confirmPasswordInput === "";

        setNameError(nameInputEmpty);
        setEmailError(emailInputEmpty);
        setAddressError(addressInputEmpty);
        setPhoneError(phoneInputEmpty);
        setPasswordError(passwordInputEmpty);
        setConfirmPasswordError(confirmPasswordInputEmpty);

        //Regex to verify email text
        console.log("Regex");
        
        //Check emailInput.
        let emailMatch = emailInput.match(/.*@.+\..+/g);
        let emailValid = !!emailMatch;
        setEmailError(!emailMatch);

        // Check phoneInput
        let phoneMatch = phoneInput.match(/(^\d{10}$)|(^\d{3}-\d{3}-\d{4}$)|(^\(\d{3}\)\s\d{3}-\d{4}$)/g);
        let phoneValid = !!phoneMatch;
        let phone = phoneMatch ? phoneMatch[0].replace(/\(|\)|\s|-/g, "") : null;
        if(phoneMatch) console.log(phoneMatch);
        setPhoneError(!phoneMatch);

        // Check password
        let passwords_not_match = passwordInput !== confirmPasswordInput; 
        setPasswordMatchError(passwords_not_match);

        let ready = 
        !nameInputEmpty &&
        !emailInputEmpty &&
        !addressInputEmpty &&
        !phoneInputEmpty &&
        !passwordInputEmpty &&
        !confirmPasswordInputEmpty &&
        !passwords_not_match &&
        emailValid &&
        phoneValid;

        if(ready) {
            console.log("READY");
            let customer_object = {
                name: nameInput,
                email: emailInput,
                address: addressInput,
                phone,
                password: passwordInput
            };

            console.log(customer_object);

            axios({
                method: "post",
                url: "http://localhost:3001/api/auth/register",
                data: customer_object
            }).then(res => {
                if(res.data.errno){
                    setShowLoginMessage(false);
                    switch(res.data.errno){
                        case 1062:
                            setDupeEmailError(true);
                            break;
                        default:
                            break;
                    }
                    console.log(res.data.errno);
                } else {
                    setDupeEmailError(false);

                    console.log(res.data[1]);

                    if(res.data[1][0]){
                        console.log(res.data[1][0]);
                        console.log(res.data[1][0].last_id);
                        setLoginID(res.data[1][0].last_id);
                        setShowLoginMessage(true);
                    }
                }
            }).catch(err => console.log(err));    
        };
    };

    return (
        <div className={classes.mainBody}>
            <form className={classes.formBody}>
                <Paper style={{ display: "flex", flexDirection: "column" }}>
                    <InputField label="Name" type="text" error={nameError} onBlur={value => setNameInput(value)}/>
                    <InputField label="Email" type="email" error={emailError} onBlur={value => setEmailInput(value)}/>
                    <InputField label="Address" type="text" error={addressError} onBlur={value => setAddressInput(value)}/>
                    <InputField label="Phone Number" type="text" error={phoneError} onBlur={value => setPhoneInput(value)}/>
                    <InputField label="Password" type="password" error={passwordError || passwordMatchError} onBlur={value => setPasswordInput(value)}/>
                    <InputField label="Confirm Password" type="password" error={confirmPasswordError || passwordMatchError} onBlur={value => setConfirmPasswordInput(value)}/>
                    <Button onClick={handleRegisterCustomer}>Register</Button>
                    {dupeEmailError && <Typography align="center" style={{color: "red"}}>Email already in use!</Typography>}
                    {showLoginMessage && <Typography align="center" style={{color: "green"}}>Your login ID: {loginID}</Typography>}
                </Paper>
            </form>
        </div>
    );
}
