(function () {
    angular
        .module('goreservas')
        .controller('CalendarController', Controller);
    Controller.$inject = ['$scope', 'reserveService', 'ngIdentity'];
    function Controller($scope, reserveService, ngIdentity) {
        var vm = this;

        var today = new Date();

        vm.reserves = [];
        vm.todayReserves = [];
        vm.modalTodayDate = new Date();

        vm.calendar = {
            year: today.getFullYear(),
            month: today.getMonth()
        };

        vm.today = {
            year: today.getFullYear(),
            month: today.getMonth(),
            day: today.getDate()
        };

        vm.parsing = false;

        vm.monthNames = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro"
        ];

        vm.days = [];

        vm.prevMonth = function(){
            if (vm.parsing)
                return false;

            if (vm.calendar.month === 0) {
                vm.calendar.year--;
                vm.calendar.month = 11;
            }
            else{
                vm.calendar.month--;
            }
        };

        vm.nextMonth = function(){
            if (vm.parsing)
                return false;

            if (vm.calendar.month === 11) {
                vm.calendar.year++;
                vm.calendar.month = 0;
            }
            else{
                vm.calendar.month++;
            }
        };

        vm.goToToday = function(){
            today = new Date();
            vm.calendar = {
                year: today.getFullYear(),
                month: today.getMonth()
            };

            vm.today = {
                year: today.getFullYear(),
                month: today.getMonth(),
                day: today.getDate()
            };
        };

        vm.hasReserveToday = function(day){
            for (var r = 0; r < vm.reserves.length; r++){
                var date = new Date(vm.reserves[r].date);
                if (date.getFullYear() === day.year &&
                    date.getDate() === day.number &&
                    date.getMonth() === day.month){
                    return true;
                }
            }
            return false;
        };

        vm.separateReserves = function(day){
            vm.modalTodayDate.setFullYear(day.year, day.month, day.number);
            vm.todayReserves = [];
            for (var r = 0; r < vm.reserves.length; r++){
                var date = new Date(vm.reserves[r].date);
                if (date.getFullYear() === day.year &&
                    date.getDate() === day.number &&
                    date.getMonth() === day.month){
                    vm.todayReserves.push(vm.reserves[r]);
                }
            }
        };

        $scope.$watch(function(){return vm.calendar}, function(){
            vm.parsing = true;
            vm.days = [];
            var monthInit = new Date();
                monthInit.setHours(0);
                monthInit.setMinutes(0);
                monthInit.setSeconds(0);
                monthInit.setMilliseconds(0);
                monthInit.setFullYear(vm.calendar.year, vm.calendar.month, 1);
                monthInit.setDate(monthInit.getDate() - monthInit.getDay());
            while((monthInit.getMonth() <= vm.calendar.month || monthInit.getMonth() === 11) && monthInit.getFullYear() <= vm.calendar.year){
                for (var d = 0; d < 7; d++){
                    vm.days.push({number: monthInit.getDate(), month: monthInit.getMonth(), year: monthInit.getFullYear()});
                    monthInit.setDate(monthInit.getDate() + 1);
                }
            }
            vm.parsing = false;
        }, true);

        (function(){
            reserveService.getReserves(ngIdentity.currentUser.id).then(function(response){
               vm.reserves = response.data;
            });
        })()
    }
})();
