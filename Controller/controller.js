var app = angular.module("controllers", []);
app.controller('login', ["$scope", "MyService", "$rootScope", function($scope, MyService, $rootScope) {
    var arr = [];
    $scope.loginFN = function() {
        $scope.data = {
            taken: $scope._token,
            username: $scope.username,
            password: $scope.password
        };

        MyService.post("/members/login", $scope.data).then(function successCallback(res) {
            console.log(res);
        });

    }
    
}]);
app.controller("homeController", ["$scope", "MyService", "$rootScope", "$http", function ($scope, MyService, $rootScope, $http) {
    $scope.btnAddCtrl = "เพิ่มข้อมูล";


$scope.logoutFN = () =>{
    alert("Ok you logout");
        MyService.get("/members/logout").then(function successCallback(res) {
            console.log(res);
        });
    }

    //Insert Brand (รุ่นรถ)
    $scope.addBrand = ()=>{
        $scope.data = {
            brands_name:$scope.brand
        }
        MyService.post("/brands/addbrands",$scope.data)
        .then(function(res){
            $scope.brand = null;
        });
    }
    //Update showBrands
    $scope.updateBrans = ()=>{
        $scope.data = {
            brands_name:$scope.brand
        }
    }
    //Show brands
    $scope.showBrands=()=>{
        MyService.get("/brands/showbrands")
        .then(function(res){
            $scope.listBrand = res.data.data;
        });
    }
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
                    $scope.btnAddCtrl = "แก้ไขข้อมูล";
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
        $scope.btnAddCtrl = "แก้ไขข้อมูล";
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
    //  insertModel (ยี่ห้อรถ)
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
    $scope.btnMember = "เพิ่มข้อมูล"; //status button
    $scope.addMember = function(){
        $scope.memberData = {
            usernames : $scope.m_usernames,
            password : $scope.m_passwords,
            status : $scope.status,
            branchs_id : $scope.branchs_id
        }
        MyService.post('/members/addmembers',$scope.memberData)
        .then( function successCallback(response){
            console.log(response.data.message);
            $scope.m_usernames = null;
            $scope.m_passwords = null;
            $scope.status = null;
            $scope.branchs_id = null;
        });
    }
}]);