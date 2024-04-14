import React from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { CERVEZAS } from "../../../utils/consts.js";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

export default function Cervezas() {
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.CERVEZAS}/>
                <Container className={"container-carta"}>
                {CERVEZAS.map((cerveza, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={cerveza.title}
                                    backgroundImage={cerveza.backgroundImage}
                                    precio={cerveza.precio}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}