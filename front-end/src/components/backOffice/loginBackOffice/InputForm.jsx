import '../../../styles/loginbackOffice/InputForm.css'
import { useState } from 'react';

//Componente input de formulario con validación
export const InputForm = ({ label, type, name, id, value, placeholder, required, pattern, autoComplete, mensajeError }) => {
    //Estado para controlar si el input es válido
    const [isValid, setIsValid] = useState(true);
    //Función que se ejecuta cuando el input pierde el foco
    const handleInputBlur = (e) => {
        setIsValid(e.target.checkValidity());
    }
    return (
        <div className="container-input">
            <label className='label-formulario' htmlFor="{id}">{label}</label>
            <input
                className={isValid === true ? 'input' : 'input input-invalid'}
                type={type}
                name={name}
                id={id}
                value={value}
                onBlur={handleInputBlur}
                placeholder={placeholder}
                required={required}
                pattern={pattern}
                autoComplete={autoComplete}
            />
            {/* Mensaje de error si el input no es válido */}
            <span className={isValid === true ? 'span-error-hidden' : 'span-error'}>{mensajeError}</span>
        </div>
    )
}
InputForm.defaultProps = {
    required: false,
    autocomplete: 'off'
};