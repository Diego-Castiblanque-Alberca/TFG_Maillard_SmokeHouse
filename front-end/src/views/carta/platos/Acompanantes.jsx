import React, {useState, useEffect} from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

export default function Acompanantes() {
    let [acompanantes, setAcompanantes] = useState([]);
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/platos/acompanantes`)
            .then(response => response.json())
            .then(acompanantes => setAcompanantes(acompanantes))
            .catch(error => console.error('Error:', error));
    }, []);

    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.ACOMPANANTES}/>
                <Container className={"container-carta"}>
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