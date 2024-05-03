<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Mesa;
use App\Models\Cliente;
use App\Models\Fecha;


class Reserva extends Model
{
    protected $table = 'reservas';
    protected $primaryKey = 'id';
    
    public function mesa1()
    {
        return $this->belongsTo(Mesa::class, 'mesa1_id');
    }

    public function mesa2()
    {
        return $this->belongsTo(Mesa::class, 'mesa2_id');
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    public function horarioInicio()
    {
        return $this->belongsTo(Horario::class, 'horario_inicio');
    }

    public function horarioFin()
    {
        return $this->belongsTo(Horario::class, 'horario_fin');
    }
}
?>