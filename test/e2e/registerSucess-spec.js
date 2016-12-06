var request = require('request');

describe('Página de Cadastro no Go Reservas', function(){

  it('Deve registrar uma conta com sucesso', function(){
    //Registro de um novo usuário:
    browser.get('http://localhost:3030/index');
    element(by.model('vm.newAccount.email')).sendKeys('teste@teste');
    element(by.model('vm.newAccount.password')).sendKeys('teste');
    element(by.model('vm.newAccount.name')).sendKeys('Teste');
    element(by.css('[ng-click="vm.register()"]')).click();

    //Login na aplicação:
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
