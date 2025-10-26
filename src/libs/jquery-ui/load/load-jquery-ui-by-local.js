//  ---------------------------------------------------
//  ----------  /load-jquery-ui-by-local.js  ----------
//  ---------------------------------------------------





/**
 * - Carga la librería jQuery UI desde una ruta local.
 * @function loadJQueryUIByLocal
 * @param {string} localJQueryUI - Ruta local (URL relativa o absoluta) del archivo jQuery UI a cargar.
 * @param {Function} resolve
 * - Función de resolución de la promesa.
 * - Se llama cuando jQuery UI se carga correctamente y recibe como argumento el objeto `window.jQuery`.
 * @param {Function} reject
 *  - Función de rechazo de la promesa.  
 *  - Se llama si ocurre un error en la carga y recibe un objeto `Error` con un mensaje descriptivo.
 */


//  -----  Función para cargar jQuery UI desde local  -----
export const loadJQueryUIByLocal = (localJQueryUI, resolve, reject) => {

    
    const localScript = document.createElement("script");
    
    localScript.src = localJQueryUI;

    localScript.onload = () => {

        if (jQuery.ui) {
            
            console.warn("jQuery UI cargado correctamente desde local - version: ", $.ui.version);
            resolve(jQuery);

        } 
        
        else
            reject(new Error("jQuery UI no se cargó correctamente desde local"));
        
    };

    localScript.onerror = () => reject(new Error("Error al cargar jQuery UI localmente"));
    
    document.head.appendChild(localScript);

}
