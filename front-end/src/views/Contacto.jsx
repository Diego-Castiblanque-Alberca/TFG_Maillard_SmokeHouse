import { HeaderPo } from "../components/politicas/HeaderPo.jsx";
import { Footer } from "../components/Footer.jsx";
import { Container } from "../components/Container.jsx";
import { ContactoInfoGroup } from "../components/contacto/ContactoInfoGroup.jsx";

export default function Contacto() {

    //que se redireccione como el de las politicas y haga el scroll correspondiente
    //cambiar la direccion en las constantes
    return (
        <>
            <HeaderPo />
            <Container className={"container-contacto container"}>
                <ContactoInfoGroup />
                {/*sobre maillard*/}
            </Container>
            <Footer />
        </>
    )
}