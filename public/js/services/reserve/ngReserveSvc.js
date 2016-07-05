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
            getReserves: function(id){
                var reserve = new ngReserve();

                var dfd = $q.defer();
                reserve.$get({id: id}).then(
                    function(response){
                        dfd.resolve(response);
                    },
                    function(){
                        dfd.reject({success: false, reason: "error"});
                    }
                );

                return dfd.promise;
            },
            getLastReserves: function(id){
                var reserve = new ngReserve();

                var dfd = $q.defer();
                reserve.$search({id: id}).then(
                    function(response){
                        dfd.resolve(response);
                    },
                    function(){
                        dfd.reject({success: false, reason: "error"});
                    }
                );

                return dfd.promise;
            },
            getOneReserve: function(client, id){
                var reserve = new ngReserve();

                var dfd = $q.defer();
                reserve.$get({client: client, id: id}).then(
                    function(response){
                        dfd.resolve(response);
                    },
                    function(){
                        dfd.reject({success: false, reason: "error"});
                    }
                );

                return dfd.promise;
            },
            cancelReserve: function(id, date){
                var reserve = new ngReserve();

                var dfd = $q.defer();
                reserve.$delete({id: id, date: date}).then(
                    function(response){
                        dfd.resolve(response);
                    },
                    function(){
                        dfd.reject({success: false, reason: "error"});
                    }
                );

                return dfd.promise;
            }
        }
    }
})();