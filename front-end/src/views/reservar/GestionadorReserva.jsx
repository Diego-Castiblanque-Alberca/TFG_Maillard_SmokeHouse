import React, { useEffect } from "react";
import { useState } from "react";
import '../../styles/reservar/Reserva.css';
import ReservaPaso1 from './ReservaPaso1';
import ReservaPaso2 from './ReservaPaso2';
import ReservaPaso3 from './ReservaPaso3';
import ReservaPaso4 from './ReservaPaso4';

export function GestionadorReserva() {
    const [paso, setPaso] = useState(1);
    const [datos, setDatos] = useState({});

    const siguientePaso = (nuevosDatos) => {
        setDatos(datosAnteriores => ({ ...datosAnteriores, ...nuevosDatos}));
        setPaso(pasoAnterior => pasoAnterior + 1);
    };
    const resetToPaso1 = () => {
        setDatos({});
        setPaso(1);
    };

    useEffect(() => {
        const resetHandler = () => resetToPaso1();
        window.addEventListener('resetToPaso1', resetHandler);

        return () => {
            window.removeEventListener('resetToPaso1', resetHandler);
        };
    }, []);

    const pasoARenderizar = () => {
        switch (paso) {
            case 1:
                return <ReservaPaso1 siguientePaso={siguientePaso} />;
            case 2:
                return <ReservaPaso2 siguientePaso={siguientePaso} datos={datos} />;
            case 3:
                return <ReservaPaso3 siguientePaso={siguientePaso} datos={datos} />;
            case 4:
                return <ReservaPaso4 resetToPaso1={resetToPaso1} datos={datos} />;
        }
    }
    return (
        <>
            <h1 className="titulo-reserva">Haz tu Reserva</h1>
            {paso > 1 && paso < 4 && (
                <button 
                    onClick={resetToPaso1}
                    className="boton-volver"
                >
                    Volver
                </button>
            )}
            <div
            className="form-reservar">
                {pasoARenderizar()}
            </div>
        </>
    )
}