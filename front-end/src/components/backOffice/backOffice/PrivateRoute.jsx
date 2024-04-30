import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useEffect } from 'react';

export function PrivateRoute({ children }) {
  
    const location = useLocation();
    const from = location.state?.from || '/'; // Aquí se almacena la ruta anterior o '/' si no hay una ruta anterior
    const navigate = useNavigate();
    const [user, loading] = useAuth();// Se obtiene el usuario y el estado de carga
    console.log('PrivateRoute');
    console.log(user);
    console.log(loading);
    useEffect(() => {
        if (user) {
            navigate('/backOffice',{ state: { from: location.pathname } });
        }
    }, [user,navigate]);

    if(loading) return <div>Loading...</div>;
    // Mientras se carga la información del usuario se muestra un mensaje de carga

    return user ? children : <Navigate to={from} replace />;
}
export default PrivateRoute;