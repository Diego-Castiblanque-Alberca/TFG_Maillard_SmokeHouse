import { Header } from "../../components/HeaderNav.jsx";
import { Footer } from "../../components/Footer.jsx";
import { Container } from "../../components/Container.jsx";
import { LoginBackOfficeForm } from "../../components/backOffice/loginBackOffice/LoginBackOfficeForm.jsx";






export default function Contacto() {

    
    return (
        <>
            <Header />
            <Container className={"container"}>
                <LoginBackOfficeForm />
            </Container>
            <Footer />
        </>
    )
}