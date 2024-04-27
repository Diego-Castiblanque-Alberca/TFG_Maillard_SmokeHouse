import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import '../styles/BotonesCartaReservar.css';

export function BotonesCartaReservar() {
  const location = useLocation();
  
  const resetToPaso1 = () => {
    window.dispatchEvent(new Event('resetToPaso1'));
  };
  
  return (
    <div className='botones-carta-reservar'>
        <Link to="/reservar" onClick={resetToPaso1} className={location.pathname == "/reservar" ? 'boton-reservar in-reservar':'boton-reservar'}>Reservar</Link>
        <Link to="/carta" className={location.pathname.includes("/carta") ? 'boton-ver-carta in-carta':'boton-ver-carta'} >Ver carta</Link>
    </div>
  );
}