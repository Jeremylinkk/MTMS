var app = angular.module("controllers", []);
app.controller('login', ["$scope", "MyService", "$rootScope", function ($scope, MyService, $rootScope) {
    var arr = [];
    $scope.loginFN = function () {
        $scope.data = {
            taken: $scope._token,
            username: $scope.username,
            password: $scope.password
        };

        MyService.post("/members/login", $scope.data).then(function successCallback(res) {
            console.log(res);
        });

    }
    $scope.logx = function(){
        MyService.get("/test").then(function successCallback(res) {
            console.log(res);
        });
    }

}]);
app.controller("homeController", ["$scope", "MyService", "$rootScope", "$http", function ($scope, MyService, $rootScope, $http) {
    $scope.btnAddCtrl = "เพิ่มข้อมูล";
    $scope.logoutFN = () => {
        alert("Ok you logout");
        MyService.get("/members/logout").then(function successCallback(res) {
            console.log(res);
        });
    }
    //#1 insert Branch
    $scope.addBranch = function () {
        $scope.branchData = {
                branchs_name: $scope.branch,
                branchs_address: $scope.branch_address,
                branchs_tel: $scope.branch_tel,
            };
        if ($scope.bid == null) {
            MyService.post('/branchs/addbranchs', $scope.branchData)
                .then(function successCallback(response) {
                    $scope.branch= null;
                    $scope.branch_address= null;
                    $scope.branch_tel= null;
                    $scope.btnAddCtrl = "เพิ่มข้อมูล";
                    $scope.listBranch();
                });
        } else {
            //Update Branch
            MyService.put("/branchs/editbranchs/" + $scope.bid, $scope.branchData)
                .then(function success(res) {
                    $scope.branch= null;
                    $scope.branch_address= null;
                    $scope.branch_tel= null;
                    $scope.btnAddCtrl = "เพิ่มข้อมูล";
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
    $scope.deleteBranch = () => {
        console.log("Wait to Delete...");
    }
    //Show branchs
    $scope.listBranch = () => {
        MyService.get('/branchs/showbranchs').then(function success(res) {
            $scope.listbranchs = res.data.data;
            $scope.arr = [];
            for (x in $scope.listbranchs) {
                $scope.arr.push({ id: $scope.listbranchs[x].branchs_id, name: $scope.listbranchs[x].branchs_name });
                // console.log("xx = " + $scope.listbranchs[x].branchs_name);
            }
            $scope.dataBranch = {
                availableOptions: $scope.arr,
                selectedOption: { id: $scope.listbranchs[0].branchs_id, name: $scope.listbranchs[0].branchs_name } //This sets the default value of the select in the ui
            };
            // console.log($scope.data);
        });
    };
        //#2 Insert Brand (รุ่นรถ)
    $scope.addBrand = () => {
        $scope.data = {
            brands_name: $scope.brand
        }
        if ($scope.bid == null) {
            console.log("BB = "+$scope.brand);
            MyService.post("/brands/addbrands", $scope.data)
                .then(function (res) {
                    $scope.brand = null;
                    $scope.showBrands();
                });
        } else {
            MyService.put("/brands/editbrands/" + $scope.bid, $scope.data)
                .then(function (res) {
                    $scope.brand = null;
                    $scope.btnAddCtrl = "เพิ่มข้อมูล";
                    $scope.showBrands();
                });
        }
    }
    //Update showBrands
    $scope.updateBrans = (list) => {
        $scope.bid = list.brands_id,
        $scope.brand = list.brands_name,
        $scope.btnAddCtrl = "แก้ไขข้อมูล";
    }
    //Show brands
    $scope.showBrands = () => {
        MyService.get("/brands/showbrands")
            .then(function (res) {
                $scope.listBrand = res.data.data;
                $scope.arrBrand=[];
                for(let x in $scope.listBrand) {
                    $scope.arrBrand.push({
                        brandId:$scope.listBrand[x].brands_id,
                        brandName:$scope.listBrand[x].brands_name
                    });
                    // console.log("Show Brand name = "+$scope.listBrand[x].brands_name);
                }// for
                $scope.dataBrands = {
                    availableOptions:$scope.arrBrand,
                    selectedOption:{
                        brandId:$scope.listBrand[0].brands_id,
                        brandName:$scope.listBrand[0].brands_name
                    }
                }
                // console.log("Scope Data : ",$scope.data);
            });
    }
    //#3 Add members
    $scope.btnAddCtrl = "เพิ่มข้อมูล"; //status button
    $scope.addMember = function () {
        $scope.memberData = {
            username: $scope.m_usernames,
            password: $scope.m_passwords,
            status: $scope.status,
            branchs_id: $scope.dataBranch.selectedOption.id
        }
        console.log($scope.memberData);
        if ($scope.mid == null) {
            MyService.post('/members/register', $scope.memberData)
                .then(function successCallback(response) {
                    console.log(response.data.message);
                    $scope.m_usernames = null;
                    $scope.m_passwords = null;
                    $scope.status = null;
                    $scope.branchs_id = null;
                    $scope.btnAddCtrl = "เพิ่มข้อมูล";
                    $scope.showDataMembers();
                });
        } else {
            $scope.memberDota2 = {
                username: $scope.m_usernames,
                status: $scope.status,
                branchs_id: $scope.dataBranch.selectedOption.id
            }
            MyService.put("/members/editmembers/" + $scope.mid, $scope.memberDota2)
                .then((res) => {
                    $scope.m_usernames = null;
                    $scope.status = null;
                    $scope.branchs_id = null;
                    $scope.btnAddCtrl = "เพิ่มข้อมูล";
                    $scope.updateMember = res.data.data;
                    $scope.showDataMembers();
                });
        }
    }
    //Update member
    $scope.updeteMember = (m) => {
        $scope.mid = m.id,
            $scope.m_usernames = m.username,
            $scope.status = m.status,
            $scope.branchs_id = m.branchs_name,
            $scope.dataBranch.selectedOption.id = m.branchs_id,
            $scope.btnAddCtrl = "แก้ไขข้อมูล"
    }
    //Show Members
    $scope.showDataMembers = () => {
        MyService.get("/members/showmembers").then(function success(res) {
            $scope.listMembers = res.data.data
        });
    }
        //#4 insertModel (ยี่ห้อรถ)
    $scope.btnAddCtrl = "เพิ่มข้อมูล"; // status button
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
                    $scope.btnAddCtrl = "เพิ่มข้อมูล";
                    $scope.listModel();
                });
        } else { //if have ID
            $scope.updateModel = {
                models_name: $scope.Models
            }
            MyService.put('/models/editmodels/' + $scope.models_id, $scope.updateModel)
                .then(function successCallback(response) {
                    $scope.listModel();
                    $scope.btnAddCtrl = "แก้ไขข้อมูล";
                    $scope.Models = null;
                });
        }
    };
    // EditModelCar
    $scope.editModel = function (models_id, models_name) {
        $scope.btnAddCtrl = "แก้ไขข้อมูล"; //status button
        $scope.models_id = models_id;
        $scope.Models = models_name;
    };
    // ShowModelCar
    $scope.listModel = function () {
        MyService.get('/models/showmodels')
            .then(function successCallback(response) {
                $scope.modelName = response.data.data
                $scope.arrModel=[];
                for(let item in $scope.modelName) {
                    $scope.arrModel.push({
                        id:$scope.modelName[item].models_id,
                        name:$scope.modelName[item].models_name
                    });
                    // console.log("Model Name : "+$scope.modelName[item].models_name);
                }//for
                $scope.dataModel={
                    availableOptions:$scope.arrModel,
                    selectedOption:{
                        id:$scope.modelName[0].models_id,
                        name:$scope.modelName[0].models_name,
                    }
                }
                // console.log("Data Model : ",$scope.dataModel);
            });
    };

    //#5 Insert Color
    $scope.InsertColor = function(){
        $scope.Colordata = {
            colors_name:$scope.addColors
        }
        if($scope.colorID == null){
                MyService.post("/colors/addcolors",$scope.Colordata).then(function(res){
                $scope.addColors = null;
                $scope.showColor();
            });
        }else{
            MyService.put("/colors/editcolors/"+$scope.colorID,$scope.Colordata).then(function(res){
                $scope.addColors = null;
                $scope.btnAddCtrl = "เพิ่มข้อมูล"
                $scope.showColor();
            });
        }
    }
    //update Color
    $scope.updateColor = function(colors_name,colors_id){
        $scope.colorID = colors_id,
        $scope.addColors = colors_name,
        $scope.btnAddCtrl = "แก้ไขข้อมูล"
    }
    //Show color
    $scope.showColor = function(){
        MyService.get("/colors/showcolors").then(function(res){
            $scope.color = res.data.data;
            $scope.arrColor = [];
            for(let item in $scope.color) {
                $scope.arrColor.push({
                    id:$scope.color[item].colors_id,
                    name:$scope.color[item].colors_name
                });
                // console.log("Show Color : "+$scope.color[item].colors_name);
            }//for
            $scope.dataColor={
                availableOptions:$scope.arrColor,
                selectedOption:{
                    id:$scope.color[0].colors_id,
                    name:$scope.color[0].colors_name
                }
            }
            
        })
    }
    //#6 Insert Details 
    $scope.InsertDetaial = function(){
        $scope.dataDetails={
            details_id:$scope.serial_number_id,
            engines_number:$scope.engines_number,
            branch_id:$scope.dataBranch.selectedOption.id,
            brand_id:$scope.dataBrands.selectedOption.brandId,
            model_id:$scope.dataModel.selectedOption.id,
            colors_id:$scope.dataColor.selectedOption.id
        }
        // console.log("Data Details = ",$scope.dataDetails);
        if($scope.did==null){
            MyService.post("/details/adddetails",$scope.dataDetails).then(function(res){
                $scope.details = res.data.data;
                $scope.showDetails();
                $scope.serial_number_id = null;
                $scope.engines_number = null;
                $scope.btnAddCtrl = "เพิ่มข้อมูล";
            });
         }else{
             MyService.put("/details/editdetails/"+$scope.did,$scope.dataDetails).then(function(res){
                $scope.showDetails();
                $scope.btnAddCtrl = "เพิ่มข้อมูล";
             });
         }
    }
    //update Details
    $scope.upd = function(dest){
        $scope.serial_number_id = dest.details_id,
        $scope.engines_number = dest.engines_number,
        $scope.dataBranch.selectedOption.id = dest.branchs_id,
        $scope.dataBrands.selectedOption.brandId = dest.brands_id,
        $scope.dataModel.selectedOption.id = dest.models_id,
        $scope.dataColor.selectedOption.id = dest.colors_id,
        $scope.btnAddCtrl = "แก้ไขข้อมูล";
    }
    //show Details
    $scope.showDetails = function(){
        MyService.get("/details/showdetails").then(function(res){
            $scope.listdetails = res.data.data;
        });
    }

}]);