//  -------------------------------------------
//  ----------  cdn-jquery-3.6.3.js  ----------
//  -------------------------------------------



/**
 * Configuración para cargar **jQuery 3.7.1** desde un CDN.
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
 * import { cdnJQuery_3_7_1 } from './cdn-jquery-3.6.3.js';
 *
 * loadJQueryByCdnOLocal(cdnJQuery_3_7_1, '/libs/jquery/jquery-3.7.1.min.js')
 *   .then(($) => console.log('jQuery cargado', $.fn.jquery))
 *   .catch(console.error);
 */

//  ----------  Configuración de jQuery por CDN  ----------
export const cdnJQuery_3_7_1 = {

    srcCdn: "https://code.jquery.com/jquery-3.7.1.min.js",
    integrity: "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=",
    crossOrigin: "anonymous",
    referrePolicy: "no-referrer",
}
