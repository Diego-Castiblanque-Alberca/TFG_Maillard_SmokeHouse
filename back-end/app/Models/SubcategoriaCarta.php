<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CategoriaCarta;
use App\Models\ProductoCarta;

class SubcategoriaCarta extends Model
{
    // Asegúrate de que el nombre de la tabla en tu base de datos es 'Categorias'
    protected $table = 'Subcategorias';

    // Laravel espera que las tablas tengan una columna 'id' por defecto. Si tu columna se llama de otra manera, puedes especificarlo aquí.
    protected $primaryKey = 'id';

    // Si no estás usando timestamps en tu tabla, desactiva esta opción.
    public $timestamps = false;

    // Definir la relación con el modelo CategoriaCarta
    public function categoria()
    {
        return $this->belongsTo(CategoriaCarta::class, 'categoriaId');
    }

    // Definir la relación con el modelo ProductoCarta
    public function productos()
    {
        return $this->hasMany(ProductoCarta::class, 'subcategoriaId');
    }
}