var auth = require('../../config/auth');

module.exports = function (app) {

    var tests = app.controllers.testController;

    app.post('/api/test/createTestUser', tests.createTestAccount);
    app.post('/api/test/cleanTestUser', tests.removeTestAccount);

};
