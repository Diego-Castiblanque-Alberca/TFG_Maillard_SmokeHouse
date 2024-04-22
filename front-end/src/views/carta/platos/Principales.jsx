import React , { useState, useEffect }from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

export default function Principales() {
    let [principales, setPrincipales] = useState([]);
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/platos/principales`)
            .then(response => response.json())
            .then(principales => setPrincipales(principales))
            .catch(error => console.error('Error:', error));
    }, []);


    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.PRINCIPALES}/>
                <Container className={"container-carta"}>
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