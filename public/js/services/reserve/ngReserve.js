(function() {
    angular
        .module('goreservas')
        .factory('ngReserve', Service);
    Service.$inject = ['$resource'];
    function Service($resource) {
        var ReserveResource = $resource(
            '/api/reserve/:id/:client/:search',
            {},
            {update: {method: 'PUT', isArray: false}}
        );

        return ReserveResource;
    }
})();
