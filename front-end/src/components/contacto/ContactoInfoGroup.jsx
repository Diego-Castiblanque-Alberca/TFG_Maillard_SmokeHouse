
import '../../styles/contacto/ContactoInfo.css'

export function ContactoInfoGroup() {
    
    return (
        <section className='contacto-group' id="contacto">
            <div>
                <h1 className="titulo-contacto">Información de contacto</h1>
            </div>
            <div className="contacto-info-group">
                <article className='contacto-info' >
                    <h2 className='titulo-contacto-info'>Dirección</h2>
                    <p className='descripcion-contacto-info'>Calle Villablanca, 79, 28032, Madrid</p>
                </article> <article className='contacto-info' >
                    <h2 className='titulo-contacto-info'>Teléfono de información</h2>
                    <p className='descripcion-contacto-info'>+34 914 000 000</p>
                </article> <article className='contacto-info' >
                    <h2 className='titulo-contacto-info'>E-mail</h2>
                    <p className='descripcion-contacto-info'>maillard@smokehouse.es</p>
                </article> <article className='contacto-info' >
                    <h2 className='titulo-contacto-info'>Horarios</h2>
                    <p className='descripcion-contacto-info'>L-D 12:00-15:30h | 20:00-00:00h</p>
                </article>
            </div>
        </section>
    )
}
