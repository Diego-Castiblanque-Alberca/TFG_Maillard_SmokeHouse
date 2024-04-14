import React from "react";
import '../../styles/reservar/Leyenda.css';

export default function Leyenda({texto1,texto2,texto3}) {
    return (
        <div className="leyenda">
            <div className="leyenda-disponible">
                <figure></figure>
                <p>{texto1}</p>
            </div>
            <div className="leyenda-noDisponible">
                <figure></figure>
                <p>{texto2}</p>
            </div>
            {texto3 &&
            <div className="leyenda-seleccionado">
                <figure></figure>
                <p>{texto3}</p>
            </div>}
        </div>
    )
}