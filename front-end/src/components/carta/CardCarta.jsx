import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/carta/CardCarta.css';
import loadingGif from '../../imgs/loading.gif';

// Definimos el componente CardCarta que recibe como props title, backgroundImage y redirige
export function CardCarta({ title, backgroundImage, redirige }) {

    // Usamos el hook useLocation para obtener la ubicación actual
    const location = useLocation();
    // Establecemos className como 'in-cartaPrincipal' si la ruta actual es '/carta', de lo contrario, como 'in-cartaOpciones'
    const className= location.pathname === '/carta' ? 'in-cartaPrincipal' : 'in-cartaOpciones';
    
    // Definimos un estado para rastrear si la imagen de fondo se ha cargado
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Usamos useEffect para cargar la imagen de fondo y actualizar el estado cuando se haya cargado
    useEffect(() => {
        const img = new Image();
        img.src = `/${backgroundImage}`;
        img.onload = () => setIsImageLoaded(true);
    }, [backgroundImage]);

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
                style={{
                    // Si la imagen de fondo se ha cargado, la mostramos, de lo contrario, mostramos el GIF de carga
                    backgroundImage: isImageLoaded ? `url(/${backgroundImage})` : `url(${loadingGif})`,
                    // Si la imagen de fondo se ha cargado, la ajustamos para que cubra todo el espacio, de lo contrario, ajustamos el tamaño del GIF de carga
                    backgroundSize: isImageLoaded ? 'cover' : '2em 2em',
                }}   
            ></div>
            {/* Y otro div que muestra el título */}
            <div 
                className="cardCarta-title"
                style={{ 
                    //si la imagen de fondo se ha cargado, mostramos un degradado para que el título sea más legible
                    background: isImageLoaded ? 'linear-gradient(to bottom, transparent 60%, black 100%)' : 'linear-gradient(to bottom, transparent 0%, black 100%)',
                }}
            >
                <h2>{title}</h2>
            </div>
        </Link>
    );
}
