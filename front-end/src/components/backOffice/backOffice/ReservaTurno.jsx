import React, { useState } from 'react';
import puntos from '../../../imgs/puntos.svg';
import basura from '../../../imgs/basura.svg';
import { Modal } from './Modal';
import '../../../styles/backOffice/ReservaTurno.css';

export function ReservaTurno({reserva}) {
    const [mostrar, setMostrar] = useState(false);

    const handleConfirm = () => {
        // Aquí puedes hacer la petición a la API
        // Por ejemplo:
        // fetch('https://api.example.com/delete', { method: 'DELETE' })
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(error => console.error(error));
        console.log('Reserva eliminada');
    }

    const handleClose = () => {
        setMostrar(false);
    }
    
    return (
        <div className='turno-reserva'>
            <div className="datos-turno-reserva">
                <p className='primera-mayus'>{reserva.nombre}</p>
                <p>Mesa {reserva.mesa1}{reserva.mesa2 ? `,${reserva.mesa2}`:''}</p>
                <p>{reserva.comensales} PAX</p>
            </div>
            <div className="btnes-reserva">
                <img src={puntos} alt="visualizar" />
                <img src={basura} alt="eliminar" onClick={() => setMostrar(true)}/>
                <Modal 
                    mostrarInicial={mostrar}
                    titulo='Eliminar reserva'
                    botones={['CANCELAR','CONFIRMAR']}
                    handleClose={handleClose}
                    handleConfirm={handleConfirm}
                >
                    <p style={{textAlign:"center", fontSize:"18px"}}>¿Está seguro de querer eliminar definitivamente la reserva?</p>
                </Modal>
            </div>

        </div>
    )
}