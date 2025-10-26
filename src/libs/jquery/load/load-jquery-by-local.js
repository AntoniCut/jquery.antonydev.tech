//  ------------------------------------------------
//  ----------  /load-jquery-by-local.js  ----------
//  ------------------------------------------------



/**
 * - Carga la librería jQuery desde una ruta local.
 * @function loadJQueryByLocal
  * @param {string} localJQuery - Ruta local (URL relativa o absoluta) del archivo jQuery a cargar.
 * @param {Function} resolve 
 * - Función de resolución de la promesa.  
 * - Se llama cuando jQuery se carga correctamente y recibe como argumento el objeto `window.jQuery`.
 * @param {Function} reject 
 *  - Función de rechazo de la promesa.  
 *  - Se llama si ocurre un error en la carga y recibe un objeto `Error` con un mensaje descriptivo.
 */

export const loadJQueryByLocal = (localJQuery, resolve, reject) => {

    
    const localScript = document.createElement("script");
    localScript.src = localJQuery;


    //  -----  Eventos de Carga  -----
    localScript.onload = () => {
        console.log('\n');
        console.warn("jQuery cargado desde local - Versión:", $.fn.jquery);
        resolve($);
    };


    //  -----  Eventos de Error  -----
    localScript.onerror = () => {
        console.error("Error al cargar jQuery local.");
        reject(new Error("No se pudo cargar jQuery"));
    };

    //  -----  Añadir script al head  -----
    document.head.appendChild(localScript);

}
