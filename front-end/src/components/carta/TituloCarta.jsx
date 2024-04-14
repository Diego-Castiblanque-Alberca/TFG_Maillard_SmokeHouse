import React from "react";
import parrillaPreparada from "../../imgs/parrilla-preparada.svg";
import "../../styles/carta/TituloCarta.css";

export function TituloCarta({texto}) {
    return (
        <>
            <img src={parrillaPreparada} alt="" />
            <h2 className="carta-subtitulo">{texto}</h2>
        </>
    );
}