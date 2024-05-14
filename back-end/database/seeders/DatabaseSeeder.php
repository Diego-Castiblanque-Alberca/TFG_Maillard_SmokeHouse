<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
        * Cada vez que se ejecute la migración con php artisan migrate, 
        *se puede poblar la tabla mesas con los datos iniciales ejecutando 
        *php artisan db:seed. Se puede hacer ambas cosas a la vez, 
        *utilizando el comando php artisan migrate:fresh --seed.
        */
    public function run(): void
    {
        $this->call(MesasTableSeeder::class);
        $this->call(HorariosTableSeeder::class);
        $this->call(UsersTableSeeder::class);
    }
}