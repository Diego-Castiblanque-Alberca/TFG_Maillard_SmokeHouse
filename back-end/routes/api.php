<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\CartaController;
use App\Http\Controllers\ReservaController;
use App\Http\Controllers\API\UserController;

// Ruta para el inicio de sesión de usuarios y obtención de tokens.
Route::post('/login', [UserController::class, 'loginUser']);

// Grupo de rutas protegidas por autenticación de usuario utilizando el middleware 'auth:sanctum'.
Route::group(['middleware' => 'auth:sanctum'], function(){
    // Ruta para cerrar sesión del usuario autenticado.
    Route::get('/logout', [UserController::class, 'logout']);
    // Ruta para validar el token de autenticación del usuario.
    Route::get('/validateToken', [UserController::class, 'validateToken']);
});

// Ruta para obtener todas las categorías de la carta.
Route::get('/carta', [CartaController::class, 'categorias']);

// Ruta para obtener las subcategorías de una categoría específica en la carta.
Route::get('/carta/{categoriaRuta}', [CartaController::class, 'getSubcategorias']);

// Ruta para obtener los productos de una subcategoría específica en la carta.
Route::get('/carta/{categoriaRuta}/{subcategoriaRuta}', [CartaController::class, 'getProductos']);

// Ruta para obtener los horarios disponibles para una reserva en una fecha específica.
Route::post('/reserva', [ReservaController::class, 'horariosDisponibles']);

// Ruta para obtener las mesas disponibles en una fecha y horario específicos.
Route::post('/reserva/mesas', [ReservaController::class, 'mesasDisponibles']);

// Ruta para realizar una reserva.
Route::post('/reserva/reservar', [ReservaController::class, 'guardarReserva']);

// Grupo de rutas protegidas por autenticación de usuario utilizando el middleware 'auth:sanctum'.
Route::group(['middleware' => 'auth:sanctum'], function(){
    // Ruta para obtener todas las reservas de un día específico, ordenadas por hora.
    Route::post('/reserva/reservasDia', [ReservaController::class, 'obtenerReservasDia']);
});

// Otro grupo de rutas protegidas por autenticación de usuario utilizando el middleware 'auth:sanctum'.
Route::group(['middleware' => 'auth:sanctum'], function(){
    // Ruta para cancelar una reserva específica por su ID.
    Route::delete('/reserva/cancelar/{id}', [ReservaController::class, 'cancelarReserva']);
});
