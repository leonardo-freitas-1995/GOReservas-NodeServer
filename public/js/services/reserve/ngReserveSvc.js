(function () {
    angular
        .module('goreservas')
        .factory('ngReserveSvc', Service);
    Service.$inject = ['$q', 'ngReserve'];
    function Service($q, ngReserve) {
        return {
            createReserve: function (reserveData) {
                var reserve = new ngReserve(reserveData);

                var dfd = $q.defer();
                reserve.$save().then(
                    function(response){
                        dfd.resolve(response);
                    },
                    function(){
                        dfd.reject({success: false, reason: "error"});
                    }
                );

                return dfd.promise;
            },
        }
    }
})();