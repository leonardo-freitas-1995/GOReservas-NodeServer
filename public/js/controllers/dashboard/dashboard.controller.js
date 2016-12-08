(function () {
    angular
        .module('goreservas')
        .controller('DashboardController', Controller);
    Controller.$inject = ['businessService', 'reserveService', 'ngIdentity'];
    function Controller(businessService, reserveService, ngIdentity) {
        var vm = this;

        vm.bestBusiness = [];
        vm.lastReserves = [];

        (function(){
            businessService.getBestBusiness().then(function(response){
                vm.bestBusiness = response.data;
            });
            reserveService.getLastReserves(ngIdentity.currentUser.id).then(function(response){
                vm.lastReserves = response.data;
            });
        })()
    }
})();
