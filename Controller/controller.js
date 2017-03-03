var app = angular.module("controllers", []);
app.controller("register", ["$scope", "MyService", function ($scope, MyService, $http) {
    //Function Create User
    $scope.addUser = () => {
        $scope.arr = {
            branchs_id: 1,
            username: $scope.username,
            password: $scope.pwd,
            status: $scope.st,
        };

        MyService.post("/members/addmembers", $scope.arr).then(function success(res) {
            console.log(res.data);
        });
    }
}]);
app.controller("homeController", ["$scope", "MyService", "$rootScope", "$http", function ($scope, MyService, $rootScope, $http) {
    $scope.btnAddB = "เพิ่มข้อมูล";

    // insert Branch
    $scope.addBranch = function () {
        if ($scope.bid == null) {
            $scope.branchData = {
                branchs_name: $scope.branch,
                branchs_address: $scope.branch_address,
                branchs_tel: $scope.branch_tel,
            };
            MyService.post('/branchs/addbranchs', $scope.branchData)
                .then(function successCallback(response) {
                    // console.log(response.data.message);
                    branchs_name: null;
                    branchs_address: null;
                    branchs_tel: null;
                    $scope.btnAddB = "แก้ไขข้อมูล";
                    $scope.listBranch();
                });
        } else {
            //Update Branch
            $scope.data = {
                branchs_name: $scope.branch,
                branchs_address: $scope.branch_address,
                branchs_tel: $scope.branch_tel,
            };
            MyService.put("/branchs/editbranchs/" + $scope.bid, $scope.data)
                .then(function success(res) {
                    $scope.listBranch();
                });
        }
    };
    // Show data to input feild
    $scope.updateBranch = (listBranch) => {
        $scope.bid = listBranch.branchs_id;
        $scope.branch = listBranch.branchs_name;
        $scope.branch_address = listBranch.branchs_address;
        $scope.branch_tel = listBranch.branchs_tel;
        $scope.btnAddB = "แก้ไขข้อมูล";
    }
    //Delete branch
    $scope.deleteBranch = ()=>{
        console.log("Wait to Delete...");
    }
    //Show branchs
    $scope.listBranch = () => {
        MyService.get('/branchs/showbranchs').then(function success(res) {
            $scope.listbranchs = res.data.data;
        });
    };
    //  insertModel
    $scope.btnModels = "เพิ่มข้อมูล"; // status button
    $scope.insertModel = function () {
        if ($scope.models_id == null) { // if don't have ID

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
        } else { //if have ID
            $scope.updateModel = {
                models_name:$scope.Models
            }
            MyService.put('/models/editmodels/' +$scope.models_id, $scope.updateModel)
                .then(function successCallback(response) {
                    $scope.listModel();
                    $scope.btnModels = "เพิ่มข้อมูล";
                    $scope.Models = null;
                });
        }
    };
    // EditModelCar
    $scope.editModel = function (models_id, models_name) {
        $scope.btnModels = "แก้ไขข้อมูล"; //status button
        $scope.models_id = models_id;
        $scope.Models = models_name;
    };
    // ShowModelCar
    $scope.listModel = function () {
        MyService.get('/models/showmodels')
            .then(function successCallback(response) {
                $scope.modelName = response.data.data
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
}]);