import logo from '../../../imgs/botonHeader.svg';
import logout from '../../../imgs/logout.svg';
import { useNavigate } from 'react-router-dom';
import '../../../styles/backOffice/HeaderBO.css';

export default function HeaderBO() {
    const navigate = useNavigate();
    const cerrarSesion = () => {
        // Obtén el token del almacenamiento local o del almacenamiento de la sesión
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/logout`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Elimina el token del almacenamiento local y del almacenamiento de la sesión
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('authToken');
            // Redirige al usuario a la página de inicio de sesión
            navigate('/backOffice/login');
        })
        .catch(error => {
            console.error(error);
        });
    }
    return (
        <div className='headerBO'>
            <img src={logo} alt='logo' className='logo'/>
            <img src={logout} alt="logout" onClick={cerrarSesion} className='logout'/>
        </div>
    );
}