(function() {
    angular
        .module('goreservas')
        .config(RouteConfig);

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

        // Routes
        $routeProvider
        // Welcome page
        .when('/index',{
            templateUrl: '/partials/main/main',
            controller: 'MainController',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('notuser')
            }
        })
        .when('/dashboard',{
            templateUrl: '/partials/dashboard/dashboard',
            controller: 'DashboardController',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('user')
            }
        })
        .when('/business',{
            templateUrl: '/partials/business/business',
            controller: 'BusinessController',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('user')
            }
        })
        .when('/search-business',{
            templateUrl: '/partials/business/search-business',
            controller: 'SearchBusinessController',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('user')
            }
        })
        .when('/reserve',{
            templateUrl: '/partials/reserve/reserve',
            controller: 'ReserveController',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('user')
            }
        })
        .when('/calendar',{
            templateUrl: '/partials/reserve/calendar',
            controller: 'CalendarController',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('user')
            }
        })
        .when('/profile',{
            templateUrl: '/partials/profile/profile',
            controller: 'ProfileController',
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
