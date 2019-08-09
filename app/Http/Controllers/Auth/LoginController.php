<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

class LoginController extends Controller
{


    use AuthenticatesUsers;

    protected $redirectTo = '/';


    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function showLoginForm()
    {
        return view('login');
    }

    protected function attemptLogin(Request $request)
    {

        //dd($request);
        $request->merge(['isActive' => 1, 'is_dashboard' => 0]);

        return $this->guard()->attempt(
            $this->credentials($request), $request->filled('remember')
        );

    }

    protected function credentials(Request $request)
    {
        return $request->only($this->username(), 'password', 'status');
    }


}
