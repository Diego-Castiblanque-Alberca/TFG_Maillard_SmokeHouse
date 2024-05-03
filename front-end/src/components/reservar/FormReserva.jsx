import React, { useState } from "react";
import { validarNombre, validarEmail, validarTelefono, validarRequerido } from "../../utils/validaciones";
import '../../styles/reservar/FormReserva.css';

export default function FormReserva({ siguientePaso, datos }) {
    const [estadoFormulario, setEstadoFormulario] = useState({
        nombre: { 
            value: '',
            validate: (value) => validarNombre(value) && validarRequerido(value),
            error: 'El nombre debe tener al menos 3 caracteres',
            mensajeError: 'El nombre debe tener al menos 3 caracteres', 
            tocado: false 
        },
        apellidos: { 
            value: '', 
            validate: (value) => validarNombre(value) && validarRequerido(value), 
            error: 'Los apellidos deben tener al menos 3 caracteres', 
            mensajeError: 'El nombre debe tener al menos 3 caracteres', 
            tocado: false 
        },
        email: { 
            value: '', 
            validate: (value) => validarEmail(value) && validarRequerido(value), 
            error: 'El email no es válido', 
            mensajeError: 'El email no es válido', 
            tocado: false 
        },
        prefijoTelefono: '+34',
        telefono: { 
            value: '', 
            validate: (value) => validarTelefono(value) && validarRequerido(value), 
            error: 'El teléfono debe tener 9 dígitos',
            mensajeError: 'El teléfono debe tener 9 dígitos', 
            tocado: false 
        },
        politicas: { 
            value: '', 
            validate: validarRequerido, 
            error: 'Debe aceptar las políticas de privacidad',
            mensajeError: 'Debe aceptar las políticas de privacidad', 
            tocado: false 
        },
        comunicaciones: false
    });

    const [errorPeticion, setErrorPeticion] = useState('');

    const prefijos = [
        { pais: 'Spain', codigo: '+34' },
        { pais: 'France', codigo: '+33' },
        { pais: 'Germany', codigo: '+49' },
    ];
    

    const esFormularioValido = () => {
        for (let campo in estadoFormulario) {
            if (estadoFormulario[campo].hasOwnProperty('error') && estadoFormulario[campo].error) {
                return false;
            }
        }
        return true;
    };

    const manejarChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        let campo = estadoFormulario[event.target.name];
        let error = '';
        if (typeof campo === 'object' && campo.validate) {
            const esValido = campo.validate(value);
            error = esValido ? '' : campo.mensajeError;
            campo= { ...campo, value, error }
        } else {
            campo = value;
            if (event.target.type === 'checkbox' && !value) {
                error = 'Este campo es obligatorio.';
            }
        }
        setEstadoFormulario({
            ...estadoFormulario,
            [event.target.name]: campo 
        });
    };

    const manejarSubmit = (event) => {
        event.preventDefault();
        if (esFormularioValido()) {
            
            datos = {
                ...datos,
                nombre: estadoFormulario.nombre.value,
                apellidos: estadoFormulario.apellidos.value,
                email: estadoFormulario.email.value,
                telefono: estadoFormulario.prefijoTelefono + estadoFormulario.telefono.value,
                politicas: estadoFormulario.politicas.value,
                comunicaciones: estadoFormulario.comunicaciones
            };
            fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/reserva/reservar`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(err => {throw err;});
                    }
                    return response.json()
                })
                .then(data => siguientePaso(datos))
                .catch(error =>setErrorPeticion(error.mensaje));
        }else{
            
        }
    };

    const manejarBlur = (event) => {
        const campo = estadoFormulario[event.target.name];
        setEstadoFormulario({
            ...estadoFormulario,
            [event.target.name]: { ...campo, tocado: true }
        });
    };

    return (
        <form className="form-reservar1" onSubmit={manejarSubmit}>
            <label className="label-input">
                Nombre
                <input 
                    type="text" 
                    name="nombre" 
                    value={estadoFormulario.nombre.value} 
                    onChange={manejarChange} 
                    onBlur={manejarBlur} 
                    placeholder="Nombre" 
                    className={estadoFormulario.nombre.error && estadoFormulario.nombre.tocado ? 'input-error' : ''} 
                />
                {estadoFormulario.nombre.error && estadoFormulario.nombre.tocado && <p className="mensaje-error">{estadoFormulario.nombre.error}</p>}
            </label>
            <label className="label-input">
                Apellidos
                <input 
                    type="text" 
                    name="apellidos" 
                    value={estadoFormulario.apellidos.value} 
                    onChange={manejarChange} 
                    onBlur={manejarBlur} 
                    placeholder="Apellidos" className={estadoFormulario.apellidos.error && estadoFormulario.apellidos.tocado ? 'input-error' : ''} 
                />
                {estadoFormulario.apellidos.error && estadoFormulario.apellidos.tocado && <p className="mensaje-error">{estadoFormulario.apellidos.error}</p>}
            </label>
            <label className="label-input">
                Email
                <input type="text"
                    name="email"
                    value={estadoFormulario.email.value}
                    onChange={manejarChange}
                    onBlur={manejarBlur}
                    placeholder="Email"
                    className={estadoFormulario.email.error && estadoFormulario.email.tocado ? 'input-error' : ''} 
                />
                {estadoFormulario.email.error && estadoFormulario.email.tocado && <p className="mensaje-error">{estadoFormulario.email.error}</p>}
            </label>
            <div className="contenedor-telefono">
                <label className="label-prefijo">
                    Prefijo
                    <select
                        name="prefijoTelefono"
                        value={estadoFormulario.prefijoTelefono}
                        onChange={manejarChange}
                    >
                        {prefijos.map(({ pais, codigo }) => (
                            <option key={codigo} value={codigo}>{`${pais} (${codigo})`}</option>
                        ))}
                    </select>
                </label>
                <label className="label-telefono">
                    Teléfono
                    <input
                        type="number"
                        name="telefono"
                        value={estadoFormulario.telefono.value}
                        onChange={manejarChange}
                        onBlur={manejarBlur}
                        placeholder="Teléfono"
                        className={estadoFormulario.telefono.error && estadoFormulario.telefono.tocado ? 'input-error' : ''} 
                    />
                    {estadoFormulario.telefono.error && estadoFormulario.telefono.tocado && <p className="mensaje-error">{estadoFormulario.telefono.error}</p>}
                </label>
            </div>
            <div className="contenedor-checkbox">
                <label className="checkbox-politicas">
                    <input
                        type="checkbox"
                        name="politicas"
                        checked={estadoFormulario.politicas.value}
                        onChange={manejarChange}
                        onBlur={manejarBlur}
                        className={estadoFormulario.politicas.error && estadoFormulario.politicas.tocado ? 'input-error' : ''} 
                    />
                    Acepto las condiciones de uso, política de privacidad y aviso legal.
                    

                </label>
                {estadoFormulario.politicas.error && estadoFormulario.politicas.tocado && <p className="mensaje-error">{estadoFormulario.politicas.error}</p>}
                <label className="checkbox-comunicaciones">
                    <input
                        type="checkbox"
                        name="comunicaciones"
                        checked={estadoFormulario.comunicaciones}
                        onChange={manejarChange} 
                    />
                    Consiento la recepción de comunicaciones del restaurante por e-mail y/o SMS comerciales.
                </label>
            </div>
            <button className="form-boton-reservar" type="submit">RESERVAR</button>
            {errorPeticion && <p className="mensaje-error">{errorPeticion}</p>}
            
        </form>
    );
}