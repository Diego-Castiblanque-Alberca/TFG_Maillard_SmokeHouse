import React from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { COCKTAILS } from "../../../utils/consts.js";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

export default function Cocktails() {
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.COCKTAILS}/>
                <Container className={"container-carta"}>
                {COCKTAILS.map((cocktail, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={cocktail.title}
                                    backgroundImage={cocktail.backgroundImage}
                                    precio={cocktail.precio}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}