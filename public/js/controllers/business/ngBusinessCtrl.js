(function () {
    angular
        .module('goreservas')
        .controller('ngBusinessCtrl', Controller);
    Controller.$inject = ['$timeout', '$sce', '$location', 'ngBusinessSvc', 'ngNotifier'];
    function Controller($timeout, $sce, $location, ngBusinessSvc, ngNotifier) {
        var vm = this;

        vm.business = null;

        vm.getTotalReserve = function(){
            var total = 0;
            if (vm.business){
                total += vm.business.pricePerReserve;
                if (vm.newReserve.quantity){
                    total += vm.business.pricePerPerson * vm.newReserve.quantity;
                }
            }
            return total;
        };

        vm.makeMapsLink = function(business){
            return $sce.trustAsResourceUrl("https://maps.google.com/maps?q=" + business.latitude + "," + business.longitude + "&hl=es;z=14&output=embed");
        };

        vm.initClockpicker = function(){
            $timeout(function(){
                $('.timepicker').pickatime({
                    autoclose: true,
                    twelvehour: false
                });
            });
        };

        vm.createReserve = function(){
            if (!vm.newReserve.day || !vm.newReserve.hour || !vm.newReserve.quantity){
                ngNotifier.error("Preencha os campos corretament");
                return false;
            }
            vm.newReserve.date = new Date(vm.newReserve.day + " " + vm.newReserve.hour);
            vm.newReserve.total = vm.getTotalReserve();
        };

        vm.newReserve = {
            total: 0
        };

        (function(){
            var id = $location.search().id;
            if (id && id !== ""){
                ngBusinessSvc.getBusiness(id).then(function(response){
                        vm.business = response.data;
                        vm.loaded = true;
                    },
                    function(){
                        vm.loaded = true;
                    });
            }
            else{
                vm.loaded = true;
            }
        })()
    }
})();