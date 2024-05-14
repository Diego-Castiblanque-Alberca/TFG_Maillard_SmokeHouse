<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mesa;
class MesasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Mesa::create(['capacidad' => 2]); // mesa-1
        Mesa::create(['capacidad' => 2]); // mesa-2
        Mesa::create(['capacidad' => 2]); // mesa-3
        Mesa::create(['capacidad' => 6]); // mesa-4
        Mesa::create(['capacidad' => 8]); // mesa-5
        Mesa::create(['capacidad' => 4]); // mesa-6
        Mesa::create(['capacidad' => 4]); // mesa-7
        Mesa::create(['capacidad' => 2]); // mesa-8
        Mesa::create(['capacidad' => 2]); // mesa-9
    }
}
