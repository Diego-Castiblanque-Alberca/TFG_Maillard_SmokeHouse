import { Route, Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export function PrivateRoute({ children }) {
  const user = useAuth(); // Usa useAuth para obtener la información del usuario
  
  return user ? (
    <Route>{children}</Route>
  ) : (
    <Navigate to="/login/backOffice" replace />
  );
}

export default PrivateRoute;