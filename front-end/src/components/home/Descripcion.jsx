import React from "react";
import logo from "../../imgs/logo.svg";
import "../../styles/home/Descripcion.css";
export function Descripcion() {
    return (
        <div className="descripcion__container">
            <div className="descripcion__texto">
                <h3 className="descripcion__titulo">En <span>Maillard SmokeHouse</span>, la pasión por la carne a la parrilla se eleva a un arte.</h3>
                <p className="descripcion__parrafo">Nuestras brasas, cuidadosamente alimentadas con maderas nobles, impregnan cada corte con un aroma ahumado irresistible que despierta el apetito al instante. Seleccionamos carnes de primera calidad, provenientes de proveedores locales, para garantizar una experiencia gastronómica sin igual.
                    <br/>Más que un restaurante, Maillard Smokehouse es un templo dedicado al sabor.</p>
            </div>
            <img src={logo} alt="Logo" className="descripcion__logo" />
        </div>
    )
}
