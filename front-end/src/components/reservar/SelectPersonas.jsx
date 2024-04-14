import React from 'react';
import '../../styles/reservar/SelectPersonas.css';

const crearOptions = (comensales) => {
    const options = [];
    for (let i = 1; i <= comensales; i++) {
        options.push(<option key={i} value={i} className="option-comensales">{i} persona(s)</option>);
    }
    return options;
}

export function SelectPersonas({comensales, setComensalesSeleccionado, comensalesSeleccionado}) {
    const manejarCambioDeSeleccion = (event) => {
        setComensalesSeleccionado(Number(event.target.value)); 
    };

    return (
        <select className="select-comensales" onChange={manejarCambioDeSeleccion} value={comensalesSeleccionado}>
            {crearOptions(comensales)}
        </select>
    );
}