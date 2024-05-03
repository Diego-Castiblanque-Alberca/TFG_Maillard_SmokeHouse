import React, {useState, useEffect} from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

// Definimos el componente Acompanantes
export default function Acompanantes() {
    // Definimos el estado para los acompañantes
    let [acompanantes, setAcompanantes] = useState([]);
    
    // Usamos useEffect para hacer una petición a la API cuando el componente se monta
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/platos/acompanantes`)
            .then(response => response.json())
            .then(acompanantes => setAcompanantes(acompanantes))
            .catch(error => console.error('Error:', error));
    }, []);

    // Renderizamos el componente
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.ACOMPANANTES}/>
                <Container className={"container-carta"}>
                {/* Mapeamos los acompañantes a componentes CardOpcionCarta */}
                {acompanantes.map((acompanante, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={acompanante.titulo}
                                    backgroundImage={acompanante.imagen}
                                    precio={acompanante.precio}
                                    descripcion={acompanante.descripcion}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}