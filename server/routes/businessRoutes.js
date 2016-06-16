var auth = require('../../config/auth');

module.exports = function (app) {

    var reserves = app.controllers.reservesController;
    
    app.put('/api/business/', reserves.createBusiness);
    app.delete('/api/business/:id', reserves.deleteBusiness);
    app.get('/api/business/', reserves.getBusiness);
};
