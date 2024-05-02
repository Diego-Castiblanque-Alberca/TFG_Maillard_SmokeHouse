import React, { useState } from "react";
import capacidad2 from "../../imgs/mesa2.svg";
import capacidad2selected from "../../imgs/mesa2selected.svg";
import capacidad2disabled from "../../imgs/mesa2disabled.svg";
import capacidad4 from "../../imgs/mesa4.svg";
import capacidad4selected from "../../imgs/mesa4selected.svg";
import capacidad4disabled from "../../imgs/mesa4disabled.svg";
import capacidad6 from "../../imgs/mesa6.svg";
import capacidad6selected from "../../imgs/mesa6selected.svg";
import capacidad6disabled from "../../imgs/mesa6disabled.svg";
import capacidad8 from "../../imgs/mesa8.svg";
import capacidad8selected from "../../imgs/mesa8selected.svg";
import capacidad8disabled from "../../imgs/mesa8disabled.svg";
import '../../styles/reservar/Mesas.css';

const images = {
    capacidad2,
    capacidad2selected,
    capacidad2disabled,
    capacidad4,
    capacidad4selected,
    capacidad4disabled,
    capacidad6,
    capacidad6selected,
    capacidad6disabled,
    capacidad8,
    capacidad8selected,
    capacidad8disabled
};

const mesasContiguas = {
    1: [2, 4],
    2: [1, 5, 3],
    3: [2, 6],
    4: [1, 5, 7],
    5: [2, 4, 6, 8],
    6: [3, 5, 9],
    7: [4, 8],
    8: [5, 7, 9],
    9: [6, 8]
};


// Leyenda para informar de que se pueden juntar mesas
export default function Mesas({ mesas, datos, siguientePaso }) {
    const [mesasSeleccionadas, setMesasSeleccionadas] = useState([]);


    const seleccionarMesa = (nombreMesa) => {
        setMesasSeleccionadas(prevMesas => {
            if (prevMesas.includes(nombreMesa)) {
                // Si la mesa ya está seleccionada, la deseleccionamos
                return prevMesas.filter(mesa => mesa !== nombreMesa);
            } else {
                // Si la mesa no está seleccionada, la seleccionamos
                return [...prevMesas, nombreMesa];
            }
        });
    };

    const confirmarSeleccion = () => {
        const nuevosDatos = { ...datos, mesasSeleccionadas };
        siguientePaso(nuevosDatos);
    };

    const puedeConfirmarReserva = () => {
        const porSentar = comensales - capacidadTotalSeleccionada;
        if(porSentar <= 0) return true;

    }

    const isDisabled = (nombreMesa, detallesMesa, indice) => {
        // Si la mesa está reservada, la deshabilitamos, a evaluar lo seguido del OR
        if(!detallesMesa.disponibilidad || (mesasSeleccionadas.length==2 && !mesasSeleccionadas.includes(nombreMesa))) return true;

        // evaluar si la capacidad de esta mesa en cuestion mas la de las continuas son suficientes para los comensales

        // Si la mesa no está seleccionada, se sigue evaluando
        if(!mesasSeleccionadas.includes(nombreMesa)) {

            const porSentar = comensales - capacidadTotalSeleccionada;

            // si no quedan comensales por sentar y la mesa no está seleccionada, la deshabilitamos
            if(porSentar === 0) return true;

            // si la mesa no tiene capacidad suficiente para los comensales que quedan por sentar, la deshabilitamos
            // solo se podrán dejar dos asientos libres
            if(detallesMesa.capacidad - porSentar > 2) return true;
    
            const mesaSeleccionada = mesasSeleccionadas[0];
            const numeroMesa = parseInt(nombreMesa.replace('mesa-', ''));
            const numeroMesaSeleccionada = parseInt(mesaSeleccionada?.replace('mesa-', ''));
    
            // si la mesa no es la siguiente o la anterior a la última mesa seleccionada, la deshabilitamos
            if (mesaSeleccionada && !mesasContiguas[numeroMesaSeleccionada].includes(numeroMesa)) return true;
        }
        // si la mesa está seleccionada, no la deshabilitamos
        return false;
    };

    const comensales = datos.comensalesSeleccionado;
    const capacidadTotalSeleccionada = mesasSeleccionadas.reduce((total, mesa) => total + mesas[mesa].capacidad, 0);

    return (
        <>
            <div className="mesas">
                {Object.entries(mesas).map(([nombreMesa, detallesMesa], indice) => (
                    <button
                        key={nombreMesa}
                        className={`${nombreMesa} ${mesasSeleccionadas.includes(nombreMesa) ? "seleccionada" : ""} ${detallesMesa.disponibilidad ? "disponible" : "no-disponible"}`}
                        disabled={isDisabled(nombreMesa, detallesMesa, indice)}
                        onClick={(e) => {
                            e.preventDefault();
                            seleccionarMesa(nombreMesa)
                        }
                        }
                    >
                        <img 
                        src={
                            isDisabled(nombreMesa, detallesMesa) ? images[`capacidad${detallesMesa.capacidad}disabled`] :
                            mesasSeleccionadas.includes(nombreMesa) ? images[`capacidad${detallesMesa.capacidad}selected`] : 
                            images[`capacidad${detallesMesa.capacidad}`]
                            } 
                        alt="" />
                    </button>
                ))}
            </div>
            {puedeConfirmarReserva() && <button className="boton-confirmar" onClick={confirmarSeleccion}>Confirmar selección</button>}
        </>
    );
}