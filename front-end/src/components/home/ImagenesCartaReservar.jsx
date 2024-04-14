import React from "react";
import { Link } from "react-router-dom";
import preparaLaParrilla from "../../imgs/prepara-la-parrilla.svg";
import fuelle from "../../imgs/fuelle.svg";
import "../../styles/home/ImagenesCartaReservar.css";

export function ImagenesCartaReservar() {
    return (
        <div className="imagenes-carta-reservar">
            <div className="imagen-carta">
                <div className="contenedor-imagen-carta">
                    <img src={preparaLaParrilla} alt="" />
                    <Link to="/carta">
                        <h3>Ver Carta</h3>
                        <img src={fuelle} alt="" />
                    </Link>
                </div>
            </div>
            <div className="imagen-reservar">
                <Link to="/reservar">
                    <h3>Reservar</h3>
                </Link>
            </div>
        </div>
    );
}