(function () {
    angular
        .module('goreservas')
        .controller('MainController', Controller);
    Controller.$inject = ['$location', 'notifier', 'auth', 'userService'];
    function Controller($location, notifier, auth, userService) {
        var vm = this;

        vm.newAccount = {};
        vm.account = {};

        vm.register = function(){
            if (!vm.newAccount.name || !vm.newAccount.email || !vm.newAccount.password){
                notifier.error("Preencha todos os campos corretamente.");
                return false;
            }
            userService.createUser(vm.newAccount).then(function(response){
                if (response.success){
                    notifier.success("Conta criada com sucesso!");
                    vm.newAccount = {};
                }
                else{
                    if (response.reason === "duplicated"){
                        notifier.error("Este email já possui um cadastro no sistema.");
                    }
                    else{
                        notifier.error("Um erro foi detectado no cadastro de sua conta. Recarregue a página e tente novamente.");
                    }
                }
            },
            function(){
                notifier.error("Desculpe, não foi possível completar esta ação. Recarregue a página e tente novamente.");
            });
        };

        vm.login = function(){
            if (!vm.account.email || !vm.account.password){
                notifier.error("Informe todos os campos para efetuar login");
                return false;
            }
            auth.authenticateUser(vm.account.email, vm.account.password).then(function(success){
                if (success){
                    angular.element("#loginModal").closeModal();
                    $location.path("/dashboard");
                }
                else{
                    notifier.error("As credenciais de acesso não conferem.");
                }
            },
            function(){
                notifier.error("Desculpe, não foi possível completar esta ação. Recarregue a página e tente novamente.");
            });
        };
    }
})();
