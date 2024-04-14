import React, { useState } from "react";
import '../../styles/reservar/Mesas.css';

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
                        {parseInt(nombreMesa.replace('mesa-', ''))}
                    </button>
                ))}
            </div>
            {puedeConfirmarReserva() && <button onClick={confirmarSeleccion}>Confirmar selección</button>}
        </>
    );
}