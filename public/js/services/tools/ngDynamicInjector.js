(function() {
    angular
        .module('goreservas')
        .factory('ngDynamicInjector', Service);
    Service.$inject = ['$q', '$rootScope', 'ngScriptLoad'];
    function Service($q, $rootScope, ngScriptLoad) {
        return {
            load: function(dependencies){
                var deferred = $q.defer();

                var iterateLoad = function (index) {
                    index = index | 0;
                    ngScriptLoad(dependencies[index], function ()
                    {
                        if (index === dependencies.length - 1) {
                            $rootScope.$apply(function ()
                            {
                                deferred.resolve();
                            });
                        }
                        else {
                            iterateLoad(index + 1);
                        }
                    });
                };

                iterateLoad();

                return deferred.promise;
            }
        };
    }
})();
