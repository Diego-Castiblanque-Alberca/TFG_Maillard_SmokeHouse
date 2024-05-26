<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente; 
use App\Models\Horario;
use App\Models\Mesa;
use App\Models\Reserva;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail; 
use App\Mail\NotificacionReserva;

class ReservaController extends Controller
{
    // Constantes que definen los horarios límite para la comida y la cena, así como los horarios disponibles
    const ULTIMO_HORARIO_CENA = "23:00";
    const ULTIMO_HORARIO_COMIDA = "16:00";
    const HORARIOS_COMIDA = ["12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00"];
    const HORARIOS_CENA = ["20:00","20:30","21:00","21:30","22:00","22:30","23:00"];

    // Función para obtener los horarios disponibles en una fecha determinada
    public function horariosDisponibles(Request $request)
    {
        $fecha = $request->input('fecha');
        $horarios = Horario::all();
        $mesas = Mesa::all();
        $reservas = Reserva::where('fecha_reserva', $fecha)->get();
        $horariosDisponibles = [];
        
        // Establece la zona horaria y obtiene la hora y fecha actuales
        date_default_timezone_set('Europe/Madrid');
        $horaActual = date("H:i");
        $fechaActual = date("Y-m-d");

        foreach ($horarios as $horario) {

            $mesasDisponibles = [];
            foreach ($mesas as $mesa) {
                $mesaDisponible = true;
                foreach ($reservas as $reserva) {
                    // Comprueba si la mesa ya está reservada en el horario actual
                    if (($reserva->horario_inicio == $horario->id || $reserva->horario_fin == $horario->id ) 
                        && ($reserva->mesa1_id == $mesa->id || $reserva->mesa2_id == $mesa->id)) {
                        $mesaDisponible = false;
                        break;
                    }
                }
                // Si la mesa está disponible, la añade a la lista de mesas disponibles
                if ($mesaDisponible) {
                    $mesasDisponibles[] = $mesa;
                }
            }
            // Comprueba si el horario es válido en la fecha actual y si hay mesas disponibles
            $disponible = ($fecha != $fechaActual|| $horario->hora > $horaActual) && count($mesasDisponibles) > 0;
            $horariosDisponibles[] = ['horario' => $horario->hora, 'disponible' => $disponible];
            
        }
        // Ajusta la disponibilidad de horarios consecutivos si un horario no está disponible
        for($i = 1; $i < count($horariosDisponibles); $i++){
            if(!$horariosDisponibles[$i]['disponible']){
                $horariosDisponibles[$i-1]['disponible'] = false;
            }
        }
        return response()->json($horariosDisponibles);
    }

    // Función para obtener las mesas disponibles en una fecha y horario específicos
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
                // Comprueba si la mesa ya está reservada en el horario especificado
                if (($horarioInicio->hora == $horario || ($horarioFin!=null && $horarioFin->hora == $horario) ) && ($reserva->mesa1_id == $mesa->id || $reserva->mesa2_id == $mesa->id)) {
                    $mesaDisponible = false;
                    break;
                }
            }
            // Añade la mesa a la lista de mesas disponibles con su capacidad y disponibilidad
            $mesasDisponibles["mesa-" . $mesa->id] = ["capacidad" => $mesa->capacidad,"disponibilidad"=>$mesaDisponible];
        }
        return response()->json($mesasDisponibles);
    }

    public function guardarReserva(Request $request)
    {
        // Validación de la entrada
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
                // Busca o crea un nuevo cliente
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

                // Crea una nueva reserva
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

                // Comprueba si ya existe una reserva para el cliente en la fecha seleccionada
                $reservaExistente = Reserva::where('cliente_id', $cliente->id)
                           ->where('fecha_reserva', $datosValidados['fechaSeleccionada'])
                           ->first();
                if ($reservaExistente) {
                    // La reserva ya existe
                    return response()->json(['mensaje' => 'Ya existe una reserva para este cliente en la fecha seleccionada. Por favor, seleccione una fecha diferente.'], 400);
                } else {
                    // La reserva no existe, procede a guardar la nueva reserva
                    $reserva->save();
                }

                  // Enviar correo de confirmación de reserva
                  //agregado
                  $detalles = [
                    'nombre' => $cliente->nombre,
                    'fecha' => $reserva->fecha_reserva,
                    'hora' => Horario::find($reserva->horario_inicio)->hora,
                    'comensales' => $reserva->num_comensales
                ];
                Mail::to($cliente->correo)->send(new NotificacionReserva($detalles));

                DB::commit();
                return response()->json($reserva);
            } catch (\Exception $e) {
                DB::rollback();
                Log::error('Error: ' . $e->getMessage());
                Log::error($e);
                return response()->json(['mensaje'=>'Error al crear la reserva. Por favor, inténtelo de nuevo más tarde.'],500);
            }
        }else{
            return response()->json(['mensaje'=>'No se han aceptado las políticas de privacidad'],400);
        }
    }

    // Función para obtener todas las reservas de un día específico, ordenadas por hora
    public function obtenerReservasDia(Request $request){
        // Comprueba si el usuario está autenticado
        if ($request->user()) {
            $fecha = $request->input('fecha');
            $turno = $request->input('turno');
            // Determina los horarios según el turno (comida o cena)
            if($turno == 'comida'){
                $horarios = self::HORARIOS_COMIDA;
            }elseif($turno == 'cena'){
                $horarios = self::HORARIOS_CENA;
            }else{
                return response()->json(['mensaje'=>'El turno seleccionado no es válido'],400);
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
                // Construye un arreglo con la información de la reserva
                $reservasDia[] = [
                    'id' => $reserva->id,
                    'nombre' => $cliente->nombre . ' ' . $cliente->apellido,
                    'telefono' => $cliente->telefono,
                    'fecha' => $reserva->fecha_reserva,
                    'email' => $cliente->correo,
                    'hora' => Horario::find($reserva->horario_inicio)->hora,
                    'mesa1' => $mesa1->id,
                    'mesa2' => $reserva->mesa2_id ? $mesa2->id : null,
                    'comensales' => $reserva->num_comensales
                ];
            }
            return response()->json($reservasDia);
        } else {
            return response()->json(['mensaje'=>'No estás autenticado'],401);
        }
    }
    
    // Función para cancelar una reserva
    public function cancelarReserva(Request $request, $id){
        // Comprueba si el usuario está autenticado
        if ($request->user()) {
            $reserva = Reserva::find($id);
    
            // Comprueba si la reserva existe
            if($reserva){
                $reserva->delete();
                return response()->json(['mensaje'=>'Reserva eliminada correctamente']);
            }else{
                return response()->json(['mensaje'=>'No se ha encontrado la reserva'],404);
            }
        } else {
            return response()->json(['mensaje'=>'No estás autenticado'],401);
        }
    }
    
}


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