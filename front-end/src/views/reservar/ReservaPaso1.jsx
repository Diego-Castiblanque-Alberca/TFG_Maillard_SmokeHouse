import React, { useState , useEffect } from 'react';
import { SelectPersonas } from "../../components/reservar/SelectPersonas";
import { Calendario } from "../../components/reservar/Calendario";
import { BotonesHorarios } from "../../components/reservar/BotonesHorarios";
import { CONSTANTS } from "../../utils/consts";
import paso from "../../imgs/paso1.svg";
import Leyenda from "../../components/reservar/leyenda";

export default function ReservaPaso1({siguientePaso}) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(hoy);
    const [comensalesSeleccionado, setComensalesSeleccionado] = useState(2);

    const obtenerHorariosDisponibles = (fechaSeleccionada, comensalesSeleccionado) => {
        //se simula la obtención de los horarios disponibles de la api
        return CONSTANTS.HORARIOS_DISPONIBLES;
    };

    const [horariosDisponibles, setHorariosDisponibles] = useState(obtenerHorariosDisponibles(fechaSeleccionada, comensalesSeleccionado));

    useEffect(() => {
        setHorariosDisponibles(obtenerHorariosDisponibles(fechaSeleccionada, comensalesSeleccionado));
    }, [fechaSeleccionada,comensalesSeleccionado]);
    
    const formatearFecha = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; 
        const day = date.getDate();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    };

    return (
        <>
            <img src={paso} />
            <SelectPersonas comensales={CONSTANTS.COMENSALES} setComensalesSeleccionado={setComensalesSeleccionado} comensalesSeleccionado={comensalesSeleccionado}/>
            <Leyenda texto1="Día seleccionado" texto2="Días disponibles"/>
            <Calendario fechaSeleccionada={fechaSeleccionada} setFechaSeleccionada={setFechaSeleccionada}/>
            <BotonesHorarios horariosDisponibles={horariosDisponibles} siguientePaso={siguientePaso} comensalesSeleccionado={comensalesSeleccionado} fechaSeleccionada={formatearFecha(fechaSeleccionada)} />
        </>
    )
}