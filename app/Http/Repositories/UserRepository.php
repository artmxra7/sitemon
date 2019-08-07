<?php

namespace App\Http\Repositories;

use App\User;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\User as UserResource;

class UserRepository
{

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function getDetail($users_code)
    {
        if(empty($users_code)){
            return false;
        }
        //dd($users_code);

        $users = DB::table('users')->select('*')
        ->where('users.users_code', $users_code)
        ->limit(1)
        ->first();

        // dd($users);

        $user = (collect($users)->count()) ? new UserResource($users) : false;
        // dd($user);
        return $user;

    }


}
