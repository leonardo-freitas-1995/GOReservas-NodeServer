var jsORM = require('js-hibernate');

module.exports = function (config) {
    return jsORM.session(config.db);
};
