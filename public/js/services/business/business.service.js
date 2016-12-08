(function () {
    angular
        .module('goreservas')
        .factory('businessService', Service);
    Service.$inject = ['$q', 'Business'];
    function Service($q, Business) {
        return {
            getBusiness: function (id) {
                var business = new Business();

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
                var business = new Business();

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
                var business = new Business();

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