(function () {
    angular
        .module('goreservas')
        .factory('userService', Service);
    Service.$inject = ['$q', 'userService'];
    function Service($q, User) {
        return {
            createUser: function (userData) {
                var user = new User(userData);

                var dfd = $q.defer();
                user.$save().then(
                    function(response){
                        dfd.resolve(response);
                    },
                    function(){
                        dfd.reject({success: false, reason: "error"});
                    }
                );

                return dfd.promise;
            },
            updateUser: function (email, userData) {
                var user = new User(userData);

                var dfd = $q.defer();
                user.$save({email: email}).then(
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