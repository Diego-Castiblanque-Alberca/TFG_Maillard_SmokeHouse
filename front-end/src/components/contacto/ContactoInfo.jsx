import '../../styles/contacto/ContactoInfo.css';

export function ContactoInfo({ titulo, descripcion }) {

  return (
      <article className='contacto-info'>
        <h2 className='titulo-contacto-info'>{titulo}</h2>
        <p className='descripcion-contacto-info'>{descripcion}</p>
      </article>
  );
}