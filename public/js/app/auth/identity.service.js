(function() {
    angular
        .module('goreservas')
        .factory('identity', Service);
    Service.$inject = ['$window', 'User'];
    function Service($window, User) {
        var currentUser;
        if (!!$window.bootstrappedUserObject) {
            currentUser = new User();
            angular.extend(currentUser, $window.bootstrappedUserObject);
        }

        return {
            currentUser: currentUser,
            isAuthenticated: function () {
                return !!this.currentUser;
            },
            isAuthorized: function (role) {
                return !!this.currentUser && this.currentUser.role === role;
            }
        };
    }
})();
