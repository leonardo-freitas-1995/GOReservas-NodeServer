var auth = require('../../config/auth');

module.exports = function (app) {

    var reserves = app.controllers.reservesController;
    
    app.put('/api/reserve/', reserves.createReserve);
    app.delete('/api/reserve/:id', reserves.cancelReserve);
    app.put('/api/reserve/:id', reserves.confirmReserve);
};
