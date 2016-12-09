var auth = require('../../config/auth');

module.exports = function (app) {

    var tests = app.controllers.testController;

    app.post('/api/test/createTestUser', tests.createTestAccount);
    app.post('/api/test/cleanTestUser', tests.removeTestAccount);
    app.post('/api/test/createTestBusiness', tests.createTestBusiness);
    app.post('/api/test/cleanTestBusiness', tests.removeTestBusiness);
    app.post('/api/test/createTestReserve', tests.createTestReserve);
    app.post('/api/test/createUsedTestReserve', tests.createUsedTestReserve);
    app.post('/api/test/cleanTestReserve', tests.removeTestReserve);

};
