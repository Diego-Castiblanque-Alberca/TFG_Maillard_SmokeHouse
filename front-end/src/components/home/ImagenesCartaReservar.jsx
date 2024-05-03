import React from "react";
import { Link } from "react-router-dom";
import preparaLaParrilla from "../../imgs/prepara-la-parrilla.svg";
import fuelle from "../../imgs/fuelle.svg";
import "../../styles/home/ImagenesCartaReservar.css";

// Definimos el componente ImagenesCartaReservar
export function ImagenesCartaReservar() {
    // Retornamos un div que contiene dos divs, cada uno con una imagen y un Link a una ruta diferente
    return (
        <div className="imagenes-carta-reservar">
            <div className="imagen-carta">
                <div className="contenedor-imagen-carta">
                    {/* Mostramos la imagen preparaLaParrilla */}
                    <img src={preparaLaParrilla} alt="" />
                    {/* Mostramos un Link que redirige a la ruta '/carta'*/}
                    <Link to="/carta">
                        <h3>Ver Carta</h3>
                        <img src={fuelle} alt="" />
                    </Link>
                </div>
            </div>
            <div className="imagen-reservar">
                {/* Mostramos un Link que redirige a la ruta '/reservar'*/}
                <Link to="/reservar">
                    <h3>Reservar</h3>
                </Link>
            </div>
        </div>
    );
}