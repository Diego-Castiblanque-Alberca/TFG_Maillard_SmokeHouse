import React from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { POSTRES } from "../../../utils/consts.js";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

export default function Postres() {
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.POSTRES}/>
                <Container className={"container-carta"}>
                {POSTRES.map((postre, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={postre.title}
                                    backgroundImage={postre.backgroundImage}
                                    precio={postre.precio}
                                    descripcion={postre.descripcion}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}