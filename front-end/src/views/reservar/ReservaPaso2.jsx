import React, { useEffect, useState } from "react";
import paso from "../../imgs/paso2.svg";
import Leyenda from "../../components/reservar/leyenda";
import Mesas from "../../components/reservar/Mesas";
import { CONSTANTS } from "../../utils/consts";

export default function ReservaPaso2({siguientePaso, datos}) {
    const [mesas, setMesas] = useState({});

    useEffect(() => {
        fetch("/reserva/mesas",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => response.json())
            .then(data => setMesas(data));
        setTimeout(() => {
            setMesas(CONSTANTS.MESAS)
        }, 1000);
    }, [datos]);

    return (
        <>
            <img src={paso} alt=""/>
            <h2 style={{color: "var(--color-3)", fontSize: "25px"}}>Elige tu mesa</h2>
            <h3 style={{color:"var(--color-4)", fontSize:"20px"}}>Puedes juntar hasta 2 mesas</h3>
            <Leyenda texto1="No disponible" texto2="Disponible" texto3="Seleccionada"/>
            <Mesas mesas={CONSTANTS.MESAS} datos={datos} siguientePaso={siguientePaso} />
        </>
    )
}