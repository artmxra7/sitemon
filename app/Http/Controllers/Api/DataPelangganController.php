<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Pelanggan;
use phpDocumentor\Reflection\DocBlock\Tags\Return_;
use PhpParser\Node\Expr\New_;
use App\Http\Controllers\ApiController;

class DataPelangganController extends ApiController
{
    //

    public function __construct()
    {

    }

    public function getDataPelanggan()
    {


        $pelanggan = Pelanggan::all();

        return $this->sendResponse(0, "Berhasil", $pelanggan);
    }

    public function createDataPelanggan(Request $request)
    {
        $pelanggan = new Pelanggan;
        $pelanggan->pelanggan_code = generateFiledCode("PELANGGAN");
        $pelanggan->nama = $request->nama;
        $pelanggan->alamat = $request->alamat;
        $pelanggan->save();



        if ($pelanggan) {
            return $this->sendResponse(0, "Berhasil");
        } else {
            return $this->sendError(2, 'Error');
        }
    }
}
