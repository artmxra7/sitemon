<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    //
    public function sendResponse($code, $status, $data = array())
    {
        return response()->json([
            'code' => $code,
            'success' => true,
            'message' => $status,
            'data' => $this->normalize_result($data),
        ]);
    }

    public function sendError($code, $status, $errorMessages = array())
    {
        $response = [
            'code' => $code,
            'success' => false,
            'message' => $status,
        ];

        $response['data'] = $errorMessages;

        return response()->json($response);
    }

    public function normalize_result($result)
    {

        $result = json_decode(json_encode($result), true);

        array_walk_recursive($result, function (&$value) {
            $value = !is_null($value) ? $value : "";
        });

        return $result;
    }
}
