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
      // Check if the user is authenticated and return the user data
      if (Auth::check()) {

        $user = Auth::user();
        return Response(['data' => $user], 200);
    }

    return Response(['error' => 'Unauthorized'], 401);
    }
}