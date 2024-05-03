import React , {useEffect, useState }from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

// Definimos el componente Cocktails
export default function Cocktails() {
    // Definimos el estado para los cocktails
    let [cocktails, setCocktails] = useState([]);
    
    // Usamos useEffect para hacer una petición a la API cuando el componente se monta
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/bebidas/cocktails`)
            .then(response => response.json())
            .then(cocktails => setCocktails(cocktails))
            .catch(error => console.error('Error:', error));
    }, []);

    // Renderizamos el componente
    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.COCKTAILS}/>
                <Container className={"container-carta"}>
                {/* Mapeamos los cocktails a componentes CardOpcionCarta */}
                {cocktails.map((cocktail, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={cocktail.titulo}
                                    backgroundImage={cocktail.imagen}
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