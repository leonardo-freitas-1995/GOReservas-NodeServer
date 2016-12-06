describe('Página de Login do Go Reservas', function(){

	it('Deve logar na página inicial', function(){
		browser.get('http://localhost:3030/index');
		element(by.model('vm.account.email')).sendKeys('teste@teste');
		element(by.model('vm.account.password')).sendKeys('teste');
		element(by.bycss('[ng-click="vm.login()"]')).click();

		expect(browser.getCurrentUrl())
		.toBe('http://localhost:3030/dashboard');
	});

});
