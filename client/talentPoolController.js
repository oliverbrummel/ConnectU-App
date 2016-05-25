angular.module('connectUApp')
  .controller('TalentPoolController', ['$http', 'ConnectUService', function($http, ConnectUService){
    var vm = this;

    vm.users = [];
    vm.twentyUsers = [];
    vm.usersSeekingInternship = [];
    vm.usersSeekingEmployment = [];

    vm.users = ConnectUService.someUsers;
    vm.twentyUsers = ConnectUService.twentyUsers;
    vm.usersSeekingInternship = ConnectUService.usersSeekingInternship;
    vm.usersSeekingEmployment = ConnectUService.usersSeekingEmployment;





  }]);//closes controller
