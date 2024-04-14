import { Header } from "../components/HeaderNav";
import { Footer } from "../components/Footer.jsx";
import { Container } from "../components/Container.jsx";
import { GestionadorReserva }  from "./reservar/GestionadorReserva.jsx";

export default function Reservar() {
    return (
        <>
            <Header />
            <Container className={"container"}>
                <GestionadorReserva />
            </Container>
            <Footer />
        </>
    )
}