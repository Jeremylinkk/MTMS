var app = angular.module("controllers", []);

app.controller("register", ["$scope", "MyService", function ($scope, MyService, $http) {
    //Function Create User
    $scope.addUser = () => {
        $scope.arr={
            branchs_id: 1,
            usernames: $scope.username,
            passwords: $scope.pwd,
            status: $scope.st,
        };
        
        MyService.post("/members/addmembers",$scope.arr).then(function success(res){
            console.log(res.data);
        });
    }

}]);