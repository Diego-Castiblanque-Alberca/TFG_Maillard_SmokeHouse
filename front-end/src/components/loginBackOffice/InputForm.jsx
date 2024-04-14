import '../../styles/loginbackOffice/InputForm.css'
import { useState } from 'react';

export const InputForm = ({label, type, name, id, value, placeholder, required, pattern, autoComplete, mensajeError}) => {
    const [isValid, setIsValid] = useState(true);
    const handleInputBlur = (e) => {
            setIsValid(e.target.checkValidity());
    }   
    return (
        <div className="container-input">
            <label className='label-formulario' htmlFor="{id}">{label}</label>
            <input 
            className={isValid === true ? 'input' : 'input input-invalid'   } 
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
            <span className={isValid === true ? 'span-error-hidden' : 'span-error'}>{mensajeError}</span>
        </div>
    )
}
InputForm.defaultProps = {
    required: false,
    autocomplete: 'off'
};