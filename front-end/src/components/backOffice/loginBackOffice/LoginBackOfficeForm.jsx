import '../../../styles/loginbackOffice/LoginBackOfficeForm.css';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ButtonSubmit } from './ButtonSubmitForm';
import { InputForm } from './InputForm';
import { CheckBoxForm } from './CheckBoxForm';
import { useAuth } from '../../../hooks/useAuth';

export const LoginBackOfficeForm = () => {
    const navigate = useNavigate(); // Usa useAuth para obtener la información del usuario
    const user = useAuth();

    useEffect(() => {
        console.log('0');
        if (user){
            console.log('1');
            navigate('/backOffice');
        }
          }, [navigate, user]);
        

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
            console.log('Formulario enviado');
            console.log(email, password, remember);
            //Se envían los datos al servidor  
            fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                //credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    remember: remember
                })
            })
                //Se podría comprobar si es un codigo 200 para mas seguridad
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.token && remember) {
                        localStorage.setItem('authToken', data.token);
                        navigate('/backOffice');
                    } else {
                        sessionStorage.setItem('authToken', data.token);
                        navigate('/backOffice');
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
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
                    autocomplete="username"
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
                <CheckBoxForm
                    label="Recordar usuario y contraseña."
                    name="remember"
                />
                <ButtonSubmit label="Enviar" />
            </form>
        </>
    )
}