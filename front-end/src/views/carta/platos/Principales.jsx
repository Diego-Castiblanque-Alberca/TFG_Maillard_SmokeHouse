import React , { useState, useEffect }from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

// Definimos el componente Principales
export default function Principales() {
    // Definimos el estado para los principales
    let [principales, setPrincipales] = useState([]);
    
    // Usamos useEffect para hacer una petición a la API cuando el componente se monta
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/platos/principales`)
            .then(response => response.json())
            .then(principales => setPrincipales(principales))
            .catch(error => console.error('Error:', error));
    }, []);

    // Renderizamos el componente
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.PRINCIPALES}/>
                <Container className={"container-carta"}>
                {/* Mapeamos los principales a componentes CardOpcionCarta */}
                {principales.map((principal, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={principal.titulo}
                                    backgroundImage={principal.imagen}
                                    precio={principal.precio}
                                    descripcion={principal.descripcion}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}