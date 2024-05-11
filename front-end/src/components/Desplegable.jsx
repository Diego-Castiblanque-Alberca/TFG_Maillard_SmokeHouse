import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Desplegable.css';

export function Desplegable({isOpen}) {
    return (
        <ul className={isOpen ? 'desplegable open' : 'desplegable closed'}>
            <li>
                <Link to="/carta">Oferta gastronómica</Link>
            </li>
            <li>
                <Link to="/reservar">Reservar mesa</Link>
            </li>
            <li>
                <Link to="/contacto">Sobre Maillard</Link>
            </li>
            <li>
                <Link to="/contacto#contacto">Contacto</Link>
            </li>
        </ul>
    )
}