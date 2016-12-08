var request = require('request');
var settings = require("../protractor-settings");
var Application = require('../pages.js');

describe('Página de Busca do GO Reservas', function(){
	beforeEach(function(done) {
		request.post({url: settings.host + settings.testAPI.addUser}, function(){
			request.post({url: settings.host + settings.testAPI.addBusiness}, function(){
				done();
			});
		});
	});

	it('Deve procurar um estabelecimento', function(){
		var application = new Application();
		var searchPage = application.login().withCredentials(settings.testUser.email, settings.testUser.password).goToSearch();

		searchPage.searchBusiness(settings.testBusiness.name);

		var businessCard = '[ng-href="/' + settings.pages.business + '?id=' + settings.testBusiness.id + '"]';
		expect(element(by.css(businessCard)).isPresent())
			.toBe(true);
	});

	afterEach(function(done) {
		request.post({url: settings.host + settings.testAPI.removeUser}, function(){
			request.post({url: settings.host + settings.testAPI.removeBusiness}, function(){
				done();
			});
		});
	});

});
