<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Reserva;

class Horario extends Model
{
    protected $table = 'horarios';
    protected $primaryKey = 'id';
    
    public function reservasInicio()
    {
        return $this->hasMany(Reserva::class, 'horario_inicio');
    }

    public function reservasFin()
    {
        return $this->hasMany(Reserva::class, 'horario_fin');
    }
}
?>