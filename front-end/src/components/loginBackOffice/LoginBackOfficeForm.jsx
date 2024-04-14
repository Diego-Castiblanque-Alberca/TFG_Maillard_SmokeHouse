import '../../styles/loginbackOffice/LoginBackOfficeForm.css';


import { ButtonSubmit } from './buttonSubmitForm';
import { InputForm } from './InputForm';
import { CheckBoxForm } from './CheckBoxForm';


export const LoginBackOfficeForm = () => {
   

    const handleSubmit = (e) => {
        const form = e.target;
        e.preventDefault();
        if (form.checkValidity()) {
            const email = form.elements['username'].value;
            const password = form.elements['password'].value;
            const remember = form.elements['remember'].checked;
            console.log('Formulario enviado');
            console.log(email, password, remember);
        } else {
            console.log('Formulario no enviado');
        }
    }
    //Para recuperar los datos del usuario se necesita tener un token de autenticación almacenado en una
    //cookie o en el local storage del navegador. Si el usuario marca la casilla de recordar usuario y contraseña
    return (
        <>
            <h1 className='titulo'>Login</h1>
            <form className="form-login" onSubmit={handleSubmit}>
                <InputForm 
                label="Usuario" 
                type="email" 
                name="username" 
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