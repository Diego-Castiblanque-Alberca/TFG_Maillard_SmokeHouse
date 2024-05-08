import React, { useState } from "react";
import { validarNombre, validarEmail, validarTelefono, validarRequerido } from "../../utils/validaciones";
import '../../styles/reservar/FormReserva.css';

export default function FormReserva({ siguientePaso, datos }) {
    // Inicialización del estado del formulario
    const [estadoFormulario, setEstadoFormulario] = useState({
        // Cada campo tiene su valor, función de validación, mensaje de error y estado tocado
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

    // Estado para manejar errores de la petición
    const [errorPeticion, setErrorPeticion] = useState('');

    // Array de prefijos telefónicos
    const prefijos = [
        { pais: 'Spain', codigo: '+34' },
        { pais: 'France', codigo: '+33' },
        { pais: 'Germany', codigo: '+49' },
    ];
    
    // Función para validar el formulario completo
    // Comprueba si hay algún campo con error
    const esFormularioValido = () => {
        for (let campo in estadoFormulario) {
            if (estadoFormulario[campo].hasOwnProperty('error') && estadoFormulario[campo].error) {
                return false;
            }
        }
        return true;
    };

    // Manejador del evento onChange de los campos del formulario
    const manejarChange = (event) => {
        // Dependiendo del tipo de entrada, obtenemos el valor del evento
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        // Obtenemos el campo del estado del formulario que corresponde al nombre de la entrada
        let campo = estadoFormulario[event.target.name];

        // Inicializamos el error como una cadena vacía
        let error = '';

        // Si el campo es un objeto y tiene una función de validación
        if (typeof campo === 'object' && campo.validate) {
            // Validamos el valor
            const esValido = campo.validate(value);

            // Si es válido, el error sigue siendo una cadena vacía, si no, el error es el mensaje de error del campo
            error = esValido ? '' : campo.mensajeError;

            // Actualizamos el campo con el nuevo valor y el error
            campo= { ...campo, value, error }
        } else {
            // Si el campo no es un objeto, simplemente actualizamos el valor
            campo = value;

            // Si es un checkbox y no está marcado, establecemos el error como 'Este campo es obligatorio.'
            if (event.target.type === 'checkbox' && !value) {
                error = 'Este campo es obligatorio.';
            }
        }

        // Actualizamos el estado del formulario con el nuevo estado del campo
        setEstadoFormulario({
            ...estadoFormulario,
            [event.target.name]: campo 
        });
    };

   // Manejador del evento onSubmit del formulario
    const manejarSubmit = (event) => {
        // Prevenimos el comportamiento por defecto del formulario (recargar la página)
        event.preventDefault();

        // Si el formulario es válido
        if (esFormularioValido()) {
            // Actualizamos los datos con los valores del formulario
            datos = {
                ...datos,
                nombre: estadoFormulario.nombre.value,
                apellidos: estadoFormulario.apellidos.value,
                email: estadoFormulario.email.value,
                telefono: estadoFormulario.prefijoTelefono + estadoFormulario.telefono.value,
                politicas: estadoFormulario.politicas.value,
                comunicaciones: estadoFormulario.comunicaciones
            };

            // Hacemos una petición POST a la API para reservar
            fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/reserva/reservar`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            })
                .then(response => {
                    // Si la respuesta no es ok, lanzamos el error
                    if (!response.ok) {
                        return response.json().then(err => {throw err;});
                    }
                    // Si la respuesta es ok, devolvemos los datos de la respuesta
                    return response.json()
                })
                .then(data => {
                    // Si todo ha ido bien, pasamos al siguiente paso con los datos
                    siguientePaso(datos)
                })
                .catch(error => {
                    // Si ha habido un error, lo guardamos en el estado
                    setErrorPeticion(error.mensaje)
                });
        }else{
        // Actualizamos el estado de los campos que no son válidos
        let nuevoEstadoFormulario = { ...estadoFormulario };
        for (let campo in nuevoEstadoFormulario) {
            if (nuevoEstadoFormulario[campo].hasOwnProperty('validate')) {
                const esValido = nuevoEstadoFormulario[campo].validate(nuevoEstadoFormulario[campo].value);
                if (!esValido) {
                    nuevoEstadoFormulario[campo].error = nuevoEstadoFormulario[campo].mensajeError;
                    nuevoEstadoFormulario[campo].tocado = true;
                }
            }
        }
        setEstadoFormulario(nuevoEstadoFormulario);
        }
    };

    // Manejador del evento onBlur de los campos del formulario
    const manejarBlur = (event) => {
        // Obtenemos el campo del estado del formulario que corresponde al nombre de la entrada
        const campo = estadoFormulario[event.target.name];

        // Actualizamos el estado del formulario con el nuevo estado del campo
        // Establecemos el campo como "tocado" para indicar que el usuario ha interactuado con él
        setEstadoFormulario({
            ...estadoFormulario,
            [event.target.name]: { ...campo, tocado: true }
        });
    };

    // Renderizado del formulario
    return (
        // El formulario llama a manejarSubmit cuando se envía
        <form className="form-reservar1" onSubmit={manejarSubmit}>
            {/* Cada campo del formulario tiene su etiqueta, input y mensaje de error */}
            {/* El valor del input se toma del estado del formulario */}
            {/* Cuando el valor del input cambia, se llama a manejarChange */}
            {/* Cuando el input pierde el foco, se llama a manejarBlur */}
            {/* Si el campo tiene un error y ha sido tocado, se añade la clase 'input-error' */}
            {/* Si el campo tiene un error y ha sido tocado, se muestra el mensaje de error */}
            {/* Este patrón se repite para cada campo del formulario */}
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
                    <a href="/politicas" target="_blank">Acepto las condiciones de uso, política de privacidad y aviso legal.</a>
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
            {/* El botón de enviar el formulario */}
            <button className="form-boton-reservar" type="submit">RESERVAR</button>
            {/* Si hay un error en la petición, se muestra el mensaje de error */}
            {errorPeticion && <p className="mensaje-error">{errorPeticion}</p>}
            
        </form>
    );
}