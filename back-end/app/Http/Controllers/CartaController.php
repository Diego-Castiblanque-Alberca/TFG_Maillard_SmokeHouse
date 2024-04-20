<?php
namespace App\Http\Controllers;

use App\Models\Carta; // Asegúrate de que este es el nombre correcto de tu modelo

class CartaController extends Controller
{
    public function index()
    {
        $carta = Carta::all();
        return response()->json($carta);
    }
}