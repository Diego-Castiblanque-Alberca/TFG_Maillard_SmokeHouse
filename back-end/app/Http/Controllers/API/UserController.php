<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Auth;
use Validator;

class UserController extends Controller
{
   // Esta función se utiliza para iniciar sesión de un usuario y devolver un token de acceso.
   public function loginUser(Request $request)
   {
        // Validar los datos de la solicitud entrante
        $validator = Validator::make($request->all(), [
            'email' => 'required|email', // El correo electrónico es obligatorio y debe ser una dirección de correo válida
            'password' => 'required', // La contraseña es obligatoria
        ]);

        // Si la validación falla, devuelve una respuesta 401 con los errores de validación
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 401);
        }

        // Obtener el correo electrónico y la contraseña de la solicitud
        $credentials = $request->only('email', 'password');
        // Obtener la opción de recordar de la solicitud, por defecto a falso si no está presente
        $remember = $request->input('remember', false);

        // Intentar autenticar al usuario con las credenciales proporcionadas y la opción de recordar
        // Si la autenticación es exitosa, crea un nuevo token para el usuario y lo devuelve
        if (Auth::attempt($credentials, $remember)) {
            $user = Auth::user();
            try {
                $success = $user->createToken('')->plainTextToken;
            } catch (\Exception $e) {
                \Log::error($e);
                throw $e;
            }
            return response()->json(['token' => $success], 200);
        }

        // Si la autenticación falla, devuelve una respuesta 401
        return response()->json(['mensaje' => 'Usuario no autorizado, pruebe de nuevo.'], 401);
   }

   // Esta función se utiliza para eliminar los tokens de acceso de un usuario y cerrar la sesión
   public function logout()
   {
       // Obtener el usuario autenticado
       $user = Auth::user();
   
       // Eliminar el token de acceso actual del usuario
       $user->currentAccessToken()->delete();
   
       // Devolver una respuesta indicando que el cierre de sesión fue exitoso.
       return response()->json(['data' => 'Sesión cerrada con éxito.'], 200);
   }
   
   // Esta función se utiliza para validar si el token de acceso es válido y devolver los detalles del usuario autenticado
   public function validateToken(Request $request)
   {
       // Verificar si el usuario está autenticado
       if (Auth::check()) {
   
           // Si el usuario está autenticado, obtener los detalles del usuario
           $user = Auth::user();
   
           // Devolver el nombre del usuario en la respuesta, para utilizarlo en la interfaz de usuario
           return response()->json([
               'data' => [
                   'name' => $user->name]
               ], 200);
       }
   
       // Si el usuario no está autenticado, devolver un mensaje de error, indicando que el usuario no está autorizado
       return response()->json(['error' => 'Usuario no autorizado.'], 401);
   }
}
