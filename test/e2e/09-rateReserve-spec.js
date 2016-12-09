var request = require('request');
var settings = require("../protractor-settings");
var Application = require('../pages.js');

describe('Página de Estabelecimento do GO Reservas', function(){
	beforeEach(function(done) {
		request.post({url: settings.host + settings.testAPI.addUser}, function () {
			request.post({url: settings.host + settings.testAPI.addBusiness}, function () {
				request.post({url: settings.host + settings.testAPI.addUsedReserve}, function(){
					done();
				});
			});
		});
	});

	it('Deve dar nota uma reserva', function(){
		var application = new Application();
		var reservePage = application.login().withCredentials(settings.testUser.email, settings.testUser.password)
            .goToReservePage(settings.testReserve.id);

		element(by.css('[id="rate-4-star"]')).click();
		element(by.css('[ng-click="vm.rateReserve()"]')).click();
		browser.wait(protractor.ExpectedConditions.presenceOf ($('[ng-if="vm.reserve.rated"]')), 5000);
		expect(element(by.css('[ng-click="vm.rateReserve()"]')).isPresent())
			.toBe(false);


	});

	afterEach(function(done) {
		request.post({url: settings.host + settings.testAPI.removeUser}, function () {
			request.post({url: settings.host + settings.testAPI.removeBusiness}, function () {
				request.post({url: settings.host + settings.testAPI.removeReserve}, function () {
					done();
				});
			});
		});
	});

});
