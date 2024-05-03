import React ,{ useState, useEffect } from "react";
import {Header} from "../../components/HeaderNav.jsx";
import {Footer} from "../../components/Footer.jsx";
import { Container } from "../../components/Container.jsx";
import { CardCarta } from "../../components/carta/CardCarta.jsx";
import { TituloCarta } from "../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../utils/consts.js";

// Definimos el componente Bebidas
export default function Bebidas() {
    
    // Definimos el estado para las bebidas
    const [bebidas, setBebidas] = useState([]);

    // Usamos useEffect para hacer una petición a la API cuando el componente se monta
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/bebidas`)
            .then(response => response.json())
            .then(bebidas => setBebidas(bebidas))
            .catch(error => console.error('Error:', error));
    }, []);

    // Renderizamos el componente
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.CARTA}/>
                <Container className={"container-carta"}>
                {/* Mapeamos las bebidas a componentes CardCarta */}
                {bebidas.map((bebida, index) => {
                            return (
                                <CardCarta 
                                    key={index} 
                                    title={bebida.titulo}
                                    backgroundImage={bebida.imagen}
                                    redirige={bebida.redirige}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}