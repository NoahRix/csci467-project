const Auth = require("../models/auth.models.js");
const AuthUtil = require('../utils/customers.auth.js');
const Bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');


/**
*  Makes a request to log the user in. Successful attempt will respond
*  an access token.
*
*  @param req Request body that holds the customers email and password.
*  @param res Response data.
*/
exports.customerLogin = async (req, res) => {
    let encrypted_password = null;
    let clear_password = req.body.password; 
    let email = req.body.email;

    // Search the database for the customer's encrypted password based on their email.
    get_ecrypted_password = new Promise(resolve => {
        Auth.getCustomerPassword(req.body.email, (data) => {
            if(data[0]) // If there is a resulting row
                encrypted_password = data[0].password; // Get the password
            resolve();
        });
    });

    await get_ecrypted_password;    // Wait for the password query.

    // Build a default authorization object for the frontend.
    let auth_object = {
        customer_authed: null,
        customer_accessToken: null,
        customer_refreshToken: false
    };

    // If there is no password, do not authorize the customer.
    // Else check password. 
    if(!encrypted_password)
        res.send(auth_object);
    else {
        // Compare the clear and encrypted passwords.
        let compare_passwords = new Promise(resolve => {
            Bcrypt.compare(clear_password, encrypted_password, (err, result) => {
                if(result){
                    console.log("Good password");                
                    const token_details = { email: email };
                    auth_object.customer_accessToken = AuthUtil.generateAccessToken(token_details);
                    auth_object.customer_refreshToken = JWT.sign(token_details, process.env.CUSTOMER_REFRESH_TOKEN_SECRET);    
                    auth_object.customer_authed = true;
                }
                resolve();
            });
        });
        
        await compare_passwords; // Wair for asynchronous compare function to finish.

        res.send(auth_object);
    }
}
