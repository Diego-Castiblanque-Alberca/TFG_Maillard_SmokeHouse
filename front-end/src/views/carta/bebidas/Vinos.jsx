import React from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { VINOS } from "../../../utils/consts.js";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

export default function Vinos() {
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.VINOS}/>
                <Container className={"container-carta"}>
                {VINOS.map((vino, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={vino.title}
                                    backgroundImage={vino.backgroundImage}
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