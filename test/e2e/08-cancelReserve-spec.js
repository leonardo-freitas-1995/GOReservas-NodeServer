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
			;

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
