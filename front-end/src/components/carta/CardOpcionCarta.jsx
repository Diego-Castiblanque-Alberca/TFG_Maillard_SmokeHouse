import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/carta/CardOpcionCarta.css';
import loadingGif from '../../imgs/loading.gif';

// Definimos el componente CardOpcionCarta que recibe como props title, descripcion, precio y backgroundImage
export function CardOpcionCarta({ title, descripcion, precio, backgroundImage }) {

    // Usamos el hook useLocation para obtener la ubicación actual
    const location = useLocation();
    // Establecemos className como 'in-bebidas' si la ruta actual comienza con '/carta/bebidas', de lo contrario, como 'in-platos'
    const className = location.pathname.startsWith('/carta/bebidas') ? 'in-bebidas' : 'in-platos';
    
    // Definimos un estado para rastrear si la imagen de fondo se ha cargado
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    
    // Usamos useEffect para cargar la imagen de fondo y actualizar el estado cuando se haya cargado
    useEffect(() => {
        const img = new Image();
        img.src = `/${backgroundImage}`;
        img.onload = () => setIsImageLoaded(true);
    }, [backgroundImage]);

    // Retornamos un div que tiene una clase que depende de la ruta actual
    return (
        <div className={`cardOpcionCarta ${className}`}>
            <div
                className={`cardOpcionCarta-container`}
            >
                {/* Dentro del div, tenemos otro div que muestra la imagen de fondo */}
                <div
                    className="cardOpcionCarta-img"
                    style={{
                        // Si la imagen de fondo se ha cargado, la mostramos, de lo contrario, mostramos el GIF de carga
                        backgroundImage: isImageLoaded ? `url(/${backgroundImage})` : `url(${loadingGif})`,
                        // Si la imagen de fondo se ha cargado, la ajustamos para que cubra todo el espacio, de lo contrario, ajustamos el tamaño del GIF de carga
                        backgroundSize: isImageLoaded ? 'cover' : '7em 7em',
                    }}
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