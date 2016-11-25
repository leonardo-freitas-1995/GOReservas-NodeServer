(function () {
    angular
        .module('goreservas')
        .factory('ngBusinessSvc', Service);
    Service.$inject = ['$q', 'ngBusiness'];
    function Service($q, ngBusiness) {
        return {
            getBusiness: function (id) {
                var business = new ngBusiness();

                var dfd = $q.defer();
                business.$get({id: id}).then(
                    function(response){
                        dfd.resolve(response);
                    },
                    function(){
                        dfd.reject({success: false, reason: "error"});
                    }
                );

                return dfd.promise;
            },
            searchBusiness: function(userId, search, filter){
                if (search === "")
                    search = "%all%";
                var business = new ngBusiness();

                var dfd = $q.defer();
                business.$get({client: userId, search: search, filter: filter}).then(
                    function(response){
                        dfd.resolve(response);
                    },
                    function(){
                        dfd.reject({success: false, reason: "error"});
                    }
                );

                return dfd.promise;
            },
            getBestBusiness: function () {
                var business = new ngBusiness();

                var dfd = $q.defer();
                business.$get().then(
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