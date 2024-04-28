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
    /**
     * Display a listing of the resource.
     */
    public function loginUser(Request $request): Response
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {

            return Response(['message' => $validator->errors()], 401);
        }

        $credentials = $request->only('email', 'password');
        $remember = $request->input('remember', false);

        // Check if the user is authenticated and remember the user with the token
        // If the user is authenticated, return the token
        if (Auth::attempt($credentials, $remember)) {

            $user = Auth::user();
            $success = $user->createToken('')->plainTextToken;
            return Response(['token' => $success], 200);
        }

        return Response(['message' => 'email or password wrong'], 401);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function userDetails(): Response
    {
        // Check if the user is authenticated and return the user data
        if (Auth::check()) {

            $user = Auth::user();

            return Response(['data' => $user], 200);
        }

        return Response(['data' => 'Unauthorized'], 401);
    }

    /**
     * Display the specified resource.
     */
    public function logout(): Response
    {
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        return Response(['data' => 'User Logout successfully.'], 200);
    }

    public function validateToken(Request $request)
    {
        // Puedes usar el método $request->bearerToken() para obtener el token del encabezado de autorización.
        $token = $request->bearerToken();

        // Luego, valida el token y devuelve una respuesta.
        // Este es solo un ejemplo y necesitarás implementar la lógica de validación del token según tus necesidades.
        if ($token) {
            // Busca el token en la base de datos
            $tokenRecord = DB::table('personal_access_tokens')
                ->where('token', hash('sha256', $token))
                ->first();

           /*  // Si el token no existe, devuelve una respuesta con un estado 401
            if (!$tokenRecord) {
                return response()->json(['valid' => false], 401);
            }
            
Error en esta parte del código

            // Si el token existe pero ha caducado, devuelve una respuesta con un estado 401
            if ($tokenRecord->expires_at !== null && Carbon::parse($tokenRecord->expires_at)->isPast()) {
                return response()->json(['valid' => false], 401);
            } */

            // Si el token existe y no ha caducado, devuelve una respuesta con un estado 200
            return response()->json(['valid' => true, 'token'=>$tokenRecord], 200);

        } else {
            return response()->json(['valid' => false], 401);
        }
    }
}