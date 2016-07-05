(function () {
    angular
        .module('goreservas')
        .directive("ratingStar", Directive);
    Directive.$inject = [];
    function Directive(){
        return {
            scope: {
                ratingStar: "="
            },
            template: '<i class="fa fa-fw yellow-text text-darken-3 fa-star" ng-class="{\'fa-star-o\': ratingStar.model < ratingStar.rating, \'fa-star-half-full\': ratingStar.model < ratingStar.rating && ratingStar.model > ratingStar.rating - 1}"></i>'
        };
    }
})();