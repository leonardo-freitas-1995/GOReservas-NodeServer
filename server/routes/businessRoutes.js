var auth = require('../../config/auth');

module.exports = function (app) {

    var business = app.controllers.businessController;

    app.get('/api/business/', business.getAllBusiness);
    app.get('/api/business/:id', business.getBusiness);
    app.get('/api/business/:client/:search/:filter', business.searchBusiness);
};
