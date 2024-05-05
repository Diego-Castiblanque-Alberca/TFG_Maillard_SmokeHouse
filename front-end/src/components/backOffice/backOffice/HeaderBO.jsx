import logo from '../../../imgs/botonHeader.svg';
import logout from '../../../imgs/logout.svg';
import '../../../styles/backOffice/HeaderBO.css';

export default function HeaderBO() {
    return (
        <div className='headerBO'>
            <img src={logo} alt='logo' className='logo'/>
            <img src={logout} alt="logout"/>
        </div>
    );
}