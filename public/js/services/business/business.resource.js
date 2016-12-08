(function() {
    angular
        .module('goreservas')
        .factory('Business', Service);
    Service.$inject = ['$resource'];
    function Service($resource) {
        var BusinessResource = $resource(
            '/api/business/:id/:client/:search/:filter',
            {},
            {update: {method: 'PUT', isArray: false}}
        );

        return BusinessResource;
    }
})();
