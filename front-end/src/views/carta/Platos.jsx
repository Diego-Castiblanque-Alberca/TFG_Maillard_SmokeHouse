import React from "react";
import {Header} from "../../components/HeaderNav.jsx";
import {Footer} from "../../components/Footer.jsx";
import { Container } from "../../components/Container.jsx";
import { CardCarta } from "../../components/carta/CardCarta.jsx";
import { PLATOS } from "../../utils/consts.js";
import { TituloCarta } from "../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../utils/consts.js";

export default function Platos() {
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.CARTA}/>
                <Container className={"container-carta"}>
                {PLATOS.map((plato, index) => {
                            return (
                                <CardCarta 
                                    key={index} 
                                    title={plato.title}
                                    backgroundImage={plato.backgroundImage}
                                    to={plato.to}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}