import React from "react";
import paso from "../../imgs/paso4.svg";
import check from "../../imgs/check.svg"
import InfoReserva from "../../components/reservar/InfoReserva";
import "../../styles/reservar/ReservaPaso4.css";

export default function ReservaPaso4({datos}) {
    const { nombre , apellidos } = datos;
    
    return (
        <>
            <img src={paso} alt=""/>
            <div className="reserva-confirmada">
                <img src={check} alt="" />
                <h2>Reserva confirmada</h2>
            </div>
            <div className="contenedor-datos-reserva">
                <InfoReserva datos={datos}/>
                <h3 className="nombre-reserva">Reserva a nombre de:&nbsp;&nbsp;<span>{nombre} {apellidos}</span></h3>
                <div className="texto-agradecimiento">
                    <p>Gracias por reservar en Maillard SmokeHouse.</p>
                    <p>Recibirá en breve un email de confirmación.</p>
                </div>
            </div>
        </>
    )
}