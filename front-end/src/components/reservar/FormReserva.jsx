import React, { useState } from "react";
import { validarNombre, validarEmail, validarTelefono, validarRequerido } from "../../utils/validaciones";
import '../../styles/reservar/FormReserva.css';

export default function FormReserva({ siguientePaso, datos }) {
    const [formState, setFormState] = useState({
        nombre: { 
            value: '',
            validate: (value) => validarNombre(value) && validarRequerido(value),
            error: 'El nombre debe tener al menos 3 caracteres', tocado: false 
        },
        apellidos: { 
            value: '', 
            validate: (value) => validarNombre(value) && validarRequerido(value), 
            error: 'Los apellidos deben tener al menos 3 caracteres', 
            tocado: false 
        },
        email: { 
            value: '', 
            validate: (value) => validarEmail(value) && validarRequerido(value), 
            error: 'El email no es válido', 
            tocado: false 
        },
        prefijoTelefono: '+34',
        telefono: { 
            value: '', 
            validate: (value) => validarTelefono(value) && validarRequerido(value), 
            error: 'El teléfono debe tener 9 dígitos', 
            tocado: false 
        },
        politicas: { 
            value: '', 
            validate: validarRequerido, 
            error: 'Debe aceptar las políticas de privacidad', 
            tocado: false 
        },
        comunicaciones: false
    });

    const prefijos = [
        { pais: 'Spain', codigo: '+34' },
        { pais: 'France', codigo: '+33' },
        { pais: 'Germany', codigo: '+49' },
    ];

    const esFormularioValido = () => {
        for (let campo in formState) {
            if (formState[campo].hasOwnProperty('error') && formState[campo].error) {
                return false;
            }
        }
        return true;
    };

    const handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        let campo = formState[event.target.name];
        let error = '';
        if (typeof campo === 'object' && campo.validate) {
            const esValido = campo.validate(value);
            error = esValido ? '' : campo.error;
            campo= { ...campo, value, error }
        } else {
            campo = value;
            if (event.target.type === 'checkbox' && !value) {
                error = 'Este campo es obligatorio.';
            }
        }
        setFormState({
            ...formState,
            [event.target.name]: campo 
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (esFormularioValido()) {
            
            datos = {
                ...datos,
                nombre: formState.nombre.value,
                apellidos: formState.apellidos.value,
                email: formState.email.value,
                telefono: formState.prefijoTelefono + formState.telefono.value,
                politicas: formState.politicas.value,
                comunicaciones: formState.comunicaciones
            };
            console.log(datos);
            fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/reserva/reservar`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            })
                .then(response => response.json())
                .then(() =>{
                    siguientePaso(datos)
                })
                .catch(error => console.error('Error:', error));
            
        }else{
            //aqui puede haber un popup de error
            alert('El formulario contiene errores');
        }
    };

    const handleBlur = (event) => {
        const campo = formState[event.target.name];
        setFormState({
            ...formState,
            [event.target.name]: { ...campo, tocado: true }
        });
    };

    return (
        <form className="form-reservar1" onSubmit={handleSubmit}>
            <label className="label-input">
                Nombre
                <input 
                    type="text" 
                    name="nombre" 
                    value={formState.nombre.value} 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    placeholder="Nombre" 
                    className={formState.nombre.error && formState.nombre.tocado ? 'input-error' : ''} 
                />
            </label>
            <label className="label-input">
                Apellidos
                <input 
                    type="text" 
                    name="apellidos" 
                    value={formState.apellidos.value} 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    placeholder="Apellidos" className={formState.apellidos.error && formState.apellidos.tocado ? 'input-error' : ''} 
                />
            </label>
            <label className="label-input">
                Email
                <input type="text"
                    name="email"
                    value={formState.email.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                    className={formState.email.error && formState.email.tocado ? 'input-error' : ''} 
                />
            </label>
            <div className="contenedor-telefono">
                <label className="label-prefijo">
                    Prefijo
                    <select
                        name="prefijoTelefono"
                        value={formState.prefijoTelefono}
                        onChange={handleChange}
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
                        value={formState.telefono.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Teléfono"
                        className={formState.telefono.error && formState.telefono.tocado ? 'input-error' : ''} 
                    />
                </label>
            </div>
            <div className="contenedor-checkbox">
                <label className="checkbox-politicas">
                    <input
                        type="checkbox"
                        name="politicas"
                        checked={formState.politicas.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={formState.politicas.error && formState.politicas.tocado ? 'input-error' : ''} 
                    />
                    Acepto las condiciones de uso, política de privacidad y aviso legal.
                </label>
                <label className="checkbox-comunicaciones">
                    <input
                        type="checkbox"
                        name="comunicaciones"
                        checked={formState.comunicaciones}
                        onChange={handleChange} 
                    />
                    Consiento la recepción de comunicaciones del restaurante por e-mail y/o SMS comerciales.
                </label>
            </div>
            <button className="form-boton-reservar" type="submit">RESERVAR</button>
        </form>
    );
}