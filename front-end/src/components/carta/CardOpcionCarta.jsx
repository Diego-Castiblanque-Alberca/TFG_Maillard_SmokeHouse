import { useLocation } from 'react-router-dom';
import '../../styles/carta/CardOpcionCarta.css';

export function CardOpcionCarta({ title, descripcion, precio, backgroundImage }) {

    const location = useLocation();
    const className = location.pathname.startsWith('/carta/bebidas') ? 'in-bebidas' : 'in-platos';
    
    return (

        <div className={`cardOpcionCarta ${className}`}>
            <div
                className={`cardOpcionCarta-container`}
            >
                <div
                    className="cardOpcionCarta-img"
                    style={{ backgroundImage: `url(/${backgroundImage})` }}
                ></div>
            </div>
            <h2>{title}</h2>
            {
            descripcion && <p className="cardOpcionCarta-descripcion">{descripcion}</p>
            }
            <p>{precio}</p>
        </div>
    );
}
