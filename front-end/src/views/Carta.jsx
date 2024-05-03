// Importamos los módulos necesarios
import React,{ useState, useEffect } from "react";
import { Header } from "../components/HeaderNav";
import { Footer } from "../components/Footer.jsx";
import { Container } from "../components/Container.jsx";
import { CardCarta } from "../components/carta/CardCarta.jsx";
import { TituloCarta } from "../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../utils/consts.js";

// Definimos el componente Carta
export default function Carta() {

    // Definimos el estado para la carta
    const [carta, setCarta] = useState([]);
    
    // Usamos useEffect para obtener la carta de la API cuando el componente se monta
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta`)
            .then(response => response.json())
            .then(carta => setCarta(carta))
            .catch(error => console.error('Error:', error));
    }, []);
        
    // Renderizamos el componente
    return (
        <>
            <Header />
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.CARTA}/>
                <Container className={"container-carta"}>
                    {/* Mapeamos la carta a componentes CardCarta */}
                        {carta.map((item, index) => {
                            return (
                                <CardCarta 
                                    key={index} 
                                    title={item.titulo}
                                    backgroundImage={item.imagen}
                                    redirige={item.redirige}
                                />
                            )
                        })}
                </Container>
            </Container>
            <Footer />
        </>
    )
}