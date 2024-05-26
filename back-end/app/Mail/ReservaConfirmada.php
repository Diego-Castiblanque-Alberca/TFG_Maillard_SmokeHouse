<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservaConfirmada extends Mailable 
{
    use Queueable, SerializesModels;

    protected $cliente;
    protected $reserva; 
    /**
     * Create a new message instance.
     */
    public function __construct($cliente, $reserva)
    {
        $this->cliente = $cliente;
        $this->reserva = $reserva;
    }
    

    public function build(){
        //Construir el correo electrónico con los datos pasados

        return $this
                    ->subject('Confirmación de reserva')//Asunto del correo electrónico
                    ->view('mails.welcome', ['cliente' => $this->cliente, 'reserva' => $this->reserva]); //Vista del correo electrónico y los datos que se pasan a la vista
    }
    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Email',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.welcome',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
