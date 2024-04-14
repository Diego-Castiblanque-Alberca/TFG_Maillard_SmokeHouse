import { Header } from "../components/HeaderNav";
import { Footer } from "../components/Footer.jsx";
import { Container } from "../components/Container.jsx";
import { CARTA } from "../utils/consts.js";
import { CardCarta } from "../components/carta/CardCarta.jsx";
import { TituloCarta } from "../components/carta/TituloCarta.jsx";
import { SUBTITULO } from "../utils/consts.js";

export default function Carta() {
    return (
        <>
            <Header />
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.CARTA}/>
                <Container className={"container-carta"}>
                        {CARTA.map((item, index) => {
                            return (
                                <CardCarta 
                                    key={index} 
                                    title={item.title}
                                    backgroundImage={item.backgroundImage}
                                    to={item.to}
                                />
                            )
                        })}
                </Container>
            </Container>
            <Footer />
        </>
    )
}