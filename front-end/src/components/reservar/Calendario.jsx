import React,{ useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import '../../styles/reservar/Calendario.css';

// Definimos el componente Calendario que recibe como props fechaSeleccionada y setFechaSeleccionada
export function Calendario({ fechaSeleccionada,setFechaSeleccionada}) {
    // Definimos hoy como la fecha actual a las 00:00:00
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    // Definimos selected como el estado que inicialmente es igual a fechaSeleccionada
    const [selected, setSelected] = useState(fechaSeleccionada);
    // Definimos mesActual como la fecha actual y enDosMeses como la fecha dentro de dos meses
    const mesActual = new Date();
    const enDosMeses = new Date(mesActual.getFullYear(), mesActual.getMonth() + 2, 1);
    // Definimos diasAnteriores como un objeto con color y backgroundColor
    const diasAnteriores={color: "var(--color-5)",backgroundColor: "transparent"}

    // Definimos la función manejarSelected que actualiza selected y fechaSeleccionada con la fecha seleccionada
    const manejarSelected = (date) => {
        if(date == undefined) return;
        setSelected(date);
        setFechaSeleccionada(date);
    };
    // Retornamos un DayPicker con varias props
    // DayPicker es un componente de React que proporciona un calendario interactivo flexible.
    return (
        <DayPicker
            /* El modo "single" permite seleccionar un solo día a la vez */
            mode="single"
            /* La fecha seleccionada actualmente */
            selected={selected}
            /* La función que se llama cuando se selecciona una fecha */
            onSelect={manejarSelected}
            /* La semana comienza el lunes (1) */
            weekStartsOn={1} 
            /* El locale es español */
            locale={es}
            /* El primer mes que se muestra es el mes actual */
            fromMonth={mesActual}
            /* El último mes que se muestra es dentro de dos meses */
            toMonth={enDosMeses}
            /* Los días antes de hoy están deshabilitados */
            disabled={{before: hoy}}
            /* Se aplica el modificador "antesDeHoy" a los días antes de hoy */
            modifiers={{ antesDeHoy: (fecha) => fecha < hoy }}
            /* Se aplica el estilo de diasAnteriores a los días con el modificador "antesDeHoy" */
            modifiersStyles={{antesDeHoy: diasAnteriores}}
        />
    )
}