var request = require('request');
var settings = require("../protractor-settings");
var Application = require('../pages.js');

describe('Página de Busca do GO Reservas', function(){
	beforeEach(function() {
		request.post(settings.host + settings.testAPI.addUser);
		request.post(settings.host + settings.testAPI.addBusiness);
	});

	it('Deve procurar um estabelecimento', function(){
		var application = new Application();
		var searchPage = application.login().withCredentials('teste@teste', 'teste').goToSearch();

		searchPage.searchBusiness(settings.testBusiness.name);

		var businessCard = '[ng-href="/' + settings.pages.business + '?id=' + settings.testBusiness.id + '"]';
		expect(element(by.css(businessCard)).isPresent())
			.toBe(true);
	});

	afterEach(function() {
		request.post(settings.host + settings.testAPI.removeUser);
		request.post(settings.host + settings.testAPI.removeBusiness);
	});

});
