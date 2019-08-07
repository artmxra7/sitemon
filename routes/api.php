<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function () {


    Route::get('/profile', 'Api\Users\UsersController@getProfile')->name('user.detail');

    Route::post('/logout', 'Api\AuthController@logout')->name('user.logout');
});



Route::get('/pelanggan', 'Api\DataPelangganController@getDataPelanggan');
Route::post('/pelanggan', 'Api\DataPelangganController@createDataPelanggan');


Route::post('auth/login', 'Api\AuthController@login');
