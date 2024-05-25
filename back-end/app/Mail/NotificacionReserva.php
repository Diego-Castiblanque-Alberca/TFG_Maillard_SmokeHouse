<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NotificacionReserva extends Mailable
{
    use Queueable, SerializesModels;

    public $detalles;

    /**
     * Create a new message instance.
     */
    public function __construct($detalles)
    {
        $this->detalles = $detalles;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'))
                    ->subject('Confirmación de Reserva')
                    ->view('emails.notificacion_reserva')
                    ->with('detalles', $this->detalles);
    }
}