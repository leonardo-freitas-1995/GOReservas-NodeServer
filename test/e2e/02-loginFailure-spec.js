var request = require('request');
var settings = require("../protractor-settings");

describe('Página de Login do Go Reservas', function(){
    beforeEach(function(done) {
        request.post({url: settings.host + settings.testAPI.addUser}, function(){
			done();
		});
    });

	it('Não deve logar na página inicial', function(){
		browser.get(settings.host + settings.pages.index);
        element(by.css('[href="#loginModal"]')).click();
		element(by.model('vm.account.email')).sendKeys(settings.testUser.email);
		element(by.model('vm.account.password')).sendKeys(settings.testUser.password + 'wrongpassword');
		element(by.css('[ng-click="vm.login()"]')).click();

		expect(browser.getCurrentUrl())
		.toBe(settings.host + settings.pages.index);
	});

    afterEach(function(done) {
        request.post({url: settings.host + settings.testAPI.removeUser}, function(){
			done();
		});
    });

});
