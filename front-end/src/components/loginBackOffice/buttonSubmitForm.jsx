import '../../styles/loginbackOffice/ButtonSubmit.css';

export const ButtonSubmit = ({label="Enviar", onClick}) => {
    return (
        <button 
        className="button-submit"
        onClick={onClick}
        >
            {label}
        </button>
    )
}