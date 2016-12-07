'use strict';

var settings = require("./protractor-settings");

(function() {
    var Application = function() {
        var app = this;
        browser.get(settings.host + settings.pages.index);

        app.login = function() {
            element(by.css('[href="#loginModal"]')).click();
            return new LoginPage();
        };

        var LoginPage = function() {
            var loginPage = this;
            loginPage.withCredentials = function(login, password) {
                element(by.model('vm.account.email')).sendKeys(login);
                element(by.model('vm.account.password')).sendKeys(password);
                element(by.css('[ng-click="vm.login()"]')).click();
                return new DashboardPage();
            };
        };

        var DashboardPage = function() {
            var welcomePage = this;
        };
    };

    module.exports = function() {
        return new Application();
    };
}());