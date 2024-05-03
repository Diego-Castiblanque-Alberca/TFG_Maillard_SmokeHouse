import { Link, useLocation } from 'react-router-dom';
import '../../styles/carta/CardCarta.css';

// Definimos el componente CardCarta que recibe como props title, backgroundImage y redirige
export function CardCarta({ title, backgroundImage, redirige }) {

    // Usamos el hook useLocation para obtener la ubicación actual
    const location = useLocation();
    let className;
    // Si la ruta actual es '/carta', establecemos className como 'in-cartaPrincipal'
    if (location.pathname === '/carta') {
        className = 'in-cartaPrincipal';
    } else {
        // Si no, establecemos className como 'in-cartaOpciones'
        className = 'in-cartaOpciones';
    }

    // Retornamos un componente Link que redirige a la ruta especificada en 'redirige'
    // y tiene una clase que depende de la ruta actual
    return (
        <Link
            to={redirige}
            className={`cardCarta ${className}`}
        >
            {/* Dentro del Link, tenemos un div que muestra la imagen de fondo */}
            <div 
                className="cardCarta-img"
                style={{ backgroundImage: `url(/${backgroundImage})` }}    
            ></div>
            {/* Y otro div que muestra el título */}
            <div className="cardCarta-title">
                <h2>{title}</h2>
            </div>
        </Link>
    );
}
