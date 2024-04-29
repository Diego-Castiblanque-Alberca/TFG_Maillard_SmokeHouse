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
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login',[UserController::class,'loginUser']);
Route::get('/validateToken',[UserController::class,'validateToken']);

Route::group(['middleware' => 'auth:sanctum'],function(){
    Route::get('/user',[UserController::class,'userDetails']);
    Route::get('/logout',[UserController::class,'logout']);
});


//Rutas para autenticación de Admin y gestión de tokens
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/admin/user', [AdminAuthController::class, 'user'])->middleware('auth:sanctum');


// Estas son las rutas para la autenticación de administradores. 
// La ruta '/admin/login' llama al método 'login' del controlador 'AdminAuthController' cuando se recibe una solicitud POST.
// La ruta '/admin/logout' llama al método 'logout' del mismo controlador cuando se recibe una solicitud POST. Esta ruta está protegida por el middleware 'auth:sanctum', lo que significa que el usuario debe estar autenticado para acceder a ella.
// La ruta '/admin/user' llama al método 'user' del mismo controlador cuando se recibe una solicitud GET. Esta ruta también está protegida por el middleware 'auth:sanctum'.

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


