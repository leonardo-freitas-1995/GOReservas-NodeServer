(function () {
    angular
        .module('goreservas')
        .controller('ngReserveCtrl', Controller);
    Controller.$inject = ['$sce', '$location', 'ngReserveSvc', 'ngIdentity', 'ngNotifier'];
    function Controller($sce, $location, ngReserveSvc, ngIdentity, ngNotifier) {
        var vm = this;

        vm.reserve = null;

        vm.makeMapsLink = function(business){
            return $sce.trustAsResourceUrl("https://maps.google.com/maps?q=" + business.latitude + "," + business.longitude + "&hl=es;z=14&output=embed");
        };

        vm.isBeforeReserve = function(date){
            var dateA = new Date(date);
            var dateB = new Date();
            return (dateB.getTime() < dateA.getTime());
        };

        vm.cancelReserve = function(){
            ngReserveSvc.cancelReserve(vm.reserve.id, vm.reserve.date).then(function(response){
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

        (function(){
            var id = $location.search().id;
            if (id && id !== ""){
                ngReserveSvc.getOneReserve(ngIdentity.currentUser.id, id).then(function(response){
                        vm.reserve = response.data;
                        console.log(response.data);
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