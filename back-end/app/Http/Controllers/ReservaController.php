<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Cliente; 
use App\Models\Horario;
use App\Models\Mesa;
use App\Models\Reserva;


class ReservaController extends Controller
{
    public function horariosDisponibles(Request $request)
    {
        $fecha = $request->input('fecha');
        $horarios = Horario::all();
        $mesas = Mesa::all();
        $reservas = Reserva::where('fecha_reserva', $fecha)->get();
        $horariosDisponibles = [];
        
        foreach ($horarios as $horario) {
            $mesasDisponibles = [];
            foreach ($mesas as $mesa) {
                $mesaDisponible = true;
                foreach ($reservas as $reserva) {
                    if (($reserva->horario_inicio == $horario->id || $reserva->horario_fin == $horario->id ) && ($reserva->mesa1_id == $mesa->id || $reserva->mesa2_id == $mesa->id)) {
                        $mesaDisponible = false;
                        break;
                    }
                }
                if ($mesaDisponible) {
                    $mesasDisponibles[] = $mesa;
                }
            }
            $horariosDisponibles[] = ['horario' => $horario->hora, 'disponible' => count($mesasDisponibles) > 0];
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
      if($request->input('politicas')){
        $fecha = $request->input('fechaSeleccionada');
        $horario = $request->input('horario');
        $mesas = $request->input('mesasSeleccionadas');
        $mesa1 = $mesas[0];
        if(count($mesas)>1){
            $mesa2 = $mesas[1];
        }
        $cliente = Cliente::find($request->input('email'));
        
        if(!$cliente){
            $cliente = new Cliente();
            $cliente->nombre = $request->input('nombre');
            $cliente->correo = $request->input('email');
            $cliente->apellido = $request->input('apellidos');
            $cliente->telefono = $request->input('telefono');
            $cliente->consiente = $request->input('comunicaciones');
            $cliente->save();
        }
        $reserva = new Reserva();
        $reserva->fecha_reserva = $fecha;
        //controlar aqui si el horario es el de las 16 o 23 para que no meta un horario de fin, tambien agregar un nullable a ese campo en la migracion
        $reserva->horario_inicio = Horario::where('hora', $horario)->first()->id;
        return response()->json($reserva->horario_inicio);
        // $reserva->horario_fin = Horario::where('hora', $horario)->first()->id + 1;
        // $reserva->mesa1_id = $mesa1;
        // $reserva->num_comensales = $request->input('comensalesSeleccionado');
        // if($mesa2){
        //     $reserva->mesa2_id = $mesa2;
        // }else{
        //     $reserva->mesa2_id = null;
        // }
        // $reserva->cliente()->associate($cliente);
        // $reserva->save();
        // return response()->json($reserva);
      }else{
        return response()->json("No se han aceptado las políticas de privacidad");
      }
    }
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
// ('23:00'),
// ('23:30');