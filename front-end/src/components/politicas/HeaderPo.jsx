import homeIcon from '../../imgs/botonHeader.svg';
import '../../styles/HeaderNav.css';

export function HeaderPo() {
    return (
        <nav className='nav-open'>
            <div className='header__container'>
                <div>
                    <img src={homeIcon} alt="Home" />
                </div>
                {/* Opciones para cambiar el idioma */}
                <ul className='traducir'>
                    <li className='traducir__ES'>
                        ES
                    </li>
                    <li className='traducir__EN'>
                        EN
                    </li>
                </ul>
            </div>
        </nav>
    );
}