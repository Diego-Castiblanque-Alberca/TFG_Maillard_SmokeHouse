import puntos from '../../../imgs/puntos.svg';
import editar from '../../../imgs/editar.svg';
import basura from '../../../imgs/basura.svg';
import '../../../styles/backOffice/ReservaTurno.css';

export function ReservaTurno({reserva}) {
    return (
        <div>
            <p>{reserva.nombre}</p>
            <p>{reserva.apellidos}</p>
            <p>Mesa {reserva.mesa1}{reserva.mesa2 ? `,${reserva.mesa2}`:''}</p>
            <p>{reserva.comensales} PAX</p>
            <img src={puntos} alt="" />
            <img src={editar} alt="" />
            <img src={basura} alt="" />
        </div>
    )
}