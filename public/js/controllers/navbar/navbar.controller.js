(function () {
    angular
        .module('goreservas')
        .controller('NavbarController', Controller);
    Controller.$inject = ['$location', 'notifierService', 'authService'];
    function Controller($location, ngNotifier, ngAuth) {
        var vm = this;

        vm.logout = function(){
            ngAuth.logoutUser().then(function(){
                ngNotifier.success("Sessão encerrada com sucesso.");
                $location.path("/index");
            });
        };
    }
})();
