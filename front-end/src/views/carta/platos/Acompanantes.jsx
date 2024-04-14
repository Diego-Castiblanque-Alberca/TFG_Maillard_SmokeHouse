import React from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { ACOMPANANTES } from "../../../utils/consts.js";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

export default function Acompanantes() {
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.ACOMPANANTES}/>
                <Container className={"container-carta"}>
                {ACOMPANANTES.map((acompanante, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={acompanante.title}
                                    backgroundImage={acompanante.backgroundImage}
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