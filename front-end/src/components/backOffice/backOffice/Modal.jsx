import React, { useState , useEffect } from "react";
import "../../../styles/backOffice/Modal.css";
import info from "../../../imgs/info.svg";

export function Modal({ mostrarInicial, children, titulo , botones, handleClose,handleConfirm}) {
    const [mostrar, setMostrar] = useState(mostrarInicial);

    useEffect(() => {
        setMostrar(mostrarInicial);
    }, [mostrarInicial]);

    const handleClick = (index) => {
        if(index == 1){
            handleConfirm();
        }
        handleClose();
    }
    return (
        <div 
            className="modal"
            style={mostrar ? {display: "flex"} : {display: "none"}}
        >
        <section className="modal-main">
            <div className="modal-header">
                <img src={info} alt="" />
                <h2>{titulo}</h2>
            </div>
            {children}
            <div className="modal-buttons">
                {botones.map((boton, index) => {
                    return (
                        <button 
                            key={index} 
                            onClick={() => handleClick(index)}
                        >
                            {boton}
                        </button>
                    )
                })}
            </div>
        </section>
        </div>
    );
}