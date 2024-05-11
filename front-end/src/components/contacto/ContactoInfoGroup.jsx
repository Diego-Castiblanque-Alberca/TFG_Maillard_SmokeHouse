
import { CONTACTO } from "../../utils/consts.js"
import '../../styles/contacto/ContactoInfo.css'

export function ContactoInfoGroup() {

    const [infoTitulo, ...arrInfo] = CONTACTO;

    return (
        <section className='contacto-group'>
            <div>
            <h1 className="titulo-contacto">{infoTitulo.h1}</h1>
            </div>
           <div className="contacto-info-group">
           {
                arrInfo.map((info, index) => {
                    const { titulo, descripcion } = info;
                    return (
                        <article className='contacto-info'>
                            <h2 className='titulo-contacto-info'>{titulo}</h2>
                            <p className='descripcion-contacto-info'>{descripcion}</p>
                        </article>
                    )
                })
            }
           </div>
        </section>
    )
}
