var request = require('request');
var settings = require("../protractor-settings");
var Application = require('../pages.js');

describe('Página de Estabelecimento do GO Reservas', function(){
	beforeEach(function(done) {
		request.post({url: settings.host + settings.testAPI.addUser}, function(){
			request.post({url: settings.host + settings.testAPI.addBusiness}, function(){
				done();
			});
		});
	});

	it('Deve realizar uma reserva', function(){
		var application = new Application();
		var businessPage = application.login().withCredentials(settings.testUser.email, settings.testUser.password)
			.goToBusinessPage(settings.testBusiness.id);

        browser.executeScript("window.scrollTo(0,0);").then(function () {
            element(by.css('[ng-href="#reserveModal"]')).click();
            browser.executeScript("$('input.display-none').removeClass('display-none');").then(function () {
                element(by.model('vm.newReserve.day')).sendKeys(settings.testReserve.day);
                element(by.model('vm.newReserve.hour')).sendKeys(settings.testReserve.hour);
                element(by.model('vm.newReserve.quantity')).sendKeys(settings.testBusiness.maxPerReserve + 1);
                element(by.model('vm.newReserve.observation')).sendKeys(settings.testReserve.observation);
                element(by.css('[ng-click="vm.createReserve()"]')).click();
                element(by.css('.modal-close')).click();
                businessPage.backToDashboard();
				browser.wait(protractor.ExpectedConditions.stalenessOf ($('.lean-overlay')), 10000);
                expect(element(by.css('[name="reserveCard"]')).isPresent())
                    .toBe(false);
            });
        });
	});

	afterEach(function(done) {
		request.post({url: settings.host + settings.testAPI.removeUser}, function () {
			request.post({url: settings.host + settings.testAPI.removeBusiness}, function () {
				request.post({url: settings.host + settings.testAPI.removeReserve}, function(){
					done();
				});
			});
		});
	});

});
