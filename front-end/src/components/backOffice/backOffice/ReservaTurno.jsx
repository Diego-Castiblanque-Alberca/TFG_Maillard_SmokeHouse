import puntos from '../../../imgs/puntos.svg';
import editar from '../../../imgs/editar.svg';
import basura from '../../../imgs/basura.svg';
import '../../../styles/backOffice/ReservaTurno.css';

export function ReservaTurno({reserva}) {
    return (
        <div className='turno-reserva'>
            <div className="datos-turno-reserva">
                <p className='primera-mayus'>{reserva.nombre}</p>
                <p>Mesa {reserva.mesa1}{reserva.mesa2 ? `,${reserva.mesa2}`:''}</p>
                <p>{reserva.comensales} PAX</p>
            </div>
            <div className="btnes-reserva">
                <img src={puntos} alt="" />
                <img src={editar} alt="" />
                <img src={basura} alt="" />
            </div>
        </div>
    )
}