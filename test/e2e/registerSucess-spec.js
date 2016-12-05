describe('Página de Cadastro no Go Reservas', function(){

  beforeEach(function(){
    browser.get('http://localhost:3030/index');
  });

  it('Deve registrar uma conta com sucesso', function(){
    
    element(by.model('vm.newAccount.email')).sendKeys('teste@teste');
    element(by.model('vm.newAccount.password')).sendKeys('teste');
    element(by.model('vm.newAccount.name')).sendKeys('Teste');
    element(by.bycss('[ng-click="vm.register()"]')).click();

    expect(browser.getCurrentUrl())
    .toBe(true);
  });
});
