import React from "react";
import cruzado from "../../imgs/close.svg";
import "../../styles/home/Videos.css";
export function Videos() {
    return (
        <div className="videos__container">
            <div className="video1"></div>
            <div className="video2">
                <div className="videos__textos">
                    <h2 className="video2__titulo">Maillard SmokeHouse</h2>
                    <div className="video2__iconos">
                        <img src={cruzado} alt="Cruzado" />
                        <img src={cruzado} alt="Cruzado" />
                        <img src={cruzado} alt="Cruzado" />
                    </div>
                    <p className="video2__descripcion">El humo es el alma de la parrilla, y en Maillard SmokeHouse lo dominamos a la perfección.</p>
                </div>
            </div>
        </div>
    )
}