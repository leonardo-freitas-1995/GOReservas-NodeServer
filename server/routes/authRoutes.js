var auth = require('../../config/auth');

module.exports = function (app) {

    var users = app.controllers.userController;

    app.put('/api/users/', users.authenticateUser);
    app.put('/api/users/', users.createAccount);
    app.put('/api/users/:email', users.updateUser);
    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });
};
