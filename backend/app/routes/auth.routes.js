module.exports = app => {
    const auth = require("../controllers/auth.controllers.js");
    
    app.post('/api/auth/customer-login', auth.customerLogin);
    app.post('/api/auth/employee-login', auth.employeeLogin);
    //app.post('/api/post/auth/register', auth.register);
    //app.post('/api/post/auth/logout', auth.logout);
    //app.post('/api/post/auth/token', auth.token);
    //app.post('/api/post/auth/reset-database', auth.resetDatabase);
}