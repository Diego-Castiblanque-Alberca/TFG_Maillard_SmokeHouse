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
        // hay que mejorar esta lógica, ya que cuando porSentar es negativo, no se puede confirmar la reserva
        return porSentar === 0;
    }

    const isDisabled = (nombreMesa, detallesMesa) => {
        if(!detallesMesa.disponibilidad) return true;
    
        if(!mesasSeleccionadas.includes(nombreMesa)) {
            const porSentar = comensales - capacidadTotalSeleccionada;
            if(detallesMesa.capacidad - porSentar > 2) return true;
    
            const ultimaMesaSeleccionada = mesasSeleccionadas[mesasSeleccionadas.length - 1];
            const numeroMesa = parseInt(nombreMesa.replace('mesa', ''));
            const numeroUltimaMesaSeleccionada = parseInt(ultimaMesaSeleccionada?.replace('mesa', ''));
    
            if (ultimaMesaSeleccionada && numeroMesa !== numeroUltimaMesaSeleccionada + 1 && numeroMesa !== numeroUltimaMesaSeleccionada - 1) return true;
        }
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
                        disabled={isDisabled(nombreMesa, detallesMesa)}
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