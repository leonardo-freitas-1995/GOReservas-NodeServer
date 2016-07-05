(function() {
    angular
        .module('goreservas')
        .factory('ngLayout', Service);
    Service.$inject = ['$location', 'ngIdentity'];
    function Service($location, ngIdentity) {
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
                if (name.indexOf(" ") === -1)
                    return name;
                return name.substring(0, name.indexOf(" "));
            },
            hasSidenav: function(){
                var sidenavPaths = [
                    "/dashboard",
                    "/business",
                    "/search-business",
                    "/reserve",
                    "/calendar",
                    "/profile"
                ];
                var path = $location.path();
                return sidenavPaths.contains(path);
            },
            isActive: function(path){
                return $location.path() === path;
            }
        };
    }
})();
