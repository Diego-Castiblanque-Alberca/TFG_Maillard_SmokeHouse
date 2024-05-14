<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Horario;

class HorariosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Horario::create(['hora' => '12:00']);
        Horario::create(['hora' => '12:30']);
        Horario::create(['hora' => '13:00']);
        Horario::create(['hora' => '13:30']);
        Horario::create(['hora' => '14:00']);
        Horario::create(['hora' => '14:30']);
        Horario::create(['hora' => '15:00']);
        Horario::create(['hora' => '15:30']);
        Horario::create(['hora' => '16:00']);
        Horario::create(['hora' => '20:00']);
        Horario::create(['hora' => '20:30']);
        Horario::create(['hora' => '21:00']);
        Horario::create(['hora' => '21:30']);
        Horario::create(['hora' => '22:00']);
        Horario::create(['hora' => '22:30']);
        Horario::create(['hora' => '23:00']);
    }
}
