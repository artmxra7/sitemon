<?php

namespace App\Http\Repositories;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthRepository{


    public function SaveOrUpdateDeviceData($device, $user, $user_type)
    {
        $userDeviceNum = DB::table('user_device')->where('imei', @$device['imei'])->exists();

        $device['user_code'] = ($user_type == 'web' ? Auth::guard($user_type)->user()->user_code : Auth::guard($user_type)->user()->partner_code);

        if ($userDeviceNum) {
            $update = DB::table('user_device')->where('imei', @$device['imei'])->update(array_merge(@$device,array(
                'date_updated' => date('Y-m-d H:i:s'),
            )));

            return $update;
        }else{
        	$device['user_code'] = ($user_type == 'web' ? $user->users_code : $user->partner_code);
            $device['user_device_code'] = generateFiledCode('UDC');
            $insert = DB::table('user_device')->insert(@$device);

            return $insert;
        }
    }

}
