import React from "react";
import parrillaPreparada from "../../imgs/parrilla-preparada.svg";
import "../../styles/carta/TituloCarta.css";

// Definimos el componente TituloCarta que recibe como prop el texto
export function TituloCarta({texto}) {
    // Retornamos un fragmento que contiene una imagen y un h2 con el texto
    return (
        <>
            {/* Mostramos la imagen parrillaPreparada */}
            <img src={parrillaPreparada} alt="" />
            {/* Mostramos el texto en un h2 con la clase 'carta-subtitulo' */}
            <h2 className="carta-subtitulo">{texto}</h2>
        </>
    );
}