import { Header } from "../components/HeaderNav";
import { Footer } from "../components/Footer.jsx";
import { Container } from "../components/Container.jsx";
import { ContactoInfoGroup } from "../components/contacto/ContactoInfoGroup.jsx";





export default function Contacto() {

    
    return (
        <>
            <Header />
            <Container className={"container-contacto container"}>
                <ContactoInfoGroup />
            </Container>
            <Footer />
        </>
    )
}