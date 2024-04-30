import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function PrivateRoute({ children }) {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const location = useLocation();
    const from = location.state?.from || '/'; // Aquí se almacena la ruta anterior o '/' si no hay una ruta anterior
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
    if(loading) return <div>Loading...</div>;// Mientras se carga la información del usuario se muestra un mensaje de carga

    return user ? children : <Navigate to={from} replace />;
}
export default PrivateRoute;