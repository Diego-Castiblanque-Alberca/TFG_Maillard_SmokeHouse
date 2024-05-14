<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Reserva;
use App\Models\Horario;

class Mesa extends Model
{
    use HasFactory;

    protected $table = 'mesas';
    protected $primaryKey = 'id';
    protected $fillable = ['capacidad'];
    public function reservas1()
    {
        return $this->hasMany(Reserva::class, 'mesa1_id');
    }

    public function reservas2()
    {
        return $this->hasMany(Reserva::class, 'mesa2_id');
    }

    public function horarios()
    {
        return $this->belongsToMany(Horario::class, 'mesa_horario', 'mesa_id', 'horario_id')
                    ->withPivot('fecha_id', 'horario_inicio', 'horario_fin');
    }
}
?>