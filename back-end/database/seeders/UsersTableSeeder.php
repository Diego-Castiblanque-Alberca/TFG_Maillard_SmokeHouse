<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'diego@maillard.com',
            'email' => 'dcastiblanque@educa.madrid.org',
            'password' => Hash::make('Mi1234'),
        ]);
        User::create([
            'name' => 'marcos@maillard.com',
            'email' => 'mcachafeiro96@gmail.com',
            'password' => Hash::make('Mi1234'),
        ]);
    }
}
