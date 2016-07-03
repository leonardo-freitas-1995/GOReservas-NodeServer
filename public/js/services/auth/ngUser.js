(function() {
    angular
        .module('goreservas')
        .factory('ngUser', Service);
    Service.$inject = ['$resource'];
    function Service($resource) {
        var UserResource = $resource(
            '/api/users/:email',
            {email: "@email"},
            {update: {method: 'PUT', isArray: false}}
        );

        return UserResource;
    }
})();
