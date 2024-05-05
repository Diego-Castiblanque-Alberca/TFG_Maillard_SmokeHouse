import { useState, useEffect } from 'react';

export default function MostrarReservas(fechaSeleccionada) {

    const [reservas, setReservas] = useState([]);
    const [errorPeticion, setErrorPeticion] = useState(null);
    const [turno, setTurno] = useState('comida');

    const formatearFecha = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; 
        const day = date.getDate();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/reserva/reservasDia`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fecha: formatearFecha(fechaSeleccionada),
                turno: turno,
            }),
        })
            .then(response => {
                // Si la respuesta no es ok, lanzamos el error
                if (!response.ok) {
                    return response.json().then(err => {throw err;});
                }
                // Si la respuesta es ok, devolvemos los datos de la respuesta
                return response.json()
            })
            .then(reservas => {
                // Si todo ha ido bien, guardamos las reservas en el estado
                setReservas(datos)
            })
            .catch(error => {
                // Si ha habido un error, lo guardamos en el estado
                setErrorPeticion(error.mensaje)
            });
    }, [fechaSeleccionada, turno]);

    return(
        <>
            <h3>Seleccione un turno</h3>
            <button onClick={()=>setTurno('comida')} className='buton-turno'> Comida </button>
            <button onClick={()=>setTurno('cena')} className='buton-turno'> Cena </button>
            <h2>Listado de Reservas</h2>
            {/*aqui un mapeo de las reservas en un nuevo componente*/}
            {reservas.map(reserva => (
                <ReservaTurno key={reserva.id} reserva={reserva}/>
            ))}
        </>
    )
}