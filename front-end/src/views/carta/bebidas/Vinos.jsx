import React, { useState, useEffect } from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

export default function Vinos() {
    let [vinos, setVinos] = useState([]);
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/bebidas/vinos`)
            .then(response => response.json())
            .then(vinos => setVinos(vinos))
            .catch(error => console.error('Error:', error));
    }, []);

    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.VINOS}/>
                <Container className={"container-carta"}>
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