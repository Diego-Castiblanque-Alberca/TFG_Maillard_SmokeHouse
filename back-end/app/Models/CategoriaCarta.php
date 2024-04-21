<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\SubcategoriaCarta;

class CategoriaCarta extends Model
{
    // Asegúrate de que el nombre de la tabla en tu base de datos es 'Categorias'
    protected $table = 'Categorias';

    // Laravel espera que las tablas tengan una columna 'id' por defecto. Si tu columna se llama de otra manera, puedes especificarlo aquí.
    protected $primaryKey = 'id';

    // Si no estás usando timestamps en tu tabla, desactiva esta opción.
    public $timestamps = false;

    // Definir la relación con el modelo SubcategoriaCarta
    public function subcategorias()
    {
        return $this->hasMany(SubcategoriaCarta::class, 'categoriaId');
    }

}