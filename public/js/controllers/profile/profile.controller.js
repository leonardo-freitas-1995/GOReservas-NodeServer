(function () {
    angular
        .module('goreservas')
        .controller('ProfileController', Controller);
    Controller.$inject = ['$location', 'ngIdentity', 'ngUserSvc', 'ngNotifier'];
    function Controller($location, ngIdentity, ngUserSvc, ngNotifier) {
        var vm = this;

        vm.account = {
            name: ngIdentity.currentUser.name,
            password: "",
            repeatPassword: ""
        }

        vm.updateUser = function(){
            if (vm.account.password !== "" && vm.account.password !== vm.account.repeatPassword){
                ngNotifier.error("Repita a senha exatamente igual a primeira.");
                return false;
            }
            var newName = vm.account.name;
            ngUserSvc.updateUser(ngIdentity.currentUser.email, vm.account).then(function(response){
                if (response.success){
                    ngNotifier.success("Dados atualizados com sucessos!");
                    ngIdentity.currentUser.name = newName;
                    $location.path("/dashboard");
                }
                else{
                    ngNotifier.error("Ocorreu um erro. Atualize a página e tente novamente");
                }
            },
            function(){
                ngNotifier.error("Ocorreu um erro. Atualize a página e tente novamente");
            });
        }
    }
})();
