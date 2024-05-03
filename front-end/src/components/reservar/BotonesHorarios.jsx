import React from "react";
import '../../styles/reservar/BotonesHorarios.css';

//por implementar, se podria usar la fecha actual para comprobrobar si el horario ya paso, por ejemplo si ya se esta
//en el fin del horario de la comida no se pintan los botones, solo los de la cena

// Definimos el componente BotonesHorarios que recibe como props horariosDisponibles, siguientePaso, comensalesSeleccionado y fechaSeleccionada
export function BotonesHorarios({horariosDisponibles, siguientePaso , comensalesSeleccionado, fechaSeleccionada}) {
    // Definimos la función manejarClick que llama a siguientePaso con un objeto que contiene el horario, comensalesSeleccionado y fechaSeleccionada
    const manejarClick = (horario) => {
        siguientePaso({ horario , comensalesSeleccionado, fechaSeleccionada});
    };

    // Dividimos horariosDisponibles en horariosComida y horariosCena
    const horariosComida = horariosDisponibles.slice(0,9);
    const horariosCena = horariosDisponibles.slice(9);

    // Definimos la función botones que retorna botones a partir de un array de horarios
    const botones = (horarios) => {
        return horarios.map((horario, index) => {
            return (
                <button 
                    /* Al hacer click en el botón llamamos a manejarClick con el horario */
                    onClick={() => manejarClick(horario.horario)}
                    key={index} 
                    /* La clase del botón depende de si el horario está disponible o no */
                    className={horario.disponible ? 'boton-horario disponible' : 'boton-horario no-disponible'}
                    /* El botón está deshabilitado si el horario no está disponible */
                    disabled={!horario.disponible}
                >
                    {horario.horario}
                </button>
            );
        });
    }

    // Retornamos un div que contiene dos divs, cada uno con un p y los botones correspondientes a horariosComida y horariosCena
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
