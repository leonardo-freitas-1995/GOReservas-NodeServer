(function () {
    angular
        .module('goreservas')
        .controller('DashboardController', Controller);
    Controller.$inject = ['businessService', 'reserveService', 'ngIdentity'];
    function Controller(ngBusinessSvc, ngReserveSvc, ngIdentity) {
        var vm = this;

        vm.bestBusiness = [];
        vm.lastReserves = [];

        (function(){
            ngBusinessSvc.getBestBusiness().then(function(response){
                vm.bestBusiness = response.data;
            });
            ngReserveSvc.getLastReserves(ngIdentity.currentUser.id).then(function(response){
                vm.lastReserves = response.data;
            });
        })()
    }
})();
