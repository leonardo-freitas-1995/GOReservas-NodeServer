(function () {
    angular
        .module('goreservas')
        .controller('ngBusinessCtrl', Controller);
    Controller.$inject = ['$timeout', '$sce', '$location', 'ngBusinessSvc', 'ngReserveSvc', 'ngNotifier', 'ngIdentity'];
    function Controller($timeout, $sce, $location, ngBusinessSvc, ngReserveSvc, ngNotifier, ngIdentity) {
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
                ngNotifier.error("Preencha os campos corretamente");
                return false;
            }
            vm.newReserve.date = vm.newReserve.day.split("/").reverse().join("-") + " " + vm.newReserve.hour + ":00";
            vm.newReserve.totalValue = vm.getTotalReserve();
            vm.newReserve.business = parseInt($location.search().id);
            vm.newReserve.client = ngIdentity.currentUser.id;
            ngReserveSvc.createReserve(vm.newReserve).then(function(response){
                if (response.success){
                    if (response.confirmed){
                        ngNotifier.success("Sua reserva foi criada e confirmada com sucesso.");
                        angular.element("#reserveModal").closeModal();
                    }
                    else{
                        ngNotifier.success("Sua reserva foi criada, e está pendente sujeita a confirmação.");
                        angular.element("#reserveModal").closeModal();
                    }
                }
                else if (response.reason === "ahead of time"){
                    ngNotifier.error("É preciso fazer reservas com uma hora de antedecências.");
                }
                else{
                    ngNotifier.error("Não foi possível completar o pedido.");
                }
            },
            function(){
                ngNotifier.error("Não foi possível completar o pedido.");
            });
        };

        vm.newReserve = {
            totalValue: 0
        };

        (function(){
            var id = $location.search().id;
            if (id && id != undefined){
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
