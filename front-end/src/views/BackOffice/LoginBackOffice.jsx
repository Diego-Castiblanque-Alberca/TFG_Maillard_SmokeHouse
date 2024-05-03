import { Header } from "../../components/HeaderNav.jsx";
import { Footer } from "../../components/Footer.jsx";
import { Container } from "../../components/Container.jsx";
import { LoginBackOfficeForm } from "../../components/backOffice/loginBackOffice/LoginBackOfficeForm.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";



export default function LoginBackOffice() {
    const navigate = useNavigate();
    const [user, loading] = useAuth();// Se obtiene el usuario y el estado de carga
   
    useEffect(() => {
        if (user) {
            navigate('/backOffice',{ state: { from: location.pathname } });
        }
    }, [user,navigate]);

    if(loading) return (<><div>Loading...</div></>);

    return (
        <>
            <Header />
            <Container className={"container-login container"}>
                <LoginBackOfficeForm />
            </Container>
            <Footer />
        </>
    )
}