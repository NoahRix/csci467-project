const Auth = require("../models/auth.models.js");
const AuthUtil = require('../utils/customers.auth.js');
const Bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');


/**
*  Makes a request to log the customer in. Successful attempt will respond
*  an access token.
*
*  @param req Request body that holds the customers id and password.
*  @param res Response data.
*/
exports.customerLogin = async (req, res) => {
    let encrypted_password = null;
    let clear_password = req.body.password; 
    let id = req.body.id;

    // Search the database for the customer's encrypted password based on their id.
    get_ecrypted_password = new Promise(resolve => {
        Auth.getCustomerPassword(id, (data) => {
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
        customer_refreshToken: null
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
                    const token_details = { id: id };
                    auth_object.customer_accessToken = AuthUtil.generateAccessToken(token_details);
                    auth_object.customer_refreshToken = JWT.sign(token_details, process.env.CUSTOMER_REFRESH_TOKEN_SECRET);    
                    auth_object.customer_authed = true;
                }
                resolve();
            });
        });
        
        await compare_passwords; // Wait for asynchronous compare function to finish.

        res.send(auth_object);
    }
}

/**
*  Makes a request to log the employee in. Successful attempt will respond
*  an access token.
*
*  @param req Request body that holds the employee's id and password.
*  @param res Response data.
*/
exports.employeeLogin = async (req, res) => {
    let encrypted_password = null;
    let clear_password = req.body.password; 
    let id = req.body.id;
    let is_admin = null;

    // Search the database for the employee's encrypted password and role based on their id.
    get_ecrypted_password_and_role = new Promise(resolve => {
        Auth.getEmployeePasswordAndRole(id, (data) => {
            if(data[0]){  // If there is a resulting row
                encrypted_password = data[0].password;  // Get the password
                is_admin = data[0].is_admin;            // Get the role
            }
            resolve();
        });
    });

    await get_ecrypted_password_and_role;    // Wait for the password and role query.

    // Build a default authorization object for the frontend.
    let auth_object = {
        is_admin: null,
        employee_authed: null,
        employee_accessToken: null,
        employee_refreshToken: null
    };

    // If there is no password, do not authorize the employee.
    // Else check password. 
    if(!encrypted_password)
        res.send(auth_object);
    else {
        // Compare the clear and encrypted passwords.
        let compare_passwords = new Promise(resolve => {
            Bcrypt.compare(clear_password, encrypted_password, (err, result) => {
                if(result){
                    const token_details = { id: id };
                    auth_object.employee_accessToken = AuthUtil.generateAccessToken(token_details);
                    auth_object.employee_refreshToken = JWT.sign(token_details, process.env.EMPLOYEE_REFRESH_TOKEN_SECRET);    
                    auth_object.employee_authed = true;
                    auth_object.is_admin = is_admin;
                }
                resolve();
            });
        });
        
        await compare_passwords; // Wait for asynchronous compare function to finish.

        res.send(auth_object);
    }
}

/**
*  Makes a request to log a customer out and kills their access token. 
*
*  @param req Request body that holds the customer's id.
*  @param res Response data.
*/
exports.customerLogout = (req, res) => {
    Auth.customerLogout(req.body.id, (data) => {
        res.send(data);
    })
}

/**
*  Makes a request to log an employee out and kills their access token. 
*
*  @param req Request body that holds the employee's id.
*  @param res Response data.
*/
exports.employeeLogout = (req, res) => {
    Auth.employeeLogout(req.body.id, (data) => {
        res.send(data);
    })
}
