import { Container } from "../components/Container";
import '../styles/Container.css';
import { HeaderPo } from "../components/politicas/HeaderPo"; 
import { AvisoLegal } from "../components/politicas/AvisoLegal";
import { Cookies } from "../components/politicas/Cookies";
import { Privacidad } from "../components/politicas/Privacidad";
import { useEffect } from "react";
import { CondicionesReserva } from "../components/politicas/CondicionesReserva";
export function Politicas() {
    useEffect(() => {
        const hash = window.location.hash.slice(1); // Remove the '#' character from the hash
        if (hash) {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, []);

    return (
        <>
            <HeaderPo />
            <Container className={"container-politicas"}>
                <AvisoLegal />
                <Privacidad />
                <Cookies />
                <CondicionesReserva />
            </Container>
        </>
    );
};

export default Politicas;