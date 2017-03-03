var app = angular.module("controllers", []);
app.controller('test', ["$scope", "MyService", "$rootScope", function($scope, MyService, $rootScope) {
    var arr = [];
    $scope.add = function() {
        arr.push($scope.testname);
        $scope.data = arr;
        $scope.testname = "";
    }
}]);

app.controller("homeController", ["$scope", "MyService", "$rootScope", "$http", function($scope, MyService, $rootScope, $http) {
        // insert Branch
    $scope.addBranch = function() {
        $scope.branchData = {
            branchs_name: $scope.branch,
            branchs_address: $scope.branch_address,
            branchs_tel: $scope.branch_tel
        };
        MyService.post('/branchs/addbranchs', $scope.branchData)
        .then(function successCallback(response) {
            console.log(response.data.message);
        });
    };
            //  insertModel
        $scope.btnModels = "เพิ่มข้อมูล"; // status button
        $scope.insertModel = function(){
        if($scope.Models==null){
            alert("กรุณากรอกด้วยนะ","Error","warning");
            return false;
        }else{
                $scope.modelData = {
                    models_name: $scope.Models
                };
                console.log($scope.modelData);
                MyService.post('/models/addmodels', $scope.modelData)
                .then(function successCallback(response) {
                    console.log(response.data.message);
                    $scope.Models = null;
                     $scope.btnModels = "เพิ่มข้อมูล";
                    $scope.listModel();
                });
            }
        };
        // EditModelCar
        $scope.editModel = function(models_id,models_name){
            $scope.updateModel = {
                models_name: $scope.models_name
            };
            MyService.put('/models/editmodels/'+$scope.models_id,$scope.updateModel)
            .then(function successCallback(response){
                $scope.btnModels = "แก้ไขข้อมูล";
                    console.log("edit = "+$scope.models_name);
                $scope.Models.response.models_name;
            });
        };

     // ShowModelCar
     $scope.listModel = function(){
        MyService.get('/models/showmodels')
        .then(function successCallback(response){
            $scope.models_id = response.data.data;
            $scope.modelName = response.data.data;
        });
     };

    $scope.data = {
        availableOptions: [
            { id: '1', name: 'Admin' },
            { id: '2', name: 'Super User' },
            { id: '3', name: 'User' }
        ],
        selectedOption: { id: '1', name: 'Admin' } //This sets the default value of the select in the ui
    };
    $scope.dataBranch = {
        availableOptions: [
            { id: '1', name: 'สาขา 1' },
            { id: '2', name: 'สาขา 2' },
            { id: '3', name: 'สาขา 3' },
            { id: '4', name: 'สาขา 4' },
            { id: '5', name: 'สาขา 5' },
            { id: '6', name: 'สาขา 6' },
            { id: '7', name: 'สาขา 7' },
            { id: '8', name: 'สาขา 8' },
            { id: '9', name: 'สาขา 9' },
            { id: '10', name: 'สาขา 10' },
            { id: '11', name: 'สาขา 11' }
        ],
        selectedOption: { id: '1', name: 'Admin' } //This sets the default value of the select in the ui
    };

    $scope.addUser = function() {
        if ($scope.userID) { //Edit user 
            $scope.data1 = {
                username: $scope.username,
                password: $scope.password,
                status: $scope.data.selectedOption.id,
                brach: $scope.dataBranch.selectedOption.id
            };
            MyService.put('/users/editusers/' + $scope.userID, $scope.data1).then(function successCallback(response) {
                $scope.userID = "";
                $scope.username = "";
                $scope.password = "";
                $scope.data.selectedOption.id = '1';
                $scope.data.selectedOption.id = '1';
                $scope.getdata();
            });
        } else { //Add user to database
            $scope.data1 = {
                username: $scope.username,
                password: $scope.password,
                status: $scope.data.selectedOption.id,
                brach: $scope.dataBranch.selectedOption.id
            };
            MyService.post('/users/addusers', $scope.data1).then(function successCallback(response) {
                $scope.username = "";
                $scope.password = "";
                $scope.data.selectedOption.id = '1';
                $scope.data.selectedOption.id = '1';
                $scope.getdata();
            });
        }

    }

    $scope.editUser = function(data) {
        $scope.userID = data.id;
        $scope.username = data.username;
        $scope.password = data.password;
        $scope.data.selectedOption.id = data.status;
        $scope.dataBranch.selectedOption.id = data.brach;
    }

    $scope.del = function(id) {
        MyService.del("/users/drops/" + id).then(function successCallback(response) {
            $scope.getdata();
        });
    }

    $scope.getdata = function() {
        MyService.get('/users/userAll').then(function successCallback(response) {
            $scope.userdata = response.data.data;
        });
    }


}]);