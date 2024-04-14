import React from "react";
import {Header} from "../../components/HeaderNav.jsx";
import {Footer} from "../../components/Footer.jsx";
import { Container } from "../../components/Container.jsx";
import { CardCarta } from "../../components/carta/CardCarta.jsx";
import { BEBIDAS } from "../../utils/consts.js";
import { TituloCarta } from "../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../utils/consts.js";

export default function Bebidas() {
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.CARTA}/>
                <Container className={"container-carta"}>
                {BEBIDAS.map((bebida, index) => {
                            return (
                                <CardCarta 
                                    key={index} 
                                    title={bebida.title}
                                    backgroundImage={bebida.backgroundImage}
                                    to={bebida.to}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}