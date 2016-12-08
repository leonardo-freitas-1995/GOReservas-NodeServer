(function () {
    angular
        .module('goreservas')
        .controller('MainController', Controller);
    Controller.$inject = ['$location', 'ngNotifier', 'ngAuth', 'ngUserSvc'];
    function Controller($location, ngNotifier, ngAuth, ngUserSvc) {
        var vm = this;

        vm.newAccount = {};
        vm.account = {};

        vm.register = function(){
            if (!vm.newAccount.name || !vm.newAccount.email || !vm.newAccount.password){
                ngNotifier.error("Preencha todos os campos corretamente.");
                return false;
            }
            ngUserSvc.createUser(vm.newAccount).then(function(response){
                if (response.success){
                    ngNotifier.success("Conta criada com sucesso!");
                    vm.newAccount = {};
                }
                else{
                    if (response.reason === "duplicated"){
                        ngNotifier.error("Este email já possui um cadastro no sistema.");
                    }
                    else{
                        ngNotifier.error("Um erro foi detectado no cadastro de sua conta. Recarregue a página e tente novamente.");
                    }
                }
            },
            function(){
                ngNotifier.error("Desculpe, não foi possível completar esta ação. Recarregue a página e tente novamente.");
            });
        };

        vm.login = function(){
            if (!vm.account.email || !vm.account.password){
                ngNotifier.error("Informe todos os campos para efetuar login");
                return false;
            }
            ngAuth.authenticateUser(vm.account.email, vm.account.password).then(function(success){
                if (success){
                    angular.element("#loginModal").closeModal();
                    $location.path("/dashboard");
                }
                else{
                    ngNotifier.error("As credenciais de acesso não conferem.");
                }
            },
            function(){
                ngNotifier.error("Desculpe, não foi possível completar esta ação. Recarregue a página e tente novamente.");
            });
        };
    }
})();
