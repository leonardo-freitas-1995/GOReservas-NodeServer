(function () {
    angular
        .module('goreservas')
        .controller('SearchBusinessController', Controller);
    Controller.$inject = ['businessService', 'ngNotifier', 'ngIdentity'];
    function Controller(businessService, ngNotifier, ngIdentity) {
        var vm = this;

        vm.search = {
            term: "",
            filter: ["'restaurant'", "'entertainment'", "'other'"]
        };

        vm.loaded = false;
        vm.businessArray = [];
        vm.lastSearch = "";

        vm.makeSearch = function(){
            if (!vm.search.filter.filter(function(val){return val != null;}).length){
                ngNotifier.error("É preciso selecionar pelo menos um dos filtros para efetuar a busca.");
                return false;
            }
            vm.lastSearch = vm.search.term;
            vm.loaded = false;
            businessService.searchBusiness(ngIdentity.currentUser.id, vm.search.term,
                vm.search.filter)
                .then(function(response){
                    vm.businessArray = response.data
;                    vm.loaded = true;
                });
        };

        vm.makeSearch();
    }
})();
