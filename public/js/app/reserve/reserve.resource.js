(function() {
    angular
        .module('goreservas')
        .factory('Reserve', Service);
    Service.$inject = ['$resource'];
    function Service($resource) {
        return $resource(
            '/api/reserve/:id/:client/:search/:date/:business/:rating',
            {},
            {update: {method: 'PUT', isArray: false}}
        );
    }
})();
