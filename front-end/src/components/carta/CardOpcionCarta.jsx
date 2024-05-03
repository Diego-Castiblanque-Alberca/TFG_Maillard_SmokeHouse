import { useLocation } from 'react-router-dom';
import '../../styles/carta/CardOpcionCarta.css';

// Definimos el componente CardOpcionCarta que recibe como props title, descripcion, precio y backgroundImage
export function CardOpcionCarta({ title, descripcion, precio, backgroundImage }) {

    // Usamos el hook useLocation para obtener la ubicación actual
    const location = useLocation();
    // Establecemos className como 'in-bebidas' si la ruta actual comienza con '/carta/bebidas', de lo contrario, como 'in-platos'
    const className = location.pathname.startsWith('/carta/bebidas') ? 'in-bebidas' : 'in-platos';
    
    // Retornamos un div que tiene una clase que depende de la ruta actual
    return (
        <div className={`cardOpcionCarta ${className}`}>
            <div
                className={`cardOpcionCarta-container`}
            >
                {/* Dentro del div, tenemos otro div que muestra la imagen de fondo */}
                <div
                    className="cardOpcionCarta-img"
                    style={{ backgroundImage: `url(/${backgroundImage})` }}
                ></div>
            </div>
            {/* Mostramos el título */}
            <h2>{title}</h2>
            {/* Si existe una descripción, la mostramos */}
            { descripcion && <p className="cardOpcionCarta-descripcion">{descripcion}</p> }
            {/* Mostramos el precio */}
            <p>{precio}</p>
        </div>
    );
}