import { Header } from "../components/HeaderNav";
import { Footer } from "../components/Footer.jsx";
import { Videos } from "../components/home/Videos.jsx";
import { Descripcion } from "../components/home/Descripcion.jsx";
import { ImagenesCartaReservar } from "../components/home/ImagenesCartaReservar.jsx";
import { Container } from "../components/Container.jsx";



export default function Home() {
    return (
        <>
            <Header />
            <Container className={"container-home"}>
                <Videos />
                <Descripcion />
                <ImagenesCartaReservar />
            </Container>
            <Footer />
        </>
    )
}