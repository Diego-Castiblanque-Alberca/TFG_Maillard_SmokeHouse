import React from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { PRINCIPALES } from "../../../utils/consts.js";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

export default function Principales() {
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.PRINCIPALES}/>
                <Container className={"container-carta"}>
                {PRINCIPALES.map((principal, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={principal.title}
                                    backgroundImage={principal.backgroundImage}
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