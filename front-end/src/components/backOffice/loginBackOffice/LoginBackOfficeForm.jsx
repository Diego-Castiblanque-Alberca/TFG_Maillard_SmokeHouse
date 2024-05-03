import '../../../styles/loginbackOffice/LoginBackOfficeForm.css';

import { useNavigate } from 'react-router-dom';
import { InputForm } from './InputForm';
import {useState} from 'react';

//Componente formulario de login de backoffice
export const LoginBackOfficeForm = () => {
    const navigate = useNavigate();//Hook para redireccionar a otra página
    const [errorPeticion, setErrorPeticion] = useState('');//Hook para mostrar errores en la petición

    //Función que se ejecuta cuando se envía el formulario
    const handleSubmit = (e) => {
        const form = e.target;
        e.preventDefault();
        //Si el formulario es válido se envían los datos al servidor
        if (form.checkValidity()) {
            //Se obtienen los datos del formulario
            const email = form.elements['email'].value;
            const password = form.elements['password'].value;
            const remember = form.elements['remember'].checked;
            //Se envían los datos al servidor para hacer login
            fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    remember: remember
                })
            })
                //Si la respuesta es correcta se guarda el token en el local storage o en session storage
                .then(response => {
                    //Solo se guarda el token si la respuesta es correcta y el status es 200.
                    if (response.status !== 200) {
                        return response.json().then(error => {throw error;})
                    }
                    return response.json();
                })
                .then(data => {
                    //Si el usuario ha marcado la casilla de mantener sesión abierta se guarda el token en el local storage
                    if (data.token && remember) {
                        localStorage.setItem('authToken', data.token);
                        navigate('/backOffice', { state: { from: location.pathname } });
                    } else {
                        //Si no, se guarda en el session storage
                        sessionStorage.setItem('authToken', data.token);
                        navigate('/backOffice', { state: { from: location.pathname } });
                    }
                })
                .catch(error => {
                    //Si hay un error en la petición se muestra el mensaje de error
                    setErrorPeticion(error.mensaje);
                });
        }

    }
    return (
        <>
            <h1 className='titulo'>Login</h1>
            <form className="form-login" onSubmit={handleSubmit}>
                <InputForm
                    label="Usuario"
                    type="email"
                    name="email"
                    placeholder="Introduzca su email"
                    required={true}
                    autocomplete="email"
                    mensajeError={'*Campo obligatorio. Introduzca un email válido.'}
                />
                <InputForm
                    label="Contraseña"
                    type="password"
                    name="password"
                    placeholder="Introduzca su contraseña"
                    required={true}
                    autocomplete="current-password"
                    mensajeError={'*Campo obligatorio. Introduzca una contraseña'}
                />
                <div className="container-checkbox">
                    <input
                        className='input-checkbox'
                        type='checkbox'
                        name='remember'
                        id='remember'
                    />
                    <label
                        className='label-checkbox'
                        htmlFor='remember'
                    >
                        Mantener sesión abierta.
                    </label>
                </div>
                <button className="button-submit">Enviar</button>
                {errorPeticion && <p style={{color: 'red', textAlign: 'center'}}>{errorPeticion}</p>}
            </form>
        </>
    )
}