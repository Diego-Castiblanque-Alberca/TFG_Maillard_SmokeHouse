import React,{useEffect , useState} from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

// Definimos el componente Cervezas
export default function Cervezas() {
    // Definimos el estado para las cervezas
    let [cervezas, setCervezas] = useState([]);
    
    // Usamos useEffect para hacer una petición a la API cuando el componente se monta
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/bebidas/cervezas`)
            .then(response => response.json())
            .then(cervezas => setCervezas(cervezas))
            .catch(error => console.error('Error:', error));
    }, []);

    // Renderizamos el componente
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.CERVEZAS}/>
                <Container className={"container-carta"}>
                {/* Mapeamos las cervezas a componentes CardOpcionCarta */}
                {cervezas.map((cerveza, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={cerveza.titulo}
                                    backgroundImage={cerveza.imagen}
                                    precio={cerveza.precio}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}