import burgerIcon from '../imgs/burguer.svg';
import closeIcon from '../imgs/close.svg';
import homeIcon from '../imgs/botonHeader.svg';
import React, { useState, useEffect } from 'react';
import { Link , useLocation } from 'react-router-dom';
import { Desplegable } from './Desplegable';
import { BotonesCartaReservar } from './BotonesCartaReservar';
import '../styles/HeaderNav.css';

// Definimos el componente Header
export function Header() {
    // Definimos el estado para controlar si el menú está abierto o cerrado
    const [isOpen, setIsOpen] = useState(false);
    // Definimos el estado para controlar si el usuario ha hecho scroll en la página
    const [isScrolled, setIsScrolled] = useState(false);
    // Usamos useEffect para añadir un event listener al scroll
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setIsScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        // Limpiamos el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    // Obtenemos la ubicación actual
    const location = useLocation();
    // Definimos las clases del componente en función de la ubicación y si el usuario ha hecho scroll
    const className = location.pathname === '/' ? 'header-nav in-index' : 'header-nav';
    const scrolledClass = isScrolled && location.pathname === '/' ? 'scrolled' : '';
    
    // Renderizamos el componente
    return (
        <nav className={`${className} ${scrolledClass} ${isOpen ? 'nav-open' : ''}`}>
            <div className='header__container'>
                <div>
                    {/* Botón para abrir/cerrar el menú */}
                    <button className="burguer" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <img src={closeIcon} alt="Close menu" /> : <img src={burgerIcon} alt="Open menu" />}
                    </button>
                    {/* Enlace a la página principal */}
                    <Link to="/">
                        <img src={homeIcon} alt="Home" />
                    </Link>
                </div>
                {/* Opciones para cambiar el idioma */}
                <ul className='traducir'>
                    <li className='traducir__ES'>
                        ES
                    </li>
                    <li className='traducir__EN'>
                        EN
                    </li>
                </ul>
            </div>
            <BotonesCartaReservar />
            <Desplegable isOpen={isOpen} />
        </nav>
    );
}