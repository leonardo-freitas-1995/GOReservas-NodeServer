(function() {
    angular
        .module('goreservas')
        .factory('ngLayout', Service);
    Service.$inject = ['ngIdentity'];
    function Service(ngIdentity) {
        return {
            isAuthenticated: function() {
                return ngIdentity.isAuthenticated();
            },
            getCurrentUser: function(){
                return ngIdentity.currentUser;
            },
            getUserFirstName: function(){
                if (!ngIdentity.isAuthenticated())
                    return "";

                var name = ngIdentity.currentUser.name;
                return name.substring(0, name.indexOf(" "));
            }
        };
    }
})();
