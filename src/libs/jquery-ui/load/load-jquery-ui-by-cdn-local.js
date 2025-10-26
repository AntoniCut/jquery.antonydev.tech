//  -------------------------------------------------------
//  ----------  /load-jquery-ui-by-cdn-local.js  ----------
//  -------------------------------------------------------




//@ts-ignore
import { loadJQueryUIByCdn } from '/src/libs/jquery-ui/load/load-jquery-ui-by-cdn.js';

//@ts-ignore
import { loadJQueryUIByLocal } from '/src/libs/jquery-ui/load/load-jquery-ui-by-local.js';



/** - Carga jQuery UI desde un CDN con fallback a local si falla.
 * @import  {CDNJQueryUI} from '../../../types/cdn-types.js';
 * @param {CDNJQueryUI|null} cdnJQueryUI 
 * @param {string} localJQueryUI
 * @returns {Promise<JQueryStatic>}
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
