<?php


if (!function_exists('generateFiledCode')) {
    function generateFiledCode($code)
    {
        $result = $code.'-'.date('s').date('y').date('i').date('m').date('h').date('d').mt_rand(1000000, 9999999);

        return $result;
    }
}

?>
