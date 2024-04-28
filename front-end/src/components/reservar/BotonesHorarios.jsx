import React from "react";
import '../../styles/reservar/BotonesHorarios.css';

//por implementar, se podria usar la fecha actual para comprobrobar si el horario ya paso, por ejemplo si ya se esta
//en el fin del horario de la comida no se pintan los botones, solo los de la cena
export function BotonesHorarios({horariosDisponibles, siguientePaso , comensalesSeleccionado, fechaSeleccionada}) {
    const handleClick = (horario) => {
        siguientePaso({ horario , comensalesSeleccionado, fechaSeleccionada});
    };

    const horariosComida = horariosDisponibles.slice(0,9);
    const horariosCena = horariosDisponibles.slice(9);

    const botones = (horarios) => {
        return horarios.map((horario, index) => {
            return (
                <button 
                    onClick={() => horario.disponible && handleClick(horario.horario)} 
                    key={index} 
                    className={horario.disponible ? 'boton-horario disponible' : 'boton-horario no-disponible'}
                    disabled={!horario.disponible}
                >
                    {horario.horario}
                </button>
            );
        });
    }


    return (
        <div className="botones-horarios">
            <div className="botones-horarios-comida">
                <p>Comida</p>
                {botones(horariosComida)}
            </div>
            <div className="botones-horarios-comida">
                <p>Cena</p>
                {botones(horariosCena)}
            </div>
        </div>
    )
}