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
        .when('/business',{
            templateUrl: '/partials/business/business',
            controller: 'ngBusinessCtrl',
            controllerAs: 'vm',
            resolve: {
                auth: routeRoleCheck('user')
            }
        })
        .when('/search-business',{
            templateUrl: '/partials/business/search-business',
            controller: 'ngSearchBusinessCtrl',
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
