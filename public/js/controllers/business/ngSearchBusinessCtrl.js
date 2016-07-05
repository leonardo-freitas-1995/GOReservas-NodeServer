(function () {
    angular
        .module('goreservas')
        .controller('ngSearchBusinessCtrl', Controller);
    Controller.$inject = ['ngBusinessSvc', 'ngNotifier'];
    function Controller(ngBusinessSvc, ngNotifier) {
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
            ngBusinessSvc.searchBusiness(1, vm.search.term,
                vm.search.filter)
                .then(function(response){
                    vm.businessArray = response.data
;                    vm.loaded = true;
                },
                function(){

                });
        };

        vm.makeSearch();
    }
})();