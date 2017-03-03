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
}]);