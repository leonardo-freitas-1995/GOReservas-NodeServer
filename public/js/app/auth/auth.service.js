(function() {
    angular
        .module('goreservas')
        .factory('authService', Service);
    Service.$inject = ['$http', '$q', 'identity',  'User'];
    function Service($http, $q, identity, User) {
        return {
            authenticateUser: function (username, password) {
                var dfd = $q.defer();
                $http.post('/login', {username: username, password: password}).then(function (response) {
                    if (response.data.success) {
                        var user = new User();
                        angular.extend(user, response.data.user);
                        identity.currentUser = user;
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
                    identity.currentUser = undefined;
                    dfd.resolve();
                });
                return dfd.promise;
            },

            authorizeCurrentUserForRoute: function (role) {
                if (identity.isAuthorized(role)) {
                    return true;
                } else {
                    return $q.reject('not authorized');
                }

            },

            authorizeAuthenticatedUserForRoute: function () {
                if (identity.isAuthenticated()) {
                    return true;
                } else {
                    return $q.reject('not authorized');
                }
            },

            authorizeNotAuthenticatedUserForRoute: function () {
                if (!identity.isAuthenticated()) {
                    return true;
                } else {
                    return $q.reject('already authenticated');
                }
            }
            
        };
    }
})();
