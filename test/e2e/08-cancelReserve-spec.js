var request = require('request');
var settings = require("../protractor-settings");
var Application = require('../pages.js');

describe('Página de Estabelecimento do GO Reservas', function(){
	beforeEach(function(done) {
		request.post({url: settings.host + settings.testAPI.addUser}, function () {
			request.post({url: settings.host + settings.testAPI.addBusiness}, function () {
				request.post({url: settings.host + settings.testAPI.addReserve}, function(){
					done();
				});
			});
		});
	});

	it('Deve realizar uma reserva', function(){
		var application = new Application();
		var reservePage = application.login().withCredentials(settings.testUser.email, settings.testUser.password)
            .goToReservePage(settings.testReserve.id);

        browser.executeScript("window.scrollTo(0,0);").then(function () {
            element(by.css('[ng-href="#cancelModal"]')).click();
            element(by.css('[ng-click="vm.cancelReserve()"]')).click();
            reservePage.backToDashboard();
            browser.wait(protractor.ExpectedConditions.stalenessOf ($('.lean-overlay')), 10000);
            expect(element(by.css('[name="reserveCard"]')).isPresent())
                .toBe(false);
        });


	});

	afterEach(function(done) {
		request.post({url: settings.host + settings.testAPI.removeUser}, function () {
			request.post({url: settings.host + settings.testAPI.removeBusiness}, function () {
                done();
			});
		});
	});

});
