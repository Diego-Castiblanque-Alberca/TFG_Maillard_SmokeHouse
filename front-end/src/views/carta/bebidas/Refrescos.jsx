import React from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { REFRESCOS } from "../../../utils/consts.js";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

export default function Refrescos() {
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.REFRESCOS}/>
                <Container className={"container-carta"}>
                {REFRESCOS.map((refresco, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={refresco.title}
                                    backgroundImage={refresco.backgroundImage}
                                    precio={refresco.precio}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}