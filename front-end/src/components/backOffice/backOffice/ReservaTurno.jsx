import React, { useState } from 'react';
import puntos from '../../../imgs/puntos.svg';
import basura from '../../../imgs/basura.svg';
import { Modal } from './Modal';
import '../../../styles/backOffice/ReservaTurno.css';

export function ReservaTurno({reserva, handleConfirm}) {
    const [mostrarEliminar, setMostrarEliminar] = useState(false);
    const [mostrarVisualizar, setMostrarVisualizar] = useState(false);

    const handleConfirmLocal = () => {
        handleConfirm(reserva.id);
        handleCloseEliminar();
    }

    const handleCloseEliminar = () => {
        setMostrarEliminar(false);
    }
    const handleCloseVisualizar = () => {
        setMostrarVisualizar(false);
    }
    return (
        <div className='turno-reserva'>
            <div className="datos-turno-reserva" onClick={() => setMostrarVisualizar(true)}>
                <p className='primera-mayus nombre-turno-reserva'>{reserva.nombre}</p>
                <p>{reserva.comensales} PAX</p>
                <p>{reserva.hora}</p>
                <p>Mesa {reserva.mesa1}{reserva.mesa2 ? `,${reserva.mesa2}`:''}</p>
            </div>
            <div className="btnes-reserva">
                {/* <img src={puntos} alt="visualizar" onClick={() => setMostrarVisualizar(true)}/> */}
                <Modal 
                    mostrarInicial={mostrarVisualizar}
                    titulo='Informacion de la reserva'
                    botones={['Continuar']}
                    handleClose={handleCloseVisualizar}
                >
                    <div className="info-reserva-modal">
                        <p style={{textTransform:"capitalize"}}><span>Nombre:</span> {reserva.nombre.charAt(0).toUpperCase() + reserva.nombre.slice(1)}.</p>
                        <p><span>Fecha:</span> {reserva.fecha}.</p>
                        <p><span>Mesa(s) reservada(s):</span> {reserva.mesa1}{reserva.mesa2 ? `,${reserva.mesa2}`:''}.</p>
                        <p><span>Hora de inicio:</span> {reserva.hora}.</p>
                        <p><span>Numero de comensales:</span> {reserva.comensales} PAX.</p>
                        <p><span>E-mail:</span> {reserva.email}.</p>
                        <p><span>Telefono:</span> {reserva.telefono}</p>
                    </div>
                </Modal>
                <img src={basura} alt="eliminar" onClick={() => setMostrarEliminar(true)}/>
                <Modal 
                    mostrarInicial={mostrarEliminar}
                    titulo='Eliminar reserva'
                    botones={['CANCELAR','CONFIRMAR']}
                    handleClose={handleCloseEliminar}
                    handleConfirm={handleConfirmLocal}
                    id={reserva.id}
                >
                    <p style={{textAlign:"center", fontSize:"18px"}}>¿Está seguro de querer eliminar definitivamente la reserva?</p>
                </Modal>
            </div>

        </div>
    )
}