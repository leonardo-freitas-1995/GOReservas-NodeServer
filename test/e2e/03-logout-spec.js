var request = require('request');
var settings = require("../protractor-settings");
var Application = require('../pages.js');

describe('Página de Logout do Go Reservas', function(){

    beforeEach(function(done) {
        request.post({url: settings.host + settings.testAPI.addUser}, function(){
            done();
        });
    });

    it('Deve regressar a página inicial', function(){
        var application = new Application();
        application.login().withCredentials(settings.testUser.email, settings.testUser.password);

        element(by.css('[data-activates="dropdownUser"]')).click();
        browser.wait(protractor.ExpectedConditions.visibilityOf($('[ng-click="navbarVm.logout()"]')), 5000);
        element(by.css('[ng-click="navbarVm.logout()"]')).click();

        expect(browser.getCurrentUrl())
            .toBe(settings.host + settings.pages.afterLogout);
    });

    afterEach(function(done) {
        request.post({url: settings.host + settings.testAPI.removeUser}, function(){
            done();
        });
    });

});
