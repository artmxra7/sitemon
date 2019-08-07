<?php
use App\User;
namespace App\Http\Repositories;

class UserService
{
    protected $user;

    public function __construct (User $user)
    {
        $this->user = $user;
    }
}
