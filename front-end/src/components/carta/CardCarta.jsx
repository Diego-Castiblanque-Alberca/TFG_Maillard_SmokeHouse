import { Link, useLocation } from 'react-router-dom';
import '../../styles/carta/CardCarta.css';

export function CardCarta({ title, backgroundImage, to }) {

    const location = useLocation();
    let className;
    if (location.pathname === '/carta') {
        className = 'in-cartaPrincipal';
    } else {
        className = 'in-cartaOpciones';
    }

    return (
        <Link
            to={to}
            className={`cardCarta ${className}`}
        >
            <div 
                className="cardCarta-img"
                style={{ backgroundImage: `url(/${backgroundImage})` }}    
            ></div>
            <div className="cardCarta-title">
                <h2>{title}</h2>
            </div>
        </Link>
    );
}
