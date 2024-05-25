<!DOCTYPE html>
<html>
<head>
    <title>Confirmación de Reserva</title>
</head>
<body>
    <h1>Confirmación de Reserva</h1>
    <p>Hola {{ $detalles['nombre'] }},</p>
    <p>Tu reserva para ha {{ $detalles['comensales'] }} persona/s sido confirmada.</p>
    <p><strong>Fecha:</strong> {{ $detalles['fecha'] }}</p>
    <p><strong>Hora:</strong> {{ $detalles['hora'] }}</p>
    <p>Gracias por reservar con nosotros.</p>
</body>
</html>

