var request = require('request');
var settings = require("../protractor-settings");
var Application = require('../pages.js');

describe('Página de Estabelecimento do GO Reservas', function(){
	beforeEach(function() {
		request.post(settings.host + settings.testAPI.addUser);
		request.post(settings.host + settings.testAPI.addBusiness);
	});

	it('Deve realizar uma reserva', function(){
		var application = new Application();
		var businessPage = application.login().withCredentials(settings.testUser.email, settings.testUser.password)
			.goToBusinessPage(settings.testBusiness.id);

        browser.executeScript("window.scrollTo(0,0);").then(function () {
            element(by.css('[ng-href="#reserveModal"]')).click();
            browser.executeScript("$('input.display-none').removeClass('display-none');").then(function () {
                element(by.model('vm.newReserve.day')).sendKeys(settings.testReserveNotUsed.day);
                element(by.model('vm.newReserve.hour')).sendKeys(settings.testReserveNotUsed.hour);
                element(by.model('vm.newReserve.quantity')).sendKeys(settings.testReserveNotUsed.quantity);
                element(by.model('vm.newReserve.observation')).sendKeys(settings.testReserveNotUsed.observation);
                element(by.css('[ng-click="vm.createReserve()"]')).click();
                browser.wait(protractor.ExpectedConditions.stalenessOf ($('.lean-overlay')), 10000);
                businessPage.backToDashboard();
                expect(element(by.css('[name="reserveCard"]')).isPresent())
                    .toBe(true);
            })



        })


	});

	afterEach(function() {
		request.post(settings.host + settings.testAPI.removeUser);
		request.post(settings.host + settings.testAPI.removeBusiness);
		request.post(settings.host + settings.testAPI.removeReserve);
	});

});
