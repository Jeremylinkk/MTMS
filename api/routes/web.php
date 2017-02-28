<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return "Noom api";
});

Route::get("users/userAll","TestController@getAlluser");
Route::resource("users/addusers","TestController@addUser");
Route::delete("users/drops/{id}","TestController@delUser");
Route::put("users/editusers/{id}","TestController@editUser");
