import React, { useState , useEffect} from "react";
import '../../styles/reservar/Mesas.css';
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

// Creamos un objeto para facilitar el acceso a las imágenes de las mesas
const imagenMesa = {
    2: {
        default: capacidad2,
        selected: capacidad2selected,
        disabled: capacidad2disabled
    },
    4: {
        default: capacidad4,
        selected: capacidad4selected,
        disabled: capacidad4disabled
    },
    6: {
        default: capacidad6,
        selected: capacidad6selected,
        disabled: capacidad6disabled
    },
    8: {
        default: capacidad8,
        selected: capacidad8selected,
        disabled: capacidad8disabled
    }
};

// Creamos un objeto que define qué mesas son contiguas entre sí
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

// Definimos el componente Mesas
export default function Mesas({ mesas, datos, siguientePaso }) {
    // Definimos el estado para las mesas seleccionadas
    const [mesasSeleccionadas, setMesasSeleccionadas] = useState([]);
    // Extraemos el número de comensales de los datos
    const comensales = datos.comensalesSeleccionado;
    // Calculamos la capacidad total de las mesas seleccionadas
    const capacidadTotalSeleccionada = mesasSeleccionadas.reduce((total, mesa) => total + mesas[mesa].capacidad, 0);
    // Definimos el estado para el mensaje de error
    const [mensajeError, setMensajeError] = useState("");


    // Definimos la función para seleccionar/deseleccionar una mesa
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

    // Definimos la función para confirmar la selección de las mesas
    const confirmarSeleccion = () => {
        const nuevosDatos = { ...datos, mesasSeleccionadas };
        siguientePaso(nuevosDatos);
    };

    // Definimos un efecto para comprobar si al seleccionar dos mesas quedan personas por sentar
    useEffect(() => {
        if(mesasSeleccionadas.length === 2 && comensales > capacidadTotalSeleccionada) {
            setMensajeError("Quedan personas por sentar y no puedes seleccionar más de dos mesas");
        } else {
            setMensajeError("");
        }
    }, [mesasSeleccionadas, comensales, capacidadTotalSeleccionada]);

    // Definimos la función para comprobar si se puede confirmar la reserva
    const puedeConfirmarReserva = () => {
        const porSentar = comensales - capacidadTotalSeleccionada;
        return porSentar <= 0;
    }

    // Definimos la función para comprobar si una mesa está deshabilitada
    const isDisabled = (nombreMesa, detallesMesa) => {
        // Si la mesa no está disponible o ya se han seleccionado dos mesas y esta no es una de ellas, la deshabilitamos
        if(!detallesMesa.disponibilidad || (mesasSeleccionadas.length==2 && !mesasSeleccionadas.includes(nombreMesa))) return true;

        // Si la mesa no está seleccionada, comprobamos si su capacidad es suficiente para los comensales que quedan por sentar
        if(!mesasSeleccionadas.includes(nombreMesa)) {
            const porSentar = comensales - capacidadTotalSeleccionada;
            // Si no quedan comensales por sentar o la mesa no tiene capacidad suficiente para los comensales que quedan por sentar, la deshabilitamos
            if(porSentar === 0 || detallesMesa.capacidad - porSentar > 2) return true;

            // Si la mesa no es contigua a la última mesa seleccionada, la deshabilitamos
            const mesaSeleccionada = mesasSeleccionadas[0];
            const numeroMesa = parseInt(nombreMesa.replace('mesa-', ''));
            const numeroMesaSeleccionada = parseInt(mesaSeleccionada?.replace('mesa-', ''));
            if (mesaSeleccionada && !mesasContiguas[numeroMesaSeleccionada].includes(numeroMesa)) return true;
        }
        // Si la mesa está seleccionada, no la deshabilitamos
        return false;
    };

    // Renderizamos el componente
    return (
        <>
            {/* Mapeamos las mesas y creamos un botón para cada una */}
            <div className="mesas">
                {Object.entries(mesas).map(([nombreMesa, detallesMesa]) => {
                    // Comprobamos si la mesa está deshabilitada
                    const disabled = isDisabled(nombreMesa, detallesMesa);
                    // Comprobamos si la mesa está seleccionada
                    const selected = mesasSeleccionadas.includes(nombreMesa);
                    // Elegimos la imagen de la mesa en función de su estado
                    const image = imagenMesa[detallesMesa.capacidad][disabled ? 'disabled' : selected ? 'selected' : 'default'];
    
                    return (
                        // Creamos el botón de la mesa
                        <button
                            key={nombreMesa}
                            className={`${nombreMesa} ${selected ? "seleccionada" : ""} ${detallesMesa.disponibilidad ? "disponible" : "no-disponible"}`}
                            disabled={disabled}
                            onClick={(e) => {
                                e.preventDefault();
                                seleccionarMesa(nombreMesa)
                            }}
                        >
                            {/* Mostramos la imagen de la mesa */}
                            <img src={image} alt="" />
                        </button>
                    )
                })}
            </div>
            {/* Si existe algun error, lo mostramos */}
            {mensajeError&&<p className="mensaje-error">{mensajeError}</p>}
            {/* Si se puede confirmar la reserva, mostramos el botón de confirmación */}
            {puedeConfirmarReserva() && <button className="boton-confirmar" onClick={confirmarSeleccion}>Confirmar selección</button>}
        </>
    );
}