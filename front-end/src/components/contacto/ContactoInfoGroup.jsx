import { ContactoInfo } from "./ContactoInfo"
import { CONTACTO } from "../../utils/consts.js"
import "../../styles/contacto/ContactoInfoGroup.css"

export function ContactoInfoGroup() {

    const [ infoTitulo, ...arrInfo ] = CONTACTO;
    
    return (
        <section className='contacto-info-group'>
           <h1 className="titulo">{infoTitulo.h1}</h1>
            {
                arrInfo.map((info, index) => {
                    const {titulo, descripcion} = info;
                    return (
                        <ContactoInfo key={index} titulo={titulo} descripcion={descripcion} />
                    )
                })
            }
        </section>
    )
}
