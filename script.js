// Myapp name = login
var app = angular.module('login', []);
app.controller('selectUser', function($scope, $http) {
    $scope.insertData = function() {
        $http.post("insert.php", { 'name': $scope.name, 'email': $scope.email, 'status': $scope.status })
            .then(function() {
                $scope.name = null;
                $scope.email = null;
                $scope.status = null;
            });
    }
    $scope.Admin = function() {
        // alert('click admin');
        // $scope.status = "Admin";
        console.log('admin')
    }
    $scope.superUser = function() {
        // alert('click supuer user');
        // $scope.status = "superUser";
        console.log('superUser')
    }
    $scope.User = function() {
        // alert('click user');
        // $scope.status = "User";
        console.log('user')
    }
});
// Myapp addMotorcycle
var app = angular.module('addCar', []);
app.controller('addMotocycle', function($scope, $http) {
    $scope.insertCar = function() {
        $http.post("insertCar.php", {
                'brand': $scope.brand,
                'model': $scope.model,
                'color': $scope.color,
                'serial_number': $scope.serial_number,
                'count_mc': $scope.count_mc
            })
            // .then(function() {
            //     $scope.brand = null;
            //     $scope.model = null;
            //     $scope.color = null;
            //     $scope.serial_number = null;
            //     $scope.count_mc = null;
            // });
    };
    $scope.displayTable = function() {
        $http.get("selectCar.php")
            .then(function(response) {
                $scope.brandCar = response.data.records;
            });
    }
});