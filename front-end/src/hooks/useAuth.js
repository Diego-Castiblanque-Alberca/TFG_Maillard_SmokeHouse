import { useEffect } from 'react';

export async function useAuth() {
  let user = null;

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
        user = json.data;
      } catch (error) {
        console.error('There was an error with Authentication!', error);
      }
    }
  };

  await fetchData();

  console.log("Esperando a user", user);
  return user;
}

export default useAuth;