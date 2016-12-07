var request = require('request');
var settings = require("../protractor-settings");

describe('Página de Login do Go Reservas', function(){
	beforeEach(function() {
		request.post(settings.host + settings.testAPI.addUser);
	});

	it('Deve logar na página inicial', function(){
		browser.get(settings.host + settings.pages.index);
		element(by.css('[href="#loginModal"]')).click();
		element(by.model('vm.account.email')).sendKeys(settings.testUser.email);
		element(by.model('vm.account.password')).sendKeys(settings.testUser.password);
		element(by.css('[ng-click="vm.login()"]')).click();

		expect(browser.getCurrentUrl())
		.toBe(settings.host + settings.pages.dashboard);
	});

	afterEach(function() {
		request.post(settings.host + settings.testAPI.removeUser);
	});

});
