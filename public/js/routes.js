(function() {
    angular
        .module('goreservas')
        .config(RouteConfig);

    // Routes authentications
    function routeRoleCheck(role){
        AuthService.$inject = ['ngAuth'];
        function AuthService(ngAuth){
            var authType = {
                owner: ngAuth.authorizeCurrentUserForRoute('owner'),
                user: ngAuth.authorizeAuthenticatedUserForRoute(),
                notuser: ngAuth.authorizeNotAuthenticatedUserForRoute()
            };
            if (!authType[role])
                return false;

            return authType[role];
        }
        return AuthService;
    }

    // Dynamic Dependencie injection
    function dependencySolver(dependencies) {
        LoadService.$inject = ['ngDynamicInjector'];
        function LoadService(ngDynamicInjector) {
            return ngDynamicInjector.load(dependencies);
        }
        return LoadService;
    }

    RouteConfig.$inject = ['$routeProvider'];
    function RouteConfig($routeProvider){

        // Routes
        $routeProvider
        // Welcome page
        .when('/index',{
            templateUrl: '/partials/main/main',
            controller: 'ngMainCtrl',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('notuser')
            }
        })
        .when('/dashboard',{
            templateUrl: '/partials/dashboard/dashboard',
            controller: 'ngDashboardCtrl',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('user')
            }
        })
        .otherwise({
            redirectTo: '/index'
        });
    }
})();
