var jsORM = require('js-hibernate');

module.exports = function (app, config) {
    app.db = jsORM.session(config.db);
};
