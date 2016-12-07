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
		application.login().withCredentials(settings.testUser.email, settings.testUser.password)
			.goToBusinessPage(settings.testBusiness.id);

    });

	afterEach(function() {
		request.post(settings.host + settings.testAPI.removeUser);
		request.post(settings.host + settings.testAPI.removeBusiness);
		request.post(settings.host + settings.testAPI.removeReserve);
	});

});
