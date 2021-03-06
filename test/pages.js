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
                browser.wait(protractor.ExpectedConditions.stalenessOf ($('.lean-overlay')), 10000);
                return new DashboardPage();
            };
        };

        var DashboardPage = function() {
            var dashboardPage = this;
            dashboardPage.goToSearch = function(){
                element(by.css('[href="/search-business"]')).click();
                return new SearchPage();
            };

            dashboardPage.goToBusinessPage = function(id){
                browser.setLocation(settings.pages.business + "?id=" + id);
                return new BusinessPage();
            };

            dashboardPage.goToReservePage = function(id){
                browser.setLocation(settings.pages.reserve + "?id=" + id);
                return new ReservePage();
            };
        };

        var SearchPage = function(){
            var searchPage = this;
            searchPage.searchBusiness = function(name){
                element(by.model('vm.search.term')).sendKeys(name);
                element(by.css('[ng-click="vm.makeSearch()"]')).click();
                browser.wait(protractor.ExpectedConditions.presenceOf($('[ng-if="vm.loaded && vm.businessArray.length"]')), 10000);
            };

            searchPage.backToDashboard = backToDashboard;
        };

        var BusinessPage = function(){
            var businessPage = this;

            businessPage.backToDashboard = backToDashboard;
        };

        var ReservePage = function(){
            var reservePage = this;

            reservePage.backToDashboard = backToDashboard;
        };

        function backToDashboard() {
            browser.setLocation(settings.pages.dashboard);
            return new DashboardPage();
        }
    };

    module.exports = function() {
        return new Application();
    };
}());