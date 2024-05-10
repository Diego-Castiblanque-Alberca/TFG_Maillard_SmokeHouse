<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Cliente; 
use App\Models\Horario;
use App\Models\Mesa;
use App\Models\Reserva;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class ReservaController extends Controller
{
    const ULTIMO_HORARIO_CENA = "23:00";
    const ULTIMO_HORARIO_COMIDA = "16:00";
    const HORARIOS_COMIDA = ["12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00"];
    const HORARIOS_CENA = ["20:00","20:30","21:00","21:30","22:00","22:30","23:00"];


    public function horariosDisponibles(Request $request)
    {
        $fecha = $request->input('fecha');
        $horarios = Horario::all();
        $mesas = Mesa::all();
        $reservas = Reserva::where('fecha_reserva', $fecha)->get();
        $horariosDisponibles = [];
        
        // Obtenemos la hora y minutos actuales en formato 24h
        date_default_timezone_set('Europe/Madrid');
        $horaActual = date("H:i");
        $fechaActual = date("Y-m-d");

        foreach ($horarios as $horario) {

            $mesasDisponibles = [];
            foreach ($mesas as $mesa) {
                $mesaDisponible = true;
                foreach ($reservas as $reserva) {
                    if (($reserva->horario_inicio == $horario->id || $reserva->horario_fin == $horario->id ) 
                        && ($reserva->mesa1_id == $mesa->id || $reserva->mesa2_id == $mesa->id)) {
                        $mesaDisponible = false;
                        break;
                    }
                }
                if ($mesaDisponible) {
                    $mesasDisponibles[] = $mesa;
                }
            }
            // Si la reserva es en la fecha actual comprueba si el horario es posterior a la hora actual
            $disponible = ($fecha != $fechaActual|| $horario->hora > $horaActual) && count($mesasDisponibles) > 0;
            $horariosDisponibles[] = ['horario' => $horario->hora, 'disponible' => $disponible];
            
        }
        for($i = 1; $i < count($horariosDisponibles); $i++){
            if(!$horariosDisponibles[$i]['disponible']){
                $horariosDisponibles[$i-1]['disponible'] = false;
            }
        }
        return response()->json($horariosDisponibles);
    }

    public function mesasDisponibles(Request $request)
    {
        $fecha = $request->input('fecha');
        $horario = $request->input('horario');
        $mesas = Mesa::all();
        $reservas = Reserva::where('fecha_reserva', $fecha)->get();
        
        $mesasDisponibles = [];
        foreach ($mesas as $mesa) {
            $mesaDisponible = true;
            foreach ($reservas as $reserva) {
                $horarioInicio = Horario::find($reserva->horario_inicio);
                $horarioFin = Horario::find($reserva->horario_fin);
                if (($horarioInicio->hora == $horario || $horarioFin->hora == $horario ) && ($reserva->mesa1_id == $mesa->id || $reserva->mesa2_id == $mesa->id)) {
                    $mesaDisponible = false;
                    break;
                }
            }
            $mesasDisponibles["mesa-" . $mesa->id] = ["capacidad" => $mesa->capacidad,"disponibilidad"=>$mesaDisponible];
        }
        return response()->json($mesasDisponibles);
    }

    public function guardarReserva(Request $request)
    {
        // Validación de la entrada
        //si los datos no pasan la validación, Laravel automáticamente retornará una respuesta 
        //con un código de estado 422 (Unprocessable Entity)  y un JSON con los errores de validación.
        $datosValidados = $request->validate([
            'politicas' => 'required|boolean',
            'fechaSeleccionada' => 'required|date',
            'horario' => [
              'required',
                'string',
                'in:'. implode(',', self::HORARIOS_COMIDA) . ',' . implode(',', self::HORARIOS_CENA)  
            ],
            'mesasSeleccionadas' => 'required|array|min:1|max:2',
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'telefono' => 'required|string|min:12|max:12',
            'email' => 'required|email|max:255',
            'comunicaciones' => 'required|boolean',
            'comensalesSeleccionado' => 'required|integer|min:1|max:8',
        ]);
        if($datosValidados['politicas']){
            DB::beginTransaction();
            try {
                $cliente = Cliente::firstWhere('correo', $datosValidados['email']);
                
                if(!$cliente){
                    $cliente = new Cliente();
                } 
                
                $cliente->nombre = $datosValidados['nombre'];
                $cliente->correo = $datosValidados['email'];
                $cliente->apellido = $datosValidados['apellidos'];
                $cliente->telefono = $datosValidados['telefono'];
                $cliente->consiente = $datosValidados['comunicaciones'];
                $cliente->save();

                $reserva = new Reserva();
                $reserva->fecha_reserva = $datosValidados['fechaSeleccionada'];
                $reserva->horario_inicio = Horario::where('hora', $datosValidados['horario'])->first()->id;
                if($datosValidados['horario'] == self::ULTIMO_HORARIO_CENA || $datosValidados['horario'] == self::ULTIMO_HORARIO_COMIDA){
                    $reserva->horario_fin = null;
                }else{
                    $reserva->horario_fin = Horario::where('hora', $datosValidados['horario'])->first()->id + 1;
                }
                $reserva->mesa1_id = Mesa::where('id', explode("-", $datosValidados['mesasSeleccionadas'][0])[1])->first()->id;
                $reserva->num_comensales = $datosValidados['comensalesSeleccionado'];
                $reserva->mesa2_id = count($datosValidados['mesasSeleccionadas'])>1 ? Mesa::where('id', explode("-", $datosValidados['mesasSeleccionadas'][1])[1])->first()->id : null;
                $reserva->cliente_id = $cliente->id; 

                $reservaExistente = Reserva::where('cliente_id', $cliente->id)
                           ->where('fecha_reserva', $datosValidados['fechaSeleccionada'])
                           ->first();
                if ($reservaExistente) {
                    // La reserva ya existe
                    return response()->json(['mensaje' => 'Ya existe una reserva para este cliente en la fecha seleccionada. Por favor, seleccione una fecha diferente.'], 400);
                } else {
                    // La reserva no existe
                    // Procede a guardar la nueva reserva
                    $reserva->save();
                }
                $reserva->save();

                DB::commit();
                return response()->json($reserva);
            } catch (\Exception $e) {
                DB::rollback();
                Log::error($e);
                return response()->json(['mensaje'=>'Error al crear la reserva. Por favor, inténtelo de nuevo más tarde.'],500);
            }
        }else{
            return response()->json(['mensaje'=>'No se han aceptado las políticas de privacidad'],400);
        }
    }


    //una funcion que reciba fecha y turno de comida y retorne todas las reservas de ese dia(ordenadas por hora), con id, nombre, hora y mesa
    public function obtenerReservasDia(Request $request){
        $fecha = $request->input('fecha');
        $turno = $request->input('turno');
        if($turno == 'comida'){
            $horarios = self::HORARIOS_COMIDA;
        }else{
            $horarios = self::HORARIOS_CENA;
        }
        $horarioIds = Horario::whereIn('hora', $horarios)->pluck('id');
        $reservas = Reserva::where('fecha_reserva', $fecha)
            ->whereIn('horario_inicio', $horarioIds)
            ->orderBy('horario_inicio')
            ->get();
        $reservasDia = [];
    
        foreach ($reservas as $reserva) {
            $cliente = Cliente::find($reserva->cliente_id);
            $mesa1 = Mesa::find($reserva->mesa1_id);
            $mesa2 = $reserva->mesa2_id ? Mesa::find($reserva->mesa2_id) : null;
            $reservasDia[] = [
                'id' => $reserva->id,
                'nombre' => $cliente->nombre . ' ' . $cliente->apellido,
                'telefono' => $cliente->telefono,
                'fecha' => $reserva->fecha_reserva,
                'email' => $cliente->correo,
                'hora' => Horario::find($reserva->horario_inicio)->hora,
                'mesa1' => $mesa1->id,
                'mesa2' => $reserva->mesa2_id ? 'mesa-' . $mesa2->id : null,
                'comensales' => $reserva->num_comensales
            ];
        }
        return response()->json($reservasDia);
    }

    //una funcion que reciba id y retorne todos los datos de esa reserva en concreto
    public function obtenerReserva(Request $request){
        $id = $request->input('id');
        $reserva = Reserva::find($id);

        if($reserva){
            $cliente = Cliente::find($reserva->cliente_id);

            $reservaCompleta = [
                'nombre' => $cliente->nombre . ' ' . $cliente->apellido,
                'telefono' => $cliente->telefono,
                'email' => $cliente->correo,
                'fecha' => $reserva->fecha_reserva,
                'hora' => Horario::find($reserva->horario_inicio)->hora,
                'mesa1' => $reserva->mesa1_id,
                'mesa2' => $reserva->mesa2_id ? $reserva->mesa2_id : null,
                'comensales' => $reserva->num_comensales
            ];
            return response()->json($reservaCompleta);
        }else{
            return response()->json(['mensaje'=>'No se ha encontrado la reserva'],404);
        }
    }
    
    //una funcion que elimine una reserva

    public function cancelarReserva($id){
        $reserva = Reserva::find($id);
    
        if($reserva){
            $reserva->delete();
            return response()->json(['mensaje'=>'Reserva eliminada correctamente']);
        }else{
            return response()->json(['mensaje'=>'No se ha encontrado la reserva'],404);
        }
    }
    

    //una funcion que actualice una reserva con los datos que se le pasen
    // public function actualizarReserva(Request $request){
    //     $id = $request->input('id');
    //     $datosValidados = $request->validate([
    //         'politicas' => 'required|boolean',
    //         'fechaSeleccionada' => 'required|date',
    //         'horario' => [
    //           'required',
    //             'string',
    //             'in:'. implode(',', self::HORARIOS_COMIDA) . ',' . implode(',', self::HORARIOS_CENA)  
    //         ],
    //         'mesasSeleccionadas' => 'required|array|min:1|max:2',
    //         'nombre' => 'required|string|max:255',
    //         'apellidos' => 'required|string|max:255',
    //         'telefono' => 'required|string|min:12|max:12',
    //         'email' => 'required|email|max:255',
    //         'comunicaciones' => 'required|boolean',
    //         'comensalesSeleccionado' => 'required|integer|min:1|max:8',
    //     ]);
    //     if($datosValidados['politicas']){
    //         DB::beginTransaction();
    //         try {
    //             $cliente = Cliente::firstWhere('correo', $datosValidados['email']);
                
    //             if(!$cliente){
    //                 $cliente = new Cliente();
    //             } 
                
    //             $cliente->nombre = $datosValidados['nombre'];
    //             $cliente->correo = $datosValidados['email'];
    //             $cliente->apellido = $datosValidados['apellidos'];
    //             $cliente->telefono = $datosValidados['telefono'];
    //             $cliente->consiente = $datosValidados['comunicaciones'];
    //             $cliente->save();

    //             $reserva = Reserva::find($id);
    //             $reserva->fecha_reserva = $datosValidados['fechaSeleccionada'];
    //             $reserva->horario_inicio = Horario::where('hora', $datosValidados['horario'])->first()->id;
    //             if($datosValidados['horario'] == self::ULTIMO_HORARIO_CENA || $datosValidados['horario'] == self::ULTIMO_HORARIO_COMIDA){
    //                 $reserva->horario_fin = null;
    //             }else{
    //                 $reserva->horario_fin = Horario::where('hora', $datosValidados['horario'])->first()->id + 1;
    //             }
    //             $reserva->mesa1_id = Mesa::where('id', $datosValidados['mesasSeleccionadas'][0])->first()->id;
    //             $reserva->num_comensales = $datosValidados['comensalesSeleccionado'];
    //             $reserva->mesa2_id = count($datosValidados['mesasSeleccionadas'])>1 ? Mesa::where('id', $datosValidados['mesasSeleccionadas'][1])->first()->id : null;
    //             $reserva->cliente_id = $cliente->id;
    //             $reserva->save();
    //             DB::commit();
    //             return response()->json($reserva);
    //         } catch (\Exception $e) {
    //             DB::rollback();
    //             Log::error($e);
    //             return response()->json(['mensaje'=>'Error al actualizar la reserva. Por favor, inténtelo de nuevo más tarde.'],500);
    //         }
    //     }else{
    //         return response()->json(['mensaje'=>'No se han aceptado las políticas de privacidad'],400);
    //     }
    // }

}


    






// peticion json prueba:
// {
//     "apellidos": "cachafeiro silva",
//     "comensalesSeleccionado": 2,
//     "comunicaciones": false,
//     "email": "daniel.cachafeiro@educa.madrid.org",
//     "fechaSeleccionada": "2024-04-29",
//     "horario": "13:00",
//     "mesasSeleccionadas": ["mesa-7"],
//     "nombre": "marcos",
//     "politicas": true,
//     "telefono": "+34064483309"
// }
// insert de mesas
// INSERT INTO `mesas` (`capacidad`) VALUES
// (2),  -- mesa-1
// (2),  -- mesa-2
// (2),  -- mesa-3
// (6),  -- mesa-4
// (8),  -- mesa-5
// (4),  -- mesa-6
// (4),  -- mesa-7
// (2),  -- mesa-8
// (2);  -- mesa-9
// insert de horarios
// INSERT INTO `horarios` (`hora`) VALUES
// ('12:00'),
// ('12:30'),
// ('13:00'),
// ('13:30'),
// ('14:00'),
// ('14:30'),
// ('15:00'),
// ('15:30'),
// ('16:00'),
// ('20:00'),
// ('20:30'),
// ('21:00'),
// ('21:30'),
// ('22:00'),
// ('22:30'),
// ('23:00');