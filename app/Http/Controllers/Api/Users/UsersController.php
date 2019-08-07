<?php

namespace App\Http\Controllers\Api\Users;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Repositories\UserRepository;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Auth;

class UsersController extends ApiController
{
    //
    protected $userRepository;

    public function __construct( UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getProfile ()
    {
        $result = $this->userRepository->getDetail(Auth::user()->users_code);

        if (!empty($result)) {
            $result = $this->sendResponse(0, 'Sukses', $result);

        } elseif ($result === false) {
            $result = $this->sendError(2, 4);
        } else {
            $result = $this->sendError(2, 4);
        }

        return $result;
    }

}
