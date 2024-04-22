import React , {useState, useEffect} from "react";
import {Header} from "../../../components/HeaderNav.jsx";
import {Footer} from "../../../components/Footer.jsx";
import { Container } from "../../../components/Container.jsx";
import { CardOpcionCarta } from "../../../components/carta/CardOpcionCarta.jsx";
import { TituloCarta } from "../../../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../../../utils/consts.js";

export default function Postres() {
    let [postres, setPostres] = useState([]);
    
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/carta/platos/postres`)
            .then(response => response.json())
            .then(postres => setPostres(postres))
            .catch(error => console.error('Error:', error));
    }, []);


    return(
        <>
            <Header/>
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.POSTRES}/>
                <Container className={"container-carta"}>
                {postres.map((postre, index) => {
                            return (
                                <CardOpcionCarta 
                                    key={index} 
                                    title={postre.titulo}
                                    backgroundImage={postre.imagen}
                                    precio={postre.precio}
                                    descripcion={postre.descripcion}
                                />
                            )
                        })}
                </Container> 
            </Container>
            <Footer/>
        </>
    )
}