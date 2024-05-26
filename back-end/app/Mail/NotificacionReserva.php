<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

// Define la clase NotificacionReserva que extiende de Mailable
class NotificacionReserva extends Mailable
{
    // Usa los traits Queueable y SerializesModels para manejar la cola y la serialización de modelos
    use Queueable, SerializesModels;

    // Define una propiedad pública para los detalles de la reserva
    public $detalles;

    /**
     * Crea una nueva instancia del mensaje.
     *
     * @param mixed $detalles Los detalles de la reserva
     */
    public function __construct($detalles)
    {
        // Asigna los detalles de la reserva a la propiedad detalles
        $this->detalles = $detalles;
    }

    /**
     * Construye el mensaje.
     *
     * @return $this
     */
    public function build()
    {
        // Retorna el mensaje construido con el remitente, el asunto, la vista y los datos de la vista
        return $this->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME')) // Define el remitente del correo
                    ->subject('Confirmación de Reserva') // Define el asunto del correo
                    ->view('emails.notificacion_reserva') // Define la vista que se utilizará para el cuerpo del correo
                    ->with('detalles', $this->detalles); // Pasa los detalles de la reserva a la vista
    }
}