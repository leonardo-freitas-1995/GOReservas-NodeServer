(function() {
    angular
        .module('goreservas')
        .factory('ngReserve', Service);
    Service.$inject = ['$resource'];
    function Service($resource) {
        var ReserveResource = $resource(
            '/api/reserve/:id/:client/:search/:date',
            {},
            {update: {method: 'PUT', isArray: false},
            search: {method: 'SEARCH', isArray: false}}
        );

        return ReserveResource;
    }
})();
