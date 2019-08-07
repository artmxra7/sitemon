<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ApiController;

use Validator;
use App\Http\Repositories\UserService;
use App\User;
use App\Client;
use Illuminate\Support\Facades\Auth;
use App\Http\Repositories\AuthRepository;

class AuthController extends ApiController
{
    //
    protected $authRepository;
    protected $userService;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function login (Request $request)
    {
        $rules = array(
            'email' => 'required|email',
            'password' => 'required'
        );

        $input = array(
            'email' => $request->email,
            'password' => $request->password
        );

        $validator = Validator::make($input, $rules);

        if($validator->fails()){
            return $this->sendError(1, "Error params", $validator->errors());
        }

        $getUserType = $this->checkUserType($request->email);

        $credentials = array(
            'email' => $input['email'],
            'password' => $input ['password'],
        );

        if (! Auth::guard($getUserType)->attempt($credentials)){
            return $this->sendError(2, "Email atau Password Salah", (object) array());
        }

        $userType = ($getUserType == 'web' ? 'web' : 'client');

        $user = Auth::guard($userType)->user();
        $device = $request->except(['email', 'password']);

        $insertUserDevice = $this->authRepository->SaveOrUpdateDeviceData($device, $user, $userType);


        $success['token'] = Auth::guard($userType)->user()->createToken(Auth::guard($userType)->user()->email)->accessToken;
        $success['user_type'] = ($getUserType == 'web' ? 'user' : 'client' );

        return $this->sendResponse(0, "Login Berhasil", $success);



    }

    public function checkUserType ($email)
    {
        if (User::where('email', $email)->exists()){
            return 'web';
        } elseif (Client::where('email', $email)->exists()) {
            return 'client';
        } else{
            return FALSE;
        }
    }

    public function logout()
    {
        if (Auth::check()) {
            Auth::user()->token()->delete();

            return $this->sendResponse(0, "Logout berhasil.", (object) array());
        } else {
            return $this->sendError(2, "Logout gagal.", (object) array());
        }
    }
}
