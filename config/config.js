/* global process, module, __dirname */

var path = require('path');
var rootPath = path.normalize(__dirname + '/../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: {
            host: "localhost:3306",
            user: "goreservas",
            password: "g0r3s3rv4s",
            database: "goreservas"
        },
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: {
            host: "localhost:3306",
            user: "goreservas",
            password: "g0r3s3rv4s",
            database: "goreservas"
        },
        port: process.env.PORT || 80
    }
};
