import '../../styles/politicas/Politicas.css';

export function Cookies() {
    return (
        <div className="subcontainer-politicas" id='cookies'> 
            <section className='section-politicas'>
                <h2 className='titulo-principal'>POLÍTICA DE COOKIES</h2>
                <p className='p-indent'>Las cookies son pequeñas cantidades de información que se almacenan en el navegador utilizado por cada usuario para que el servidor recuerde cierta información que posteriormente pueda utilizar.</p>
            </section>
            <section className='section-politicas'>
                <h3 className='subtitulo'>TIPOS DE COOKIES QUE UTILIZAMOS</h3>
                <p className='p-indent'>Esta página web utiliza cookies de terceros que son aquellas que se envían a tu ordenador o terminal desde un dominio o una página web que no es gestionada por nosotros, sino por otra entidad que trata los datos obtenidos a través de las cookies.</p>
                <p>En este caso las Cookies son utilizadas con fines estadísticos relacionados con las visitas que recibe y las páginas que se consultan, quedando aceptado su uso al navegar por ella.</p>
            </section>
            <section className='section-politicas'>
                <table>
                    <thead>
                        <tr>
                            <th>Cookie (y proveedor)</th>
                            <th>Duración</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>__cfduid (notin.es)</td>
                            <td>Sesión</td>
                            <td>Publicidad</td>
                        </tr>
                        <tr>
                            <td>personalization_id (twitter.com)</td>
                            <td>Sesión</td>
                            <td>Twitter</td>
                        </tr>
                        <tr>
                            <td>Facebook</td>
                            <td>Publicidad, estadísticas y mediciones</td>
                            <td>Coloca Cookies en el ordenador o dispositivo y recibe la información almacenada en ellas cuando utilizas o visitas servicios prestados por otras empresas que utilizan los servicios de Facebook.</td>
                        </tr>
                        <tr>
                            <td>_ga (Google)</td>
                            <td>2 años</td>
                            <td>Se usa para distinguir a los usuarios.</td>
                        </tr>
                        <tr>
                            <td>_gid (Google)</td>
                            <td>24 horas</td>
                            <td>Se usa para distinguir a los usuarios.</td>
                        </tr>
                        <tr>
                            <td>_gat (Google)</td>
                            <td>1 minuto</td>
                            <td>Se usa para limitar el porcentaje de solicitudes. Si has implementado Google Analytics mediante Google Tag Manager, esta cookie se llamará _dc_gtm_.</td>
                        </tr>
                        <tr>
                            <td>_gali (Google)</td>
                            <td>30s</td>
                            <td>Atribución de enlace mejorada.</td>
                        </tr>
                        <tr>
                            <td>_unam (SHARETHIS)</td>
                            <td>Persistente</td>
                            <td>Su finalidad es cuantificar el número de Usuarios que comparten un determinado contenido y cuántas páginas web son visitadas a raíz de esa acción.</td>
                        </tr>
                        <tr>
                            <td>WordPress</td>
                            <td>2 años</td>
                            <td>Utilizado para el correcto funcionamiento del gestor de contenido WordPress.</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            
            <section className='section-politicas'>
                <p>Si desea más información más sobre los tipos de cookies de seguimiento y análisis de datos de Google <a className='link' href="https://www.google.com/intl/es_es/policies/technologies/types/ ">haga clic aquí.</a></p>
                <h3>Para informarse sobre cómo eliminar las cookies de su explorador:</h3>
                <ul className='lista'>
                    <li><a className='link' href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias">Firefox</a></li>
                    <li><a className='link' href="https://support.google.com/chrome/answer/95647?hl=es">Chrome</a></li>
                    <li><a className='link' href="https://support.microsoft.com/es-es/topic/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d">Internet Explorer</a></li>
                    <li><a className='link' href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-">Safari</a></li>
                    <li><a className='link' href="https://www.allaboutcookies.org/es/administrar-las-cookies/opera.html">Opera</a></li>
                </ul>
            </section>
        </div>
    );
}