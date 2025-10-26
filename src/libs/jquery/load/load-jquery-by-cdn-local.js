//  ----------------------------------------------------
//  ----------  /load-jquery-by-cdn-local.js  ----------
//  ----------------------------------------------------



//@ts-ignore
import { loadJQueryByCdn } from '/src/libs/jquery/load/load-jquery-by-cdn.js';

//@ts-ignore
import { loadJQueryByLocal } from '/src/libs/jquery/load/load-jquery-by-local.js';



/** - Carga jQuery desde un CDN con fallback a local si falla
 * @import  {CDNJQuery} from '../../../types/cdn-types.js';
 * @param {CDNJQuery|null} cdnJQuery 
 * @param {string} localJQuery 
 * @returns {Promise<JQueryStatic>}
 */

export const loadJQueryByCdnOLocal = (cdnJQuery = null, localJQuery) => {



    return new Promise((resolve, reject) => {

        //  -----  Verifica si jQuery ya está cargado  -----
        
        /** @type {JQueryStatic} */
        
        //@ts-ignore
        const $ = window.jQuery;
        
        if ($) {
            
            console.warn("jQuery ya estaba cargado:", $.fn.jquery);
            return resolve($);
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
