import React from "react";
import { Link } from "react-router-dom";
import '../../styles/reservar/BotonesHorarios.css';

//por implementar, se podria usar la fecha actual para comprobrobar si el horario ya paso, por ejemplo si ya se esta
//en el fin del horario de la comida no se pintan los botones, solo los de la cena
export function BotonesHorarios({horariosDisponibles, siguientePaso , comensalesSeleccionado, fechaSeleccionada}) {
    const handleClick = (horario) => {
        siguientePaso({ horario , comensalesSeleccionado, fechaSeleccionada});
    };

    const botones = (horario) => {
        return Object.entries(horario).map(([horario, disponible], index) => {
            return (
                <Link 
                    onClick={() => disponible && handleClick(horario)} 
                    key={index} 
                    className={disponible ? 'boton-horario disponible' : 'boton-horario no-disponible'}
                    disabled={!disponible}
                >
                    {horario}
                </Link>
            );
        });
    }

    return (
        <div className="botones-horarios">
            <div className="botones-horarios-comida">
                <p>Comida</p>
                {botones(horariosDisponibles.comida)}
            </div>
            <div className="botones-horarios-comida">
                <p>Cena</p>
                {botones(horariosDisponibles.cena)}
            </div>
        </div>
    )
}