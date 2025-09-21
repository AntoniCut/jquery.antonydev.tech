//  -------------------------------------------------
//  ----------  /load-jquery-ui-by-cdn.js  ----------
//  -------------------------------------------------


import { loadJQueryUIByLocal } from '/src/libs/jquery-ui/load/load-jquery-ui-by-local.js';



/**
 * Carga la librería **jQuery UI** desde un CDN y,
 * si la carga falla, utiliza automáticamente la versión local como fallback.
 *
 * Esta función no devuelve una promesa directamente;
 * en su lugar, usa las funciones `resolve` y `reject` proporcionadas
 * por la promesa externa (generalmente creada en `loadJQueryUIByCdnOLocal`).
 *
 * @function loadJQueryUIByCdn
 *
 * @param {Object} cdnJQueryUI - Objeto de configuración para el CDN de jQuery UI.
 * @param {string} cdnJQueryUI.srcCdn - URL del archivo jQuery UI en el CDN.
 * @param {string} [cdnJQueryUI.integrity] - Hash de integridad para seguridad (opcional).
 * @param {string} [cdnJQueryUI.crossOrigin] - Política de CORS para la carga del script (opcional).
 * @param {string} [cdnJQueryUI.referrerPolicy] - Política de referer (opcional).
 *
 * @param {string} localJQueryUI - Ruta local del archivo jQuery UI
 *                                 usada si el CDN falla.
 * @param {Function} resolve - Función de resolución de la promesa externa,
 *                             se invoca con `window.jQuery` si la carga es exitosa.
 * @param {Function} reject - Función de rechazo de la promesa externa,
 *                            se invoca con un `Error` si falla el CDN y el fallback.
 *
 * @description
 *  1. Crea dinámicamente un elemento `<script>` para cargar jQuery UI desde el CDN.
 *  2. Si la carga es exitosa y jQuery UI está disponible, ejecuta `resolve(jQuery)`.
 *  3. Si la carga desde CDN falla, intenta cargar el archivo local usando `loadJQueryUIByLocal`.
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

        if (window.jQuery && jQuery.ui) {
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
