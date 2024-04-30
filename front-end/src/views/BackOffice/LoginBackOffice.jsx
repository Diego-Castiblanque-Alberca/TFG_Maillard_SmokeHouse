import { Header } from "../../components/HeaderNav.jsx";
import { Footer } from "../../components/Footer.jsx";
import { Container } from "../../components/Container.jsx";
import { LoginBackOfficeForm } from "../../components/backOffice/loginBackOffice/LoginBackOfficeForm.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



export default function LoginBackOffice() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await fetch('http://localhost:8000/api/validateToken', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });
                    const json = await response.json();
                    setUser(json.data);
                } catch (error) {
                    console.error('There was an error with Authentication!', error);
                }
            }
            setLoading(false);
        };
        fetchData();
    }, []); // El array de dependencias vacío asegura que fetchData se ejecuta solo una vez

    useEffect(() => {
        if (user) {
            navigate('/backOffice',{ state: { from: location.pathname } });
        }
    }, [user, navigate]);

    if(loading) return (<><div>Loading...</div></>);// Mientras se carga la información del usuario se muestra un mensaje de carga

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