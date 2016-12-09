(function() {
    angular
        .module('goreservas')
        .factory('userService', Service);
    Service.$inject = ['$resource'];
    function Service($resource) {
        var UserResource = $resource(
            '/api/users/:email',
            {},
            {update: {method: 'PUT', isArray: false}}
        );

        return UserResource;
    }
})();
