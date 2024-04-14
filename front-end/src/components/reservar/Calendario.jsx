import React,{ useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import '../../styles/reservar/Calendario.css';

export function Calendario({ fechaSeleccionada,setFechaSeleccionada}) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const [selected, setSelected] = useState(fechaSeleccionada);
    const mesActual = new Date();
    const enDosMeses = new Date(mesActual.getFullYear(), mesActual.getMonth() + 2, 1);
    const diasAnteriores={color: "var(--color-5)",backgroundColor: "transparent"}

    const manejarSelected = (date) => {
        console.log(date);
        setSelected(date);
        setFechaSeleccionada(date);
    };
    return (
        <>
            <DayPicker
                mode="single"
                selected={selected}
                onSelect={manejarSelected}
                weekStartsOn={1} 
                locale={es}
                fromMonth={mesActual}
                toMonth={enDosMeses}
                disabled={{before: hoy}}
                modifiers={{ antesDeHoy: (fecha) => fecha < hoy }}
                modifiersStyles={{antesDeHoy: diasAnteriores}}
            />
        </>
    )
}