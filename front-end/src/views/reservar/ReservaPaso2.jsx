import React, { useEffect, useState } from "react";
import paso from "../../imgs/paso2.svg";
import Leyenda from "../../components/reservar/leyenda";
import Mesas from "../../components/reservar/Mesas";
import { CONSTANTS } from "../../utils/consts";

export default function ReservaPaso2({siguientePaso, datos}) {
    const [mesas, setMesas] = useState({});

    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/reserva/mesas`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fecha: datos.fechaSeleccionada,
                horario: datos.horario,
            }),
        })
            .then(response => response.json())
            .then(mesas => setMesas(mesas));
 
    }, [datos]);

    return (
        <>
            <img src={paso} alt=""/>
            <h2 style={{color: "var(--color-3)", fontSize: "25px"}}>Elige tu mesa</h2>
            <h3 style={{color:"var(--color-4)", fontSize:"20px"}}>Puedes juntar hasta 2 mesas</h3>
            <Leyenda texto1="No disponible" texto2="Disponible" texto3="Seleccionada"/>
            <Mesas mesas={mesas} datos={datos} siguientePaso={siguientePaso} />
        </>
    )
}