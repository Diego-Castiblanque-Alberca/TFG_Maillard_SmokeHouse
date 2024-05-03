import React , {useEffect, useState} from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";

// Definimos el componente Entrantes
export default function Entrantes() {

    // Definimos el estado para los entrantes
    let [entrantes, setEntrantes] = useState([]);
    
    // Usamos useEffect para hacer una petición a la API cuando el componente se monta
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/platos/entrantes`)
            .then(response => response.json())
            .then(entrantes => setEntrantes(entrantes))
            .catch(error => console.error('Error:', error));
    }, []);

    // Renderizamos el componente
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.ENTRANTES}/>
                <Container className={"container-carta"}>
                {/* Mapeamos los entrantes a componentes CardOpcionCarta */}
                {entrantes.map((entrante, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={entrante.titulo}
                                    backgroundImage={entrante.imagen}
                                    precio={entrante.precio}
                                    descripcion={entrante.descripcion}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}