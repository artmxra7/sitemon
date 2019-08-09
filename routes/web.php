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

Auth::routes();


Route::group(['middleware' => ['auth']], function() {   //

    Route::get('/', 'Web\DashboardController@index');

    Route::resource('roles', 'Web\RoleController');
    Route::resource('user_dashboard', 'Web\UserDashboardController');
});

// Route::get('/home', 'HomeController@index')->name('home');
