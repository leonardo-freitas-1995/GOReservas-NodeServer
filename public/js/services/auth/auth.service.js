(function() {
    angular
        .module('goreservas')
        .factory('authService', Service);
    Service.$inject = ['$http', '$q', 'identityService',  'userService'];
    function Service($http, $q, ngIdentity, ngUser) {
        return {
            authenticateUser: function (username, password) {
                var dfd = $q.defer();
                $http.post('/login', {username: username, password: password}).then(function (response) {
                    if (response.data.success) {
                        var user = new ngUser();
                        angular.extend(user, response.data.user);
                        ngIdentity.currentUser = user;
                        dfd.resolve(true);
                    } else {
                        dfd.resolve(false);
                    }
                });
                return dfd.promise;
            },

            logoutUser: function () {
                var dfd = $q.defer();
                $http.post('/logout', {logout: true}).then(function () {
                    ngIdentity.currentUser = undefined;
                    dfd.resolve();
                });
                return dfd.promise;
            },

            authorizeCurrentUserForRoute: function (role) {
                if (ngIdentity.isAuthorized(role)) {
                    return true;
                } else {
                    return $q.reject('not authorized');
                }

            },

            authorizeAuthenticatedUserForRoute: function () {
                if (ngIdentity.isAuthenticated()) {
                    return true;
                } else {
                    return $q.reject('not authorized');
                }
            },

            authorizeNotAuthenticatedUserForRoute: function () {
                if (!ngIdentity.isAuthenticated()) {
                    return true;
                } else {
                    return $q.reject('already authenticated');
                }
            }
            
        };
    }
})();
