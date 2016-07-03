module.exports = function (app) {
    app.get('/partials/*', function (req, res) {
        res.render('../../public/partials/' + req.params[0]);
    });

    app.get('/templates/*', function (req, res) {
        res.render('../../public/js/directives/templates/' + req.params[0]);
    });
};
