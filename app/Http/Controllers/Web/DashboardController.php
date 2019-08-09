<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    //

    function __construct()
    {
        $this->middleware('permission:dashboard view');
    }

    public function index()
    {


        return view('dashboard');
    }


}
