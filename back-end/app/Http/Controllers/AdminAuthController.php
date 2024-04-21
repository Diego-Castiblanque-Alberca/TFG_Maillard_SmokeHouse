<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        //Valida los datos del request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        //Busca el usuario Admin por email
        $admin = Admin::where('email', $request->email)->first();
        //Si no existe el usuario o la contraseña no coincide, devuelve un error
        //Si el usuario existe y la contraseña coincide, crea un token de autenticación
        if (! $admin || ! Hash::check($request->password, $admin->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        //Devuelve el token de autenticación
        return $admin->createToken('admin')->plainTextToken;
    }

    public function logout(Request $request)
    {
        //Elimina el token de autenticación, cerrando la sesión y devolviendo un mensaje.
        $request->user()->currentAccessToken()->delete();

        return response()->json('Logged out');
    }

    public function user(Request $request)
    {
        return $request->user();
    }
}
?>