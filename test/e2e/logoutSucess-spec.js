describe('Página de Logout do Go Reservas', function(){

	beforeEach(function() {
    request.post("http://localhost:3030/api/test/createTestUser");
    browser.get('http://localhost:3030/index');
    element(by.css('[href="#loginModal"]')).click();
    element(by.model('vm.account.email')).sendKeys('teste@teste');
    element(by.model('vm.account.password')).sendKeys('teste');
    element(by.css('[ng-click="vm.login()"]')).click();
  });

  it('Deve regressar a página inicial', function(){
		browser.get('http://localhost:3030/dashboard');
    element(by.css('[ng-click="navbarVm.logout()"]')).click();
    
		expect(browser.getCurrentUrl())
		.toBe('http://localhost:3030/index');
	});

  afterEach(function() {
    request.post("http://localhost:3030/api/test/cleanTestUser");
  });

});
