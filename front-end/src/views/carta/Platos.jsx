import React ,{ useState, useEffect } from "react";
import {Header} from "../../components/HeaderNav.jsx";
import {Footer} from "../../components/Footer.jsx";
import { Container } from "../../components/Container.jsx";
import { CardCarta } from "../../components/carta/CardCarta.jsx";
import { TituloCarta } from "../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../utils/consts.js";

export default function Platos() {
    
    const [platos, setPlatos] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/platos`)
            .then(response => response.json())
            .then(platos => setPlatos(platos))
            .catch(error => console.error('Error:', error));
    }, []);

    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.CARTA}/>
                <Container className={"container-carta"}>
                {platos.map((plato, index) => {
                            return (
                                <CardCarta 
                                    key={index} 
                                    title={plato.titulo}
                                    backgroundImage={plato.imagen}
                                    to={plato.redirige}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}