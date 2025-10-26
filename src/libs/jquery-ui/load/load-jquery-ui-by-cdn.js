//  -------------------------------------------------
//  ----------  /load-jquery-ui-by-cdn.js  ----------
//  -------------------------------------------------



//@ts-ignore
import { loadJQueryUIByLocal } from '/src/libs/jquery-ui/load/load-jquery-ui-by-local.js';



/** - Carga jQuery desde un CDN con fallback a local si falla
 * @import  {CDNJQueryUI} from '../../../types/cdn-types.js';
 * @param {CDNJQueryUI} cdnJQueryUI 
 * @param {string} localJQueryUI 
 * @param {Function} resolve 
 * @param {Function} reject
 */

//  -----  Función para cargar jQuery si desde CDN  -----
export const loadJQueryUIByCdn = (cdnJQueryUI, localJQueryUI, resolve, reject) => {

    
    const {
        srcCdn,
        integrity,
        crossOrigin,
        referrerPolicy
    } = cdnJQueryUI;

    const script = document.createElement("script");

    script.src = srcCdn;

    if (integrity)
        script.integrity = integrity;

    if (crossOrigin)
        script.crossOrigin = crossOrigin;

    if (referrerPolicy)
        script.referrerPolicy = referrerPolicy;


    script.onload = () => {

        if (jQuery.ui) {
            console.warn("jQuery UI cargado desde CDN");
            resolve(jQuery);
        } else {
            reject(new Error("jQuery UI no cargado correctamente desde CDN"));
        }

    };


    script.onerror = () => {

        console.error("Error al cargar jQuery UI desde CDN. Intentando cargar localmente...");
        
        //  -----  Si el CDN falla, carga jQuery UI localmente  -----
        loadJQueryUIByLocal(localJQueryUI, resolve, reject);
    };

    document.head.appendChild(script);

}
