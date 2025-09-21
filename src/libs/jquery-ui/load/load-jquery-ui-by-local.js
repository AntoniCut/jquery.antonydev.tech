//  ---------------------------------------------------
//  ----------  /load-jquery-ui-by-local.js  ----------
//  ---------------------------------------------------



/**
 * Carga la librería **jQuery UI** desde un archivo local
 * y resuelve o rechaza la promesa según el resultado.
 *
 * Esta función se utiliza como **fallback** cuando no es posible
 * cargar jQuery UI desde un CDN o cuando se desea cargar
 * siempre desde una fuente local.
 *
 * @function loadJQueryUIByLocal
 *
 * @param {string} localJQueryUI - Ruta local del archivo de jQuery UI
 *                                 (por ejemplo: `/src/libs/jquery-ui/local/jquery-ui.min.js`).
 * @param {Function} resolve - Función de resolución de la promesa externa;
 *                             se invoca con `window.jQuery` si la carga es exitosa.
 * @param {Function} reject - Función de rechazo de la promesa externa;
 *                             se invoca con un `Error` si la carga falla.
 *
 * @description
 *  1. Crea dinámicamente un elemento `<script>` con la ruta local de jQuery UI.
 *  2. Lo agrega al `<head>` del documento para iniciar la descarga y ejecución.
 *  3. Si jQuery UI se carga correctamente y `window.jQuery.ui` está disponible,
 *     llama a `resolve(jQuery)`.
 *  4. Si falla la carga o no se detecta `jQuery.ui`, llama a `reject` con un error.
 *
 * @example
 * loadJQueryUIByLocal('/libs/jquery-ui/jquery-ui.min.js',
 *     (jq) => console.log('jQuery UI listo', jq.ui.version),
 *     (err) => console.error(err)
 * );
 */


//  -----  Función para cargar jQuery UI desde local  -----
export const loadJQueryUIByLocal = (localJQueryUI, resolve, reject) => {

    
    const localScript = document.createElement("script");
    
    localScript.src = localJQueryUI;

    localScript.onload = () => {

        if (window.jQuery && jQuery.ui) {
            
            console.warn("jQuery UI cargado correctamente desde local - version: ", $.ui.version);
            resolve(jQuery);

        } 
        
        else
            reject(new Error("jQuery UI no se cargó correctamente desde local"));
        
    };

    localScript.onerror = () => reject(new Error("Error al cargar jQuery UI localmente"));
    
    document.head.appendChild(localScript);

}
