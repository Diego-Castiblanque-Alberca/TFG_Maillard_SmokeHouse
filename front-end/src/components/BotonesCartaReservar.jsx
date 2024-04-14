import { Link } from 'react-router-dom';
import React from 'react';
import '../styles/BotonesCartaReservar.css';

export function BotonesCartaReservar() {
  return (
    <div className='botones-carta-reservar'>
        <Link to="/reservar" className='boton-reservar'>Reservar</Link>
        <Link to="/carta" className='boton-ver-carta'>Ver carta</Link>
    </div>
  );
}