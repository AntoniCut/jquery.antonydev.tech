//  -------------------------------------------
//  ----------  cdn-jquery-3.6.3.js  ----------
//  -------------------------------------------



/**
 * Configuración para cargar **jQuery 4.0.0** desde un CDN.
 *
 * Este objeto se utiliza para proporcionar la información
 * necesaria a las funciones de carga dinámica
 * (`loadJQueryByCdn`, `loadJQueryByCdnOLocal`, etc.),
 * permitiendo especificar URL, integridad, política CORS
 * y política de referencia.
 *
 * @constant
 * @type {Object}
 *
 * @property {string} srcCdn - URL del archivo minificado de jQuery en el CDN oficial.
 * @property {string} integrity - Hash SRI (*Subresource Integrity*) para verificar
 *                                que el archivo no haya sido manipulado.
 * @property {string} crossOrigin - Política de CORS para la carga del script
 *                                  (por ejemplo `"anonymous"`).
 * @property {string} referrerPolicy - Política de envío del encabezado *Referer*
 *                                     (por ejemplo `"no-referrer"`).
 *
 * @example
 * import { cdnJQuery_4_0_0 } from './cdn-jquery-4.0.0.js';
 *
 * loadJQueryByCdnOLocal(cdnJQuery_4_0_0, '/libs/jquery/jquery-4.0.0.min.js')
 *   .then(($) => console.log('jQuery cargado', $.fn.jquery))
 *   .catch(console.error);
 */

//  ----------  Configuración de jQuery por CDN  ----------
export const cdnJQuery_4_0_0 = {

    srcCdn: "https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0-beta/jquery.min.js",
    integrity: "",
    crossOrigin: "anonymous",
    referrePolicy: "no-referrer",
}
