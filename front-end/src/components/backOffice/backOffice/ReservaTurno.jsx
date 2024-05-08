import React, { useState } from 'react';
import puntos from '../../../imgs/puntos.svg';
import basura from '../../../imgs/basura.svg';
import { Modal } from './Modal';
import '../../../styles/backOffice/ReservaTurno.css';

export function ReservaTurno({reserva}) {
    const [mostrarEliminar, setMostrarEliminar] = useState(false);
    const [mostrarVisualizar, setMostrarVisualizar] = useState(false);

    console.log(reserva);
    const handleConfirm = () => {
        // Aquí puedes hacer la petición a la API
        // Por ejemplo:
        // fetch('https://api.example.com/delete', { method: 'DELETE' })
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(error => console.error(error));
        console.log('Reserva eliminada');
    }

    const handleCloseEliminar = () => {
        setMostrarEliminar(false);
    }
    const handleCloseVisualizar = () => {
        setMostrarVisualizar(false);
    }
    return (
        <div className='turno-reserva'>
            <div className="datos-turno-reserva">
                <p className='primera-mayus nombre-turno-reserva'>{reserva.nombre}</p>
                <p>Mesa {reserva.mesa1}{reserva.mesa2 ? `,${reserva.mesa2}`:''}</p>
                <p>{reserva.comensales} PAX</p>
                <p>{reserva.hora}</p>
            </div>
            <div className="btnes-reserva">
                <img src={puntos} alt="visualizar" onClick={() => setMostrarVisualizar(true)}/>
                <Modal 
                    mostrarInicial={mostrarVisualizar}
                    titulo='Informacion de la reserva'
                    botones={['Continuar']}
                    handleClose={handleCloseVisualizar}
                >
                    <div className="info-reserva-modal">
                        <p style={{textTransform:"capitalize"}}>Nombre: {reserva.nombre}.</p>
                        <p>Fecha: {reserva.fecha}.</p>
                        <p>Mesa(s) reservada(s): {reserva.mesa1}{reserva.mesa2 ? `,${reserva.mesa2}`:''}.</p>
                        <p>Hora de inicio: {reserva.hora}.</p>
                        <p>Numero de comensales: {reserva.comensales} PAX.</p>
                        <p>E-mail: {reserva.email}.</p>
                        <p>Telefono: {reserva.telefono}</p>
                    </div>
                </Modal>
                <img src={basura} alt="eliminar" onClick={() => setMostrarEliminar(true)}/>
                <Modal 
                    mostrarInicial={mostrarEliminar}
                    titulo='Eliminar reserva'
                    botones={['CANCELAR','CONFIRMAR']}
                    handleClose={handleCloseEliminar}
                    handleConfirm={handleConfirm}
                >
                    <p style={{textAlign:"center", fontSize:"18px"}}>¿Está seguro de querer eliminar definitivamente la reserva?</p>
                </Modal>
            </div>

        </div>
    )
}