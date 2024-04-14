import React from "react";
import paso from "../../imgs/paso3.svg";
import InfoReserva from "../../components/reservar/InfoReserva";
import FormReserva from "../../components/reservar/FormReserva";

export default function ReservaPaso3({siguientePaso, datos}) {
    return (
        <>
            <img src={paso} alt=""/>
            <InfoReserva datos={datos}/>
            <FormReserva siguientePaso={siguientePaso} datos={datos} />
        </>
    )
}