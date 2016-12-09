(function () {
    angular
        .module('goreservas')
        .controller('ReserveController', Controller);
    Controller.$inject = ['$sce', '$location', 'reserveService', 'identityService', 'notifierService'];
    function Controller($sce, $location, reserveService, ngIdentity, ngNotifier) {
        var vm = this;

        vm.reserve = null;

        vm.rating = 0;

        vm.makeMapsLink = function(business){
            return $sce.trustAsResourceUrl("https://maps.google.com/maps?q=" + business.latitude + "," + business.longitude + "&hl=es;z=14&output=embed");
        };

        vm.isBeforeReserve = function(date){
            var dateA = new Date(date);
            var dateB = new Date();
            return (dateB.getTime() < dateA.getTime());
        };

        vm.cancelReserve = function(){
            reserveService.cancelReserve(vm.reserve.id, new Date(vm.reserve.date).getTime()).then(function(response){
                    if (response.success){
                        ngNotifier.success("Reserva cancelada com sucesso");
                        angular.element("#cancelModal").closeModal();
                        $location.path("/dashboard").search({});
                    }
                    else if (response.reason === "ahead of time"){
                        ngNotifier.error("Não é possível cancelar uma reserva que já passou de sua data.");
                    }
                    else{
                        ngNotifier.error("Não foi possível completar esta ação.");
                    }
                },
                function(){
                    ngNotifier.error("Não foi possível completar esta ação");
                });
        };

        vm.rateReserve = function(){
            reserveService.rateReserve(vm.reserve.id, vm.reserve.business.id, vm.rating).then(function(response){
                    if (response.success){
                        ngNotifier.success("Reserva avaliada com sucesso");
                        vm.reserve.rated = true;
                    }
                    else{
                        ngNotifier.error("Não foi possível completar esta ação.");
                    }
                },
                function(){
                    ngNotifier.error("Não foi possível completar esta ação");
                });
        };

        (function(){
            var id = $location.search().id;
            if (id){
                reserveService.getOneReserve(ngIdentity.currentUser.id, id).then(function(response){
                        vm.reserve = response.data;
                        if (vm.reserve.rated)
                            vm.rating = vm.reserve.rating;
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
