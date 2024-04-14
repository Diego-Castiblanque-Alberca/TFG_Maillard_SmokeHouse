import React from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { ENTRANTES, SUBTITULO } from "../../../utils/consts.js";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";

export default function Entrantes() {
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.ENTRANTES}/>
                <Container className={"container-carta"}>
                {ENTRANTES.map((Entrante, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={Entrante.title}
                                    backgroundImage={Entrante.backgroundImage}
                                    precio={Entrante.precio}
                                    descripcion={Entrante.descripcion}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}