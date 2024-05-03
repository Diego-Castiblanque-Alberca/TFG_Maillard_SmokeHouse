<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\CartaController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\API\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rutas para autenticación de usuarios y gestión de tokens.
Route::post('/login',[UserController::class,'loginUser']);
// Grupo de rutas protegidas por autenticación de usuario.
Route::group(['middleware' => 'auth:sanctum'],function(){
    Route::get('/logout',[UserController::class,'logout']);
    Route::get('/validateToken',[UserController::class,'validateToken']);
});


// Rutas para obtener los datos de la carta
Route::get('/carta', [CartaController::class,'categorias']);
Route::get('/carta/{categoriaRuta}', [CartaController::class,'getSubcategorias']);
Route::get('/carta/{categoriaRuta}/{subcategoriaRuta}', [CartaController::class,'getProductos']);

// Estas son las rutas para obtener los datos de la carta. 
// La ruta '/carta' llama al método 'categorias' del controlador 'CartaController' cuando se recibe una solicitud GET.
// La ruta '/carta/{categoria}' llama al método 'subcategorias' del mismo controlador cuando se recibe una solicitud GET. Esta ruta tiene un parámetro de ruta '{categoria}' que puedes usar en tu controlador para obtener las subcategorías de la categoría especificada.
// La ruta '/carta/{categoria/{subcategoria}' llama al método 'productos' del mismo controlador cuando se recibe una solicitud GET. Esta ruta tiene dos parámetros de ruta '{categoria}' y '{subcategoria}' que puedes usar en tu controlador para obtener los productos de la subcategoría especificada.


Route::post('/reserva', [ReservaController::class,'horariosDisponibles']);
Route::post('/reserva/mesas', [ReservaController::class,'mesasDisponibles']);
Route::post('/reserva/reservar', [ReservaController::class,'guardarReserva']);

Route::post('/reserva/reservasDia', [ReservaController::class,'obtenerReservasDia']);

Route::post('/reserva/obtener', [ReservaController::class,'obtenerReserva']);

Route::post('/reserva/cancelar', [ReservaController::class,'cancelarReserva']);

Route::post('/reserva/actualizar', [ReservaController::class,'actualizarReserva']);