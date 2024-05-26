<!DOCTYPE html>
<html>
<head>
    <title>Confirmación de reserva</title>
</head>
<body>
    <h2>Hola, {{ $cliente['nombre'] }} {{ $cliente['apellido'] }}!</h2>

    <p>Gracias por tu reserva en Maillard Smoke House. Aquí están los detalles:</p>

    <ul>
        <li>Fecha: {{ $reserva['fecha_reserva'] }}</li>
        <li>Hora: {{ $reserva['horario_inicio'] }}</li>
        <li>Mesas seleccionadas: {{ $reserva['mesa2_id'] == null ? $reserva['mesa1_id'] : $reserva['mesa1_id'] + "-" + $reserva['mesa2_id'] }}</li>
        <li>Número de comensales: {{ $reserva['num_comensales'] }}</li>
    </ul>

    <p>Si tienes alguna pregunta, no dudes en contactarnos al +34 685 444 444 o a nuestro correo maillardsmokehouse@gmail.com.</p>
</body>
</html>