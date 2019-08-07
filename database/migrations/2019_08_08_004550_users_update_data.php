<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UsersUpdateData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //

        Schema::table('users', function(Blueprint $table) {
            //
            $table->string('users_ktp');
            $table->string('users_npwp');
            $table->string('users_hp');
            $table->string('users_kelamin');
            $table->string('users_tanggal_bergabung');
            $table->string('kel_code');
            $table->string('kec_code');
            $table->string('provinsi_code');
            $table->string('kota_code');
            $table->string('district_code');
            $table->string('kelurahan_code');


        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
