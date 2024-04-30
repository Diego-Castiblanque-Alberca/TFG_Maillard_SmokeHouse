import { useState, useEffect } from 'react';

export const useAuth = () => {
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

return [user, loading];
}