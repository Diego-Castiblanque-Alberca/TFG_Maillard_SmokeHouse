import twitter from '../imgs/twitter.svg';
import facebook from '../imgs/facebook.svg';
import instagram from '../imgs/instagram.svg';
import React from 'react';
import '../styles/Footer.css';

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="redes__sociales">
                    <p>Siguenos: </p>
                    <a href="https://twitter.com/" className="redes_sociales__enlace"><img src={twitter} alt="" /></a>
                    <a href="https://www.facebook.com/" className="redes_sociales__enlace"><img src={facebook} alt="" /></a>
                    <a href="https://www.instagram.com/" className="redes_sociales__enlace"><img src={instagram} alt="" /></a>
                </div>
                <div className="footer__contacto">
                    <a href="" className="footer__contacto__enlace">Aviso Legal</a>
                    <a href="" className="footer__contacto__enlace">Política de Cookies</a>
                    <a href="" className="footer__contacto__enlace">Política de privacidad</a>
                    <a href="" className="footer__contacto__enlace">Condiciones de reserva</a>
                </div>
            </div>
        </footer>
    )
}