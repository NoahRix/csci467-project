const Auth = require("../models/auth.models.js");
const AuthUtil = require('../utils/auth.js');
const Bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

/**
*  Makes a request to log the employee or customer in. Successful attempt will respond
*  an access token.
*
*  @param req Request body that holds the employee's or customer's id and password.
*  @param res Response data.
*/
exports.userLogin = async (req, res) => {
    let clear_password = req.body.password; 
    let is_customer = req.body.is_customer;
    let id = req.body.id;
    let encrypted_password = null;
    let is_admin = null;

    // Search the database for the employee's or customer's encrypted password and/or 
    // role based on the id.
    get_user_info = new Promise(resolve => {
        if(is_customer){
            Auth.getCustomerPassword(id, (data) => {
                if(data[0]){  // If there is a resulting row
                    encrypted_password = data[0].password;  // Get the password
                }
                resolve();
            });
        }else{
            Auth.getEmployeePasswordAndRole(id, (data) => {
                if(data[0]){  // If there is a resulting row
                    encrypted_password = data[0].password;  // Get the password
                    is_admin = data[0].is_admin;            // Get the role
                }
                resolve();
            });    
        }
    });

    await get_user_info;    // Wait for the user info to complete.

    // Build a default authorization object for the frontend.
    let auth_object = {
        is_admin: null,
        is_authed: null,
        access_token: null,
        refresh_token: null
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
                    const token_details = { id: id, is_customer: is_customer};
                    auth_object.access_token = AuthUtil.generateAccessToken(token_details);
                    auth_object.refresh_token = JWT.sign(token_details, is_customer ? process.env.CUSTOMER_REFRESH_TOKEN_SECRET : process.env.EMPLOYEE_REFRESH_TOKEN_SECRET);    
                    auth_object.is_authed = true;
                    auth_object.is_admin = is_customer ? false : is_admin === 1;
                }
                resolve();
            });
        });
        
        await compare_passwords; // Wait for asynchronous compare function to finish.

        if(is_customer)
            Auth.setCustomerRefreshToken({refresh_token: auth_object.refresh_token, id: id}, () => {});
        else
            Auth.setEmployeeRefreshToken({refresh_token: auth_object.refresh_token, id: id}, () => {});

        res.send(auth_object);
    }
}

/**
*  Makes a request to log an employee or customer out and kills their access token. 
*
*  @param req Request body that holds the employee's or customer's id.
*  @param res Response data.
*/
exports.userLogout = (req, res) => {
    if(req.body.is_customer)
        Auth.customerLogout(req.body.id, (data) => {res.send(data);});
    else
        Auth.employeeLogout(req.body.id, (data) => {res.send(data);});
}

/**
*  Makes a request to refresh the employee's or customer's access token by providing 
*  a valid refresh token. 
*
*  @param req Request body that holds the employee's or customer's refresh token.
*  @param res Response data.
*/
exports.refreshUserAccessToken = async (req, res) => {
    let refresh_token = null;
    let is_customer = req.body.is_customer;

    let get_refresh_token = new Promise(resolve => {
        if(is_customer){
            Auth.getCustomerRefreshToken(req.body.id, (data) => {
                if(!data[0]){
                    res.send({error: "Customer does not exist."});
                    return;
                }else
                    refresh_token = data[0].refresh_token;
                resolve();
            });    
        }else{
            Auth.getEmployeeRefreshToken(req.body.id, (data) => {
                if(!data[0]){
                    res.send({error: "Employee does not exist."});
                    return;
                }else
                    refresh_token = data[0].refresh_token;
                resolve();
            });
            }
    });

    await get_refresh_token;

    if(!refresh_token)
        res.send({error: "Refresh token is null."});
    else {
        let access_token = null;
        JWT.verify(refresh_token, is_customer ? process.env.CUSTOMER_REFRESH_TOKEN_SECRET : process.env.EMPLOYEE_REFRESH_TOKEN_SECRET, (err, user_info) => {
            access_token = AuthUtil.generateAccessToken({id: user_info.id, is_customer: is_customer});
        });
        res.send({access_token: access_token})
    }
}
