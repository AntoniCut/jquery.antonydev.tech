//  ----------------------------------------------
//  ----------  /load-jquery-by-cdn.js  ----------
//  ----------------------------------------------



//@ts-ignore
import { loadJQueryByLocal } from "/src/libs/jquery/load/load-jquery-by-local.js";



/** - Carga jQuery desde un CDN con fallback a local si falla
 * @import  {CDNJQuery} from '../../../types/cdn-types.js';
 * @param {CDNJQuery} cdnJQuery 
 * @param {string} localJQuery 
 * @param {Function} resolve 
 * @param {Function} reject
 */

export const loadJQueryByCdn = (cdnJQuery, localJQuery, resolve, reject) => {


    const {
        srcCdn,
        integrity,
        crossOrigin,
        referrerPolicy
    } = cdnJQuery;


    //  -----  Carga jQuery por Primera Vez  -----
    console.warn("Cargando jQuery desde CDN...");

    //  -----  Crea el script del CDN  -----
    const script = document.createElement("script");
    script.src = srcCdn;

    if (integrity)
        script.integrity = integrity;

    if (crossOrigin)
        script.crossOrigin = crossOrigin;

    if (referrerPolicy)
        script.referrerPolicy = referrerPolicy;


    //  -----  Eventos de Carga  -----
    script.onload = () => {
        
       
        if ($) {

            console.warn("jQuery cargado desde CDN - Versión:", $.fn.jquery);
            resolve($);

        } else {
            reject("jQuery no se cargó correctamente desde CDN.");
        }
    };


    //  -----  Eventos de Error  -----
    script.onerror = () => {

        console.error("CDN falló. Cargando jQuery desde local...");

        //  -----  Si el CDN falla, carga jQuery localmente  -----
        loadJQueryByLocal(localJQuery, resolve, reject);

    };


    //  -----  Añadir script al head  -----
    document.head.appendChild(script);

}

