<?php
namespace App\Http\Controllers;

use App\Models\CategoriaCarta; 
use App\Models\SubcategoriaCarta;
use App\Models\ProductoCarta;

class CartaController extends Controller
{
    public function categorias()
    {
        $categorias = CategoriaCarta::all();
        return response()->json($categorias);
    }

    // Mapeo de las rutas a los títulos de las categorías
    private $categoriaRutas = [
        'platos' => 'Nuestros Platos',
        'bebidas' => 'Nuestras Bebidas',
    ];

    // Función para obtener las subcategorías de una categoría específica
    public function getSubcategorias($categoriaRuta)
    {
        // Obtener el título de la categoría a partir de la ruta
        $categoriaTitulo = $this->categoriaRutas[$categoriaRuta] ?? null;

        // Si no se encontró un título de categoría, devolver un error
        if (!$categoriaTitulo) {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }

        // Buscar la categoría por su título
        $categoria = CategoriaCarta::where('titulo', $categoriaTitulo)->first();

        // Si la categoría no existe, devolver un error
        if (!$categoria) {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }

        // Obtener las subcategorías de la categoría
        $subcategorias = $categoria->subcategorias;

        // Devolver las subcategorías como respuesta JSON
        return response()->json($subcategorias);
    }
    
    public function getProductos($categoriaRuta, $subcategoriaRuta)
    {
        
        // Buscar la categoría por su redirige
        
        $categoria = CategoriaCarta::where('redirige', '/carta/' . $categoriaRuta)->first();

        // Si la categoría no existe, devolver un error
        if (!$categoria) {
            return response()->json(['error' => 'Categoría no encontrada'], 404);
        }

        // Buscar la subcategoría por su redirige y que pertenezca a la categoría encontrada
        $subcategoria = SubcategoriaCarta::where('redirige', '/carta/' . $categoriaRuta . '/' . $subcategoriaRuta)
            ->where('categoriaId', $categoria->id)
            ->first();
        

        // Si la subcategoría no existe, devolver un error
        if (!$subcategoria) {
            return response()->json(['error' => 'Subcategoría no encontrada'], 404);
        }

        // Obtener los productos de la subcategoría
        $productos = ProductoCarta::where('subcategoriaId', $subcategoria->id)->get();

        // Devolver los productos como respuesta JSON
        return response()->json($productos);
    }
    

}

