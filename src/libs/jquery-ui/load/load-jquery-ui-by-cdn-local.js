//  -------------------------------------------------------
//  ----------  /load-jquery-ui-by-cdn-local.js  ----------
//  -------------------------------------------------------


import { loadJQueryUIByCdn } from '/src/libs/jquery-ui/load/load-jquery-ui-by-cdn.js';
import { loadJQueryUIByLocal } from '/src/libs/jquery-ui/load/load-jquery-ui-by-local.js';



/**
 * Carga la librería **jQuery UI** desde un CDN si está disponible,
 * o desde una ruta local como fallback.
 *
 * Devuelve una **Promesa** que se resuelve con el objeto `window.jQuery`
 * una vez que jQuery UI ha sido cargado correctamente (requiere que jQuery
 * ya esté previamente disponible en la página).
 *
 * @function loadJQueryUIByCdnOLocal
 *
 * @param {Object|null} [cdnJQueryUI=null] - Objeto de configuración del CDN de jQuery UI.
 * @param {string} cdnJQueryUI.srcCdn - URL del archivo jQuery UI en el CDN.
 * @param {string} [cdnJQueryUI.integrity] - Hash de integridad para seguridad (opcional).
 * @param {string} [cdnJQueryUI.crossOrigin] - Política CORS para la carga del script (opcional).
 * @param {string} [cdnJQueryUI.referrerPolicy] - Política de referer (opcional).
 *
 * @param {string} localJQueryUI - Ruta local del archivo jQuery UI que se usará
 *                                 si el CDN no está definido o falla la carga.
 *
 * @returns {Promise<typeof window.jQuery>}
 *  Promesa que se resuelve con `window.jQuery` (ya con jQuery UI cargado),
 *  o se rechaza con un error si falla tanto el CDN como la carga local.
 *
 * @description
 *  1. Muestra en consola el inicio de la carga de jQuery UI.
 *  2. Si no se proporciona un objeto de CDN válido, carga directamente desde local.
 *  3. Si hay un CDN definido, intenta cargarlo con fallback a la versión local.
 */

//  -----  Función para cargar jQuery UI desde CDN o local  -----
export const loadJQueryUIByCdnOLocal = (cdnJQueryUI = null, localJQueryUI) => {


    return new Promise((resolve, reject) => {


        console.log('\n');
        console.warn("Cargando jQuery UI...");

        //  -----  Si NO se pasó CDN, cargar directo desde local  -----
        if (!cdnJQueryUI || !cdnJQueryUI.srcCdn) {

            console.error("No se definió CDN de jQuery UI, cargando desde local...");
            loadJQueryUIByLocal(localJQueryUI, resolve, reject);
            return;
        }


        //  -----  SI HAY CDN definido, intentar cargarlo  -----
        loadJQueryUIByCdn(cdnJQueryUI, localJQueryUI, resolve, reject);

    });

}
