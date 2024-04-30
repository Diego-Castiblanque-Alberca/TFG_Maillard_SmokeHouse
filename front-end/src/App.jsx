import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Carta from './views/Carta';
import Reservar from './views/Reservar';
import Contacto from './views/Contacto';
import Bebidas from './views/carta/Bebidas.jsx';
import Platos from './views/carta/Platos.jsx';
import Refrescos from './views/carta/bebidas/Refrescos.jsx';
import Cervezas from './views/carta/bebidas/Cervezas.jsx';
import Vinos from './views/carta/bebidas/Vinos.jsx';
import Cocktails from './views/carta/bebidas/Cocktails.jsx';
import Acompanantes from './views/carta/platos/Acompanantes.jsx';
import Entrantes from './views/carta/platos/Entrantes.jsx';
import Principales from './views/carta/platos/Principales.jsx';
import Postres from './views/carta/platos/Postres.jsx';
import LoginBackOffice from './views/BackOffice/LoginBackOffice.jsx';
import BackOffice from './views/BackOffice/BackOffice.jsx';
import Privateroute from './components/backOffice/backOffice/PrivateRoute.jsx';

const routes = [
  { path: '/', element: <Home />, index: true },
  { path: 'carta', element: <Carta /> },
  { path: 'reservar', element: <Reservar /> },
  { path: 'contacto', element: <Contacto /> },
  { path: 'carta/bebidas', element: <Bebidas /> },
  { path: 'carta/platos', element: <Platos /> },
  { path: 'carta/bebidas/refrescos', element: <Refrescos /> },
  { path: 'carta/bebidas/cervezas', element: <Cervezas /> },
  { path: 'carta/bebidas/vinos', element: <Vinos /> },
  { path: 'carta/bebidas/cocktails', element: <Cocktails /> },
  { path: 'carta/platos/acompanantes', element: <Acompanantes /> },
  { path: 'carta/platos/entrantes', element: <Entrantes /> },
  { path: 'carta/platos/principales', element: <Principales /> },
  { path: 'carta/platos/postres', element: <Postres /> },
  { path: 'login/backOffice', element: <LoginBackOffice /> },
  { path: 'backOffice', element: <Privateroute><BackOffice /></Privateroute> }
]; 

export function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route 
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </Router>
  );
}