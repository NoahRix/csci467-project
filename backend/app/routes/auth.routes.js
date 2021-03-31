module.exports = app => {
    const auth = require("../controllers/auth.controllers.js");
    
    app.post('/api/auth/user-login', auth.userLogin);
    app.post('/api/auth/user-logout', auth.userLogout);
    app.post('/api/auth/refresh-user-access-token', auth.refreshUserAccessToken);
    //app.post('/api/post/auth/register', auth.register);
}