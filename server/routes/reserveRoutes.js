var auth = require('../../config/auth');

module.exports = function (app) {

    var reserves = app.controllers.reservesController;
    
    app.post('/api/reserve/', reserves.createReserve);
    app.delete('/api/reserve/:id', reserves.cancelReserve);
    app.get('/api/reserve/:id', reserves.getReserves);
    app.search('/api/reserve/:id', reserves.getLastReserves);
};
