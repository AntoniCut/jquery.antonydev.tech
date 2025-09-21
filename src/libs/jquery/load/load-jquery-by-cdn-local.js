//  ----------------------------------------------------
//  ----------  /load-jquery-by-cdn-local.js  ----------
//  ----------------------------------------------------


import { loadJQueryByCdn } from '/src/libs/jquery/load/load-jquery-by-cdn.js';
import { loadJQueryByLocal } from '/src/libs/jquery/load/load-jquery-by-local.js';



/**
 * Carga la librería jQuery desde un CDN si está disponible, 
 * o desde una ruta local como fallback.
 *  
 * Esta función devuelve una **Promesa** que se resuelve
 * con el objeto `window.jQuery` cuando la librería se ha
 * cargado correctamente (ya sea desde el CDN o local).
 *
 * @function loadJQueryByCdnOLocal
 *
 * @param {Object|null} [cdnJQuery=null] - Objeto de configuración del CDN de jQuery.
 * @param {string} cdnJQuery.srcCdn - URL del archivo jQuery en el CDN.
 * @param {string} [cdnJQuery.integrity] - Hash de integridad para seguridad (opcional).
 * @param {string} [cdnJQuery.crossOrigin] - Política CORS para la carga del script (opcional).
 * @param {string} [cdnJQuery.referrerPolicy] - Política de referer (opcional).
 *
 * @param {string} localJQuery - Ruta local del archivo jQuery que se usará
 *                               si el CDN no está definido o falla la carga.
 *
 * @returns {Promise<typeof window.jQuery>}
 *  Promesa que se resuelve con el objeto `window.jQuery`
 *  cuando jQuery se haya cargado exitosamente,
 *  o se rechaza con un error si falla tanto el CDN como la carga local.
 *
 * @description
 *  1. Si jQuery ya está presente en `window.jQuery`, resuelve inmediatamente.
 *  2. Si no se proporciona un objeto de CDN válido, carga directamente desde local.
 *  3. En caso contrario, intenta cargar desde CDN con fallback a local.
 */


export const loadJQueryByCdnOLocal = (cdnJQuery = null, localJQuery) => {



    return new Promise((resolve, reject) => {

        //  -----  Verifica si jQuery ya está cargado  -----
        if (window.jQuery) {
            
            console.warn("jQuery ya estaba cargado:", $.fn.jquery);
            return resolve(window.jQuery);
        }


         //  -----  Si NO se pasó CDN, cargar directo desde local  -----
        if (!cdnJQuery || !cdnJQuery.srcCdn) {

            console.error("No se definió CDN de jQuery, cargando desde local...");
            loadJQueryByLocal(localJQuery, resolve, reject);
            return;
        }

        
        loadJQueryByCdn(cdnJQuery, localJQuery, resolve, reject);
                

    });


}
