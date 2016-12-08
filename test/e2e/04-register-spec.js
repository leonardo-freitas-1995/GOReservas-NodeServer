var request = require('request');
var settings = require("../protractor-settings");
var Application = require('../pages.js');

describe('Página de Cadastro no Go Reservas', function(){

  it('Deve registrar uma conta com sucesso', function(){
    browser.get(settings.host + settings.pages.index);
    element(by.model('vm.newAccount.email')).sendKeys(settings.testUser.email);
    element(by.model('vm.newAccount.password')).sendKeys(settings.testUser.password);
    element(by.model('vm.newAccount.name')).sendKeys(settings.testUser.name);
    element(by.css('[ng-click="vm.register()"]')).click();

    var application = new Application();
    application.login().withCredentials(settings.testUser.email, settings.testUser.password);
    
    expect(browser.getCurrentUrl())
		.toBe(settings.host + settings.pages.dashboard);
  });

  afterEach(function() {
    request.post(settings.host + settings.testAPI.removeUser);
  });
});
