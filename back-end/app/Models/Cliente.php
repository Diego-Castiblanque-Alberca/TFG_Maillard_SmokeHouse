<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Reserva;

class Cliente extends Model
{
    protected $table = 'clientes';
    protected $primaryKey = 'id';

    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'cliente_id');
    }
}
?>