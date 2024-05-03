import React, { useState, useEffect } from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

// Definimos el componente Vinos
export default function Vinos() {
    // Definimos el estado para los vinos
    let [vinos, setVinos] = useState([]);
    
    // Usamos useEffect para hacer una petición a la API cuando el componente se monta
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/bebidas/vinos`)
            .then(response => response.json())
            .then(vinos => setVinos(vinos))
            .catch(error => console.error('Error:', error));
    }, []);

    // Renderizamos el componente
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.VINOS}/>
                <Container className={"container-carta"}>
                {/* Mapeamos los vinos a componentes CardOpcionCarta */}
                {vinos.map((vino, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={vino.titulo}
                                    backgroundImage={vino.imagen}
                                    precio={vino.precio}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}