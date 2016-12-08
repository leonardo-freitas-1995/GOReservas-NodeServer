(function () {
    angular
        .module('goreservas')
        .controller('ngNavbarCtrl', Controller);
    Controller.$inject = ['$location', 'ngNotifier', 'ngAuth'];
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