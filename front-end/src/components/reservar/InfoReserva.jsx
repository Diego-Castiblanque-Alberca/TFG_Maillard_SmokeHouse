import React from "react";
import calendario from "../../imgs/calendario.svg";
import users from "../../imgs/users.svg";
import location from "../../imgs/location.svg";

import "../../styles/reservar/InfoReserva.css";

export default function InfoReserva({datos}) {
    
    const desFormatearFecha = (fecha) => {
        const [año, mes, dia] = fecha.split("-");
        return new Date(año, mes-1, dia);  
    }

    const fecha = desFormatearFecha(datos.fechaSeleccionada);
    const horario = datos.horario;
    const comensales = datos.comensalesSeleccionado;



    return (
        <div className="datos-reserva">
            <div className="dato-reserva">
                <img src={calendario} alt="" />
                <p>{fecha.getDate()}/{fecha.getMonth()+1}/{fecha.getFullYear()}, {horario}h.</p>
            </div>
            <div className="dato-reserva">
                <img src={users} alt="" />
                <p>{comensales} personas.</p>
            </div>
            <div className="dato-reserva">
                <img src={location} alt="" />
                <p>Calle de Villablanca, 79, Madrid.</p>
            </div>
        </div>
    )
}