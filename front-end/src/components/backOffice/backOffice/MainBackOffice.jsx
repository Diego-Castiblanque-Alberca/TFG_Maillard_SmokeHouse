import { useState } from 'react';
import '../../../styles/backOffice/mainBackOffice.css'
import React from 'react';
import HeaderBO from './HeaderBO';
import { Container } from '../../Container';
import {Calendario} from '../../reservar/Calendario';
import { SUBTITULO } from '../../../utils/consts';
import MostrarReservas from './MostrarReservas';

function MainBackOffice() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(hoy);

    return (
        <>
            <HeaderBO />
            <Container className={"container"}>
                <h1 className="titulo-reserva">{SUBTITULO.MAIN_BO}</h1>
                <Calendario fechaSeleccionada={fechaSeleccionada} setFechaSeleccionada={setFechaSeleccionada}/>
                <MostrarReservas fechaSeleccionada={fechaSeleccionada}/>
            </Container>
        </>
    );
}

export default MainBackOffice;