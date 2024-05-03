import React, { useState, useEffect } from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

// Definimos el componente Refrescos
export default function Refrescos() {
    // Definimos el estado para los refrescos
    let [refrescos, setRefrescos] = useState([]);
    
    // Usamos useEffect para hacer una petición a la API cuando el componente se monta
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/bebidas/refrescos`)
            .then(response => response.json())
            .then(refrescos => setRefrescos(refrescos))
            .catch(error => console.error('Error:', error));
    }, []);

    // Renderizamos el componente
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.REFRESCOS}/>
                <Container className={"container-carta"}>
                {/* Mapeamos los refrescos a componentes CardOpcionCarta */}
                {refrescos.map((refresco, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={refresco.titulo}
                                    backgroundImage={refresco.imagen}
                                    precio={refresco.precio}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}