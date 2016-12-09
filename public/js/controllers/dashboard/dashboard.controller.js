(function () {
    angular
        .module('goreservas')
        .controller('DashboardController', Controller);
    Controller.$inject = ['businessService', 'reserveService', 'identity'];
    function Controller(businessService, reserveService, identity) {
        var vm = this;

        vm.bestBusiness = [];
        vm.lastReserves = [];

        (function(){
            businessService.getBestBusiness().then(function(response){
                vm.bestBusiness = response.data;
            });
            reserveService.getLastReserves(identity.currentUser.id).then(function(response){
                vm.lastReserves = response.data;
            });
        })()
    }
})();
