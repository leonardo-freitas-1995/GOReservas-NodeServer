(function () {
    angular
        .module('goreservas')
        .controller('NavbarController', Controller);
    Controller.$inject = ['$location', 'notifier', 'authService'];
    function Controller($location, notifier, authService) {
        var vm = this;

        vm.logout = function(){
            authService.logoutUser().then(function(){
                notifier.success("Sessão encerrada com sucesso.");
                $location.path("/index");
            });
        };
    }
})();
