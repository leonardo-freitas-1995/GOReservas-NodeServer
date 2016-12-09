(function () {
    angular
        .module('goreservas')
        .factory('reserveService', Service);
    Service.$inject = ['$q', 'Reserve'];
    function Service($q, Reserve) {
        return {
            createReserve: function (reserveData) {
                var reserve = new Reserve(reserveData);

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
            rateReserve: function (id, business, rating) {
                var reserve = new Reserve({rating: rating});

                var dfd = $q.defer();
                reserve.$save({id: id, business: business}).then(
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
                var reserve = new Reserve();

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
                var reserve = new Reserve();

                var dfd = $q.defer();
                reserve.$update({id: id}).then(
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
                var reserve = new Reserve();

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
                var reserve = new Reserve();

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