//  ----------------------------------------------
//  ----------  /load-jquery-by-cdn.js  ----------
//  ----------------------------------------------


import { loadJQueryByLocal } from "/src/libs/jquery/load/load-jquery-by-local.js";



/**
 * Carga la librería jQuery desde un CDN y, en caso de fallo,
 * intenta cargarla desde una ruta local como fallback.
 *
 * @function loadJQueryByCdn
 *
 * @param {Object} cdnJQuery - Objeto de configuración del CDN de jQuery.
 * @param {string} cdnJQuery.srcCdn - URL del archivo jQuery en el CDN.
 * @param {string} [cdnJQuery.integrity] - Hash de integridad para verificar el archivo (opcional).
 * @param {string} [cdnJQuery.crossOrigin] - Política CORS para la carga del script (opcional).
 * @param {string} [cdnJQuery.referrerPolicy] - Política de referer (opcional).
 *
 * @param {string} localJQuery - Ruta local del archivo jQuery que se usará si el CDN falla.
 *
 * @param {Function} resolve - Función de resolución de la promesa que recibe el objeto `window.jQuery`
 *                              cuando la librería se carga correctamente.
 *
 * @param {Function} reject - Función de rechazo de la promesa que recibe un mensaje de error
 *                             cuando falla la carga desde el CDN y el fallback local.
 *
 * @description
 *  1. Intenta crear y cargar un `<script>` apuntando al CDN especificado.
 *  2. Si el archivo se carga correctamente, se resuelve la promesa devolviendo `window.jQuery`.
 *  3. Si la carga falla, llama a `loadJQueryByLocal` para intentar cargar la versión local.
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
        
        if (window.jQuery) {
        
            console.warn("jQuery cargado desde CDN - Versión:", window.jQuery.fn.jquery);
            resolve(window.jQuery);
        
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

