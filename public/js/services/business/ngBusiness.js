(function() {
    angular
        .module('goreservas')
        .factory('ngBusiness', Service);
    Service.$inject = ['$resource'];
    function Service($resource) {
        var BusinessResource = $resource(
            '/api/business/:id/:client/:search',
            {},
            {update: {method: 'PUT', isArray: false}}
        );

        return BusinessResource;
    }
})();
