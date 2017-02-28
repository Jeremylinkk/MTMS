var app = angular.module("myAppMTMS", ["controllers", "ngRoute", "ngResource"]);
app.config(function($routeProvider, $httpProvider, $qProvider) {
    //  $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // $httpProvider.defaults.withCredentials = true;
    // $httpProvider.defaults.useXDomain = true;
    $qProvider.errorOnUnhandledRejections(false);
    $routeProvider
        .when("/", {
            templateUrl: "views/main.html"
        })
        .when("/home", {
            templateUrl: "views/home.html",
            controller: "test"
        })
        .when("/login", {
            templateUrl: "views/login.html"
        })
        .when("/register", {
            templateUrl: "views/register.html"
        })

    .when("/template", {
        templateUrl: "views/template.html"
    })
});
app.service('MyService', ['$location', '$http', '$sce', '$rootScope', '$routeParams', function($location, $http, $sce, $rootScope, $routeParams) {
    var baseUrl = "http://192.168.31.87/mtms/api";
    var get = function(API) { // get data
        return $http.get(baseUrl + API)
            .then(function successCallback(response) {
                return response;
            }, function errorCallback(response) {
                // errorCallback
            });

    };
    var post = function(API, parameters) { // post data
        return $http.post(baseUrl + API, parameters)
            .then(function successCallback(response) {
                return response;
            }, function errorCallback(response) {
                // errorCallback
            });
    };
    var put = function(API, parameters) { // edit data [post]
        return $http.put(baseUrl + API, parameters)
            .then(function successCallback(response) {
                return response;
            }, function errorCallback(response) {
                // errorCallback
            });
    };
    var del = function(API) { // delete data [get]
        return $http.delete(baseUrl + API)
            .then(function successCallback(response) {
                return response;
            }, function errorCallback(response) {
                // errorCallback
            });
    };
    return { // set namespace to function.
        get: get,
        post: post,
        put: put,
        del: del
    };
}]);