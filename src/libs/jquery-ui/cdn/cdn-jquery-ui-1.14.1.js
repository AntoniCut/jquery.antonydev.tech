//  -----------------------------------------------
//  ----------  cdn-jquery-ui-1.14.1.js  ----------
//  -----------------------------------------------

/**
 * Configuración para cargar **jQuery UI 1.14.1** desde un CDN.
 *
 * Este objeto se utiliza para proporcionar la información
 * necesaria a las funciones de carga dinámica
 * (`loadJQueryUIByCdn`, `loadJQueryUIByCdnOLocal`, etc.),
 * permitiendo especificar URL, integridad, política CORS
 * y política de referencia.
 *
 * @constant
 * @type {Object}
 *
 * @property {string} srcCdn - URL del archivo minificado de jQuery UI en el CDN oficial.
 * @property {string} integrity - Hash SRI (*Subresource Integrity*) para verificar
 *                                que el archivo no haya sido manipulado.
 * @property {string} crossOrigin - Política de CORS para la carga del script
 *                                  (por ejemplo `"anonymous"`).
 * @property {string} referrerPolicy - Política de envío del encabezado *Referer*
 *                                     (por ejemplo `"no-referrer"`).
 *
 * @example
 * import { cdnJQueryUI_1_14_1 } from './cdn-jquery-ui-1.14.1.js';
 *
 * // Cargar jQuery UI usando el objeto de configuración:
 * loadJQueryUIByCdnOLocal(cdnJQueryUI_1_14_1, '/libs/jquery-ui/jquery-ui-1.14.1.min.js')
 *   .then(($) => console.log('jQuery UI cargado', $.ui.version))
 *   .catch(console.error);
 */


// ----------  Configuración de jQuery UI por CDN ----------
export const cdnJQueryUI_1_14_1 = {
    srcCdn: "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.14.1/jquery-ui.min.js",
    integrity: "sha512-MSOo1aY+3pXCOCdGAYoBZ6YGI0aragoQsg1mKKBHXCYPIWxamwOE7Drh+N5CPgGI5SA9IEKJiPjdfqWFWmZtRA==",
    crossOrigin: "anonymous",
    referrerPolicy: "no-referrer", // ✅ Propiedad corregida (antes podía estar mal escrita)
};
