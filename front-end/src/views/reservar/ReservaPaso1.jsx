import React, { useState , useEffect } from 'react';
import { Calendario } from "../../components/reservar/Calendario";
import { BotonesHorarios } from "../../components/reservar/BotonesHorarios";
import { COMENSALES } from "../../utils/consts";
import "../../styles/reservar/SelectPersonas.css";
import paso from "../../imgs/paso1.svg";
import Leyenda from "../../components/reservar/leyenda";

// Definimos el componente ReservaPaso1
export default function ReservaPaso1({siguientePaso}) {
    // Definimos el estado para la fecha seleccionada, los comensales seleccionados y los horarios disponibles
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(hoy);
    const [comensalesSeleccionado, setComensalesSeleccionado] = useState(2);
    const [horariosDisponibles, setHorariosDisponibles] = useState([]);

    // Usamos useEffect para obtener los horarios disponibles cuando la fecha seleccionada cambia
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/reserva`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fecha: formatearFecha(fechaSeleccionada), 
            }),
        })
            .then(response => response.json())
            .then(horarios => setHorariosDisponibles(horarios))
            .catch(error => console.error('Error:', error));
    }, [fechaSeleccionada]);

    // Definimos la función para formatear la fecha
    const formatearFecha = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; 
        const day = date.getDate();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    };

    // Definimos la función para crear las opciones de comensales
    const crearOptions = (comensales) => {
        const options = [];
        for (let i = 1; i <= comensales; i++) {
            options.push(<option key={i} value={i} className="option-comensales">{i} persona(s)</option>);
        }
        return options;
    }

    // Renderizamos el componente
    return (
        <>
            <img src={paso} />
            <select className="select-comensales" onChange={(event=>setComensalesSeleccionado(event.target.value))} value={comensalesSeleccionado}>
                {crearOptions(COMENSALES)}
            </select>
            <Leyenda texto1="Día seleccionado" texto2="Días disponibles"/>
            <Calendario fechaSeleccionada={fechaSeleccionada} setFechaSeleccionada={setFechaSeleccionada}/>
            <BotonesHorarios horariosDisponibles={horariosDisponibles} siguientePaso={siguientePaso} comensalesSeleccionado={comensalesSeleccionado} fechaSeleccionada={formatearFecha(fechaSeleccionada)} />
        </>
    )
}