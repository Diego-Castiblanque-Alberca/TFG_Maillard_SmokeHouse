import React,{ useState, useEffect } from "react";
import { Header } from "../components/HeaderNav";
import { Footer } from "../components/Footer.jsx";
import { Container } from "../components/Container.jsx";
import { CardCarta } from "../components/carta/CardCarta.jsx";
import { TituloCarta } from "../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../utils/consts.js";

export default function Carta() {

    const [carta, setCarta] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta`)
            .then(response => response.json())
            .then(carta => setCarta(carta))
            .catch(error => console.error('Error:', error));
    }, []);
        
    return (
        <>
            <Header />
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.CARTA}/>
                <Container className={"container-carta"}>
                        {carta.map((item, index) => {
                            return (
                                <CardCarta 
                                    key={index} 
                                    title={item.titulo}
                                    backgroundImage={item.imagen}
                                    to={item.redirige}
                                />
                            )
                        })}
                </Container>
            </Container>
            <Footer />
        </>
    )
}