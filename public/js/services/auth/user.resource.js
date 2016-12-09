(function() {
    angular
        .module('goreservas')
        .factory('User', Service);
    Service.$inject = ['$resource'];
    function Service($resource) {
        return $resource(
            '/api/users/:email',
            {},
            {update: {method: 'PUT', isArray: false}}
        );
    }
})();
