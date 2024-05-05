import { useState } from 'react';
import '../../../styles/backOffice/mainBackOffice.css'
import React from 'react';
import HeaderBO from './HeaderBO';
import { Container } from '../../Container';
import {Calendario} from '../../reservar/Calendario';
import { SUBTITULO } from '../../../utils/consts';
import {TituloCarta} from '../../carta/TituloCarta';
import MostrarReservas from './MostrarReservas';

function MainBackOffice() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(hoy);

    return (
        <>
            <HeaderBO />
            <Container className={"container"}>
                <TituloCarta texto={SUBTITULO.MAIN_BO}/>
                <Calendario fechaSeleccionada={fechaSeleccionada} setFechaSeleccionada={setFechaSeleccionada}/>
                <MostrarReservas fechaSeleccionada={fechaSeleccionada}/>
            </Container>
        </>
    );
}

export default MainBackOffice;