const JWT = require('jsonwebtoken');
require('dotenv').config();

// True = to test APIs on backend. False = to function normally. 
let debug = true;

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, req.body.is_customer ? process.env.CUSTOMER_ACCESS_TOKEN_SECRET : process.env.EMPLOYEE_ACCESS_TOKEN_SECRET, (err) => {
        if (err) return res.sendStatus(403);
        next();
    })
}

exports.generateAccessToken = (token_info) => {
    console.log("ID: " + token_info.id);
    return JWT.sign({id: token_info.id}, token_info.is_customer ? process.env.CUSTOMER_ACCESS_TOKEN_SECRET : process.env.EMPLOYEE_ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
}

exports.middleware = (debug ? (req, res, next) => { next(); } : this.authenticateToken);

