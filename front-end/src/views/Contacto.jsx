import { Header } from "../components/HeaderNav"; 
import { Footer } from "../components/Footer.jsx";
import { Container } from "../components/Container.jsx";
import { ContactoInfoGroup } from "../components/contacto/ContactoInfoGroup.jsx";
import SobreNosotros from "../components/contacto/SobreNosotros.jsx";
import { useEffect } from "react";
export default function Contacto() {
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
            <Header />
            <Container className={"container-contacto container"}>
                <SobreNosotros />
                <ContactoInfoGroup />
            </Container>
            <Footer />
        </>
    )
}