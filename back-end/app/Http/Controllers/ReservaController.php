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
}