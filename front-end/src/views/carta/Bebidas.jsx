import React ,{ useState, useEffect } from "react";
import {Header} from "../../components/HeaderNav.jsx";
import {Footer} from "../../components/Footer.jsx";
import { Container } from "../../components/Container.jsx";
import { CardCarta } from "../../components/carta/CardCarta.jsx";
import { TituloCarta } from "../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../utils/consts.js";

export default function Bebidas() {
    
    const [bebidas, setBebidas] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/bebidas`)
            .then(response => response.json())
            .then(bebidas => setBebidas(bebidas))
            .catch(error => console.error('Error:', error));
    }, []);

    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.CARTA}/>
                <Container className={"container-carta"}>
                {bebidas.map((bebida, index) => {
                            return (
                                <CardCarta 
                                    key={index} 
                                    title={bebida.titulo}
                                    backgroundImage={bebida.imagen}
                                    to={bebida.redirige}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}