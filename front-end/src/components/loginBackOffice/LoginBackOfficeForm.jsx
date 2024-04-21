import '../../styles/loginbackOffice/LoginBackOfficeForm.css';


import { ButtonSubmit } from './buttonSubmitForm';
import { InputForm } from './InputForm';
import { CheckBoxForm } from './CheckBoxForm';


export const LoginBackOfficeForm = () => {
   
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
            fetch('http://localhost:8000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                //credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(response => response.json())
            .then(data => {
                //Se muestra en consola la respuesta del servidor
                console.log('Login successful:', data);
                //Se almacena el token de autenticación en una cookie
                document.cookie = `authToken=${data.token}; path=/`;
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        } else {
            console.log('Formulario no enviado');
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