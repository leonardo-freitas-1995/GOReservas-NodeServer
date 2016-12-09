(function() {
    angular
        .module('goreservas')
        .config(RouteConfig);

    var routes = {
        '/index': {
            templateUrl: '/partials/main/main',
            controller: 'MainController',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('notuser')
            }
        },
        '/dashboard': {
            templateUrl: '/partials/dashboard/dashboard',
            controller: 'DashboardController',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('user')
            }
        },
        '/business': {
            templateUrl: '/partials/business/business',
            controller: 'BusinessController',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('user')
            }
        },
        '/search-business': {
            templateUrl: '/partials/business/search-business',
            controller: 'SearchBusinessController',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('user')
            }
        },
        '/reserve': {
            templateUrl: '/partials/reserve/reserve',
            controller: 'ReserveController',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('user')
            }
        },
        '/calendar': {
            templateUrl: '/partials/reserve/calendar',
            controller: 'CalendarController',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('user')
            }
        },
        '/profile': {
            templateUrl: '/partials/profile/profile',
            controller: 'ProfileController',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('user')
            }
        }
    };

    // Routes authentications
    function routeRoleCheck(role){
        AuthService.$inject = ['authService'];
        function AuthService(authService){
            var authType = {
                owner: authService.authorizeCurrentUserForRoute('owner'),
                user: authService.authorizeAuthenticatedUserForRoute(),
                notuser: authService.authorizeNotAuthenticatedUserForRoute()
            };
            if (!authType[role])
                return false;

            return authType[role];
        }
        return AuthService;
    }

    RouteConfig.$inject = ['$routeProvider'];
    function RouteConfig($routeProvider){

        for (var route in routes){
            if (routes.hasOwnProperty(route)){
                $routeProvider.when(route, routes[route]);
            }
        }

        $routeProvider.otherwise({redirectTo: '/index'});
    }
})();
