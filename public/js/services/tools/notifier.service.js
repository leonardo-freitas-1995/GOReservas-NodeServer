(function() {
    angular
        .module('goreservas')
        .factory('notifier', Service);
    function Service() {
        return {
            success: function(message, time){
                Materialize.toast(message, time || 3000, "green lighten-1");
            },
            error: function(message, time){
                Materialize.toast(message, time || 3000, "red lighten-1");
            }
        };
    }
})();
