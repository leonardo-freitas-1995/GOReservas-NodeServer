(function () {
    angular
        .module('goreservas')
        .directive("scrollingLink", Directive);
    Directive.$inject = [];
    function Directive(){
        return {
            link: function(scope, element, attrs) {
                element.click(function(e) {
                    e.preventDefault();


                    var goto = element.attr('href');

                    angular.element('html, body').animate({
                        scrollTop: angular.element(goto).offset().top
                    }, 800);
                });
            }
        };
    }
})();