import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import '../styles/BotonesCartaReservar.css';

// Definimos el componente BotonesCartaReservar
export function BotonesCartaReservar() {
  // Usamos el hook useLocation para obtener la ubicación actual
  const location = useLocation();
  
  // Definimos una función para resetear al paso 1
  const resetToPaso1 = () => {
    // Disparamos un evento global 'resetToPaso1'
    window.dispatchEvent(new Event('resetToPaso1'));
  };
  
  // Renderizamos el componente
  return (
    <div className='botones-carta-reservar'>
        {/* Creamos un enlace a la página de reservas. Si estamos en esa página, le añadimos la clase 'in-reservar' */}
        <Link to="/reservar" onClick={resetToPaso1} className={location.pathname == "/reservar" ? 'boton-reservar in-reservar':'boton-reservar'}>Reservar</Link>
        {/* Creamos un enlace a la página de la carta. Si estamos en esa página, le añadimos la clase 'in-carta' */}
        <Link to="/carta" className={location.pathname.includes("/carta") ? 'boton-ver-carta in-carta':'boton-ver-carta'} >Ver carta</Link>
    </div>
  );
}