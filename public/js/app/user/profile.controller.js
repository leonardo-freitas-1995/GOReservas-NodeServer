(function () {
    angular
        .module('goreservas')
        .controller('ProfileController', Controller);
    Controller.$inject = ['$location', 'identity', 'userService', 'notifier'];
    function Controller($location, identity, userService, notifier) {
        var vm = this;

        vm.account = {
            name: identity.currentUser.name,
            password: "",
            repeatPassword: ""
        };

        vm.updateUser = function(){
            if (vm.account.password !== "" && vm.account.password !== vm.account.repeatPassword){
                notifier.error("Repita a senha exatamente igual a primeira.");
                return false;
            }
            var newName = vm.account.name;
            userService.updateUser(identity.currentUser.email, vm.account).then(function(response){
                if (response.success){
                    notifier.success("Dados atualizados com sucessos!");
                    identity.currentUser.name = newName;
                    $location.path("/dashboard");
                }
                else{
                    notifier.error("Ocorreu um erro. Atualize a página e tente novamente");
                }
            },
            function(){
                notifier.error("Ocorreu um erro. Atualize a página e tente novamente");
            });
        }
    }
})();
