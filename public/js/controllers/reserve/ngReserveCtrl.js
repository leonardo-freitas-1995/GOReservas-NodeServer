(function () {
    angular
        .module('goreservas')
        .controller('ngReserveCtrl', Controller);
    Controller.$inject = ['$sce', '$location', 'ngReserveSvc', 'ngIdentity'];
    function Controller($sce, $location, ngReserveSvc, ngIdentity) {
        var vm = this;

        vm.reserve = null;

        vm.makeMapsLink = function(business){
            return $sce.trustAsResourceUrl("https://maps.google.com/maps?q=" + business.latitude + "," + business.longitude + "&hl=es;z=14&output=embed");
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