(function() {
    angular
        .module('goreservas')
        .factory('layout', Service);
    Service.$inject = ['$location', 'identity'];
    function Service($location, identity) {
        return {
            isAuthenticated: function() {
                return identity.isAuthenticated();
            },
            getCurrentUser: function(){
                return identity.currentUser;
            },
            getUserFirstName: function(){
                if (!identity.isAuthenticated())
                    return "";

                var name = identity.currentUser.name;
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
