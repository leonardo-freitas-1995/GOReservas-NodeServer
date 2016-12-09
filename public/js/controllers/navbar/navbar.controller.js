(function () {
    angular
        .module('goreservas')
        .controller('NavbarController', Controller);
    Controller.$inject = ['$location', 'notifier', 'auth'];
    function Controller($location, notifier, auth) {
        var vm = this;

        vm.logout = function(){
            auth.logoutUser().then(function(){
                notifier.success("Sessão encerrada com sucesso.");
                $location.path("/index");
            });
        };
    }
})();
