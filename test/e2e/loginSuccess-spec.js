describe('Página de Login do Go Reservas', function(){

	beforeEach(function(){
		browser.get('http://localhost:3030/index');
	});

	it('Deve logar na página inicial', function(){
		
		element(by.model('vm.account.email')).sendKeys('teste@teste');
		element(by.model('vm.account.password')).sendKeys('teste');
		element(by.bycss('[ng-click="vm.login()"]')).click();

		expect(browser.getCurrentUrl())
		.toBe('http://localhost:3030/dashboard');
	});

});
