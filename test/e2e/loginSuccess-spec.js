var request = require('request');

describe('Página de Login do Go Reservas', function(){
	beforeEach(function() {
		request.post("http://localhost:3030/api/test/createTestUser");
	});

	it('Deve logar na página inicial', function(){
		browser.get('http://localhost:3030/index');
		element(by.css('[href="#loginModal"]')).click();
		element(by.model('vm.account.email')).sendKeys('teste@teste');
		element(by.model('vm.account.password')).sendKeys('teste');
		element(by.css('[ng-click="vm.login()"]')).click();

		expect(browser.getCurrentUrl())
		.toBe('http://localhost:3030/dashboard');
	});

	afterEach(function() {
		request.post("http://localhost:3030/api/test/cleanTestUser");
	});

});
