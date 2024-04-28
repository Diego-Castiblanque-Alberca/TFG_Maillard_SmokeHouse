import '../../../styles/loginbackOffice/CheckBoxForm.css';

export const CheckBoxForm = ({label, name, value, onBlur, required}) => {
    
    const labelStyle = required ? 'label-checkbox-required' : 'label-checkbox';

    return (
        <div className="container-checkbox">
            <input 
            className='input-checkbox' 
            type='checkbox' 
            name={name} 
            id={name}
            value={value} 
            onBlur={onBlur}
            required={required} 
            />
            <label 
            className={labelStyle}
            htmlFor={name} 
            >{label}</label>
        </div>
    )
}

CheckBoxForm.defaultProps = {required: false};