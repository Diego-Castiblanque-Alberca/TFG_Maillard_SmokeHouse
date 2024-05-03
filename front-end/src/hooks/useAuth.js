import { useState, useEffect } from 'react';

// Hook personalizado para la autenticación
export const useAuth = () => {
const [user, setUser] = useState(null);//Estado para guardar la información del usuario
const [ loading, setLoading ] = useState(true);//Estado para controlar si se está cargando la información del usuario

//Función que se ejecuta al cargar el componente y que se encarga de obtener la información del usuario
useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');//Se obtiene el token del local storage o del session storage.
        if (token) {
            try {
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/validateToken`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const json = await response.json();
                setUser(json.data);
            } catch (error) {
                console.error('Error en la autenticación.', error);
            }
        }
        setLoading(false);//Se ha terminado de cargar la información del usuario
    };
    fetchData();
}, []); // El array de dependencias vacío asegura que fetchData se ejecuta solo una vez.

return [user, loading];
}