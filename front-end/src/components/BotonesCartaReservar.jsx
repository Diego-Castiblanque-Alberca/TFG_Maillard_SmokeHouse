import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import '../styles/BotonesCartaReservar.css';

export function BotonesCartaReservar() {
  const location = useLocation();

  return (
    <div className='botones-carta-reservar'>
        <Link to="/reservar" className={location.pathname == "/reservar" ? 'boton-reservar in-reservar':'boton-reservar'}>Reservar</Link>
        <Link to="/carta" className={location.pathname.includes("/carta") ? 'boton-ver-carta in-carta':'boton-ver-carta'} >Ver carta</Link>
    </div>
  );
}