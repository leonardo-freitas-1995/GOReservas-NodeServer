module.exports = function (app) {

    app.all("/api/*", function (req, res) {
        res.send(404);
    });

/*    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });*/
};
