/*
    -----------------------------------------------
    ----------  /jquery.antonydev.tech/  ----------
    ----------  /src/main.js  ---------------------
    -----------------------------------------------
*/



//@ts-ignore
import { cdnJQuery_4_0_0 } from "/src/libs/jquery/cdn/cdn-jquery-4.0.0.js";

//@ts-ignore
import { loadJQueryByCdnOLocal } from "/src/libs/jquery/load/load-jquery-by-cdn-local.js";

//@ts-ignore
import { cdnJQueryUI_1_14_1 } from "/src/libs/jquery-ui/cdn/cdn-jquery-ui-1.14.1.js";

//@ts-ignore
import { loadJQueryUIByCdnOLocal } from "/src/libs/jquery-ui/load/load-jquery-ui-by-cdn-local.js";

//@ts-ignore
import { spaWithMethodLoadFromJQueryPlugins } from "/src/plugins/spa-with-method-load-from-jquery/jquery.spa-with-method-load-from-jquery.js";

//@ts-ignore
import { spaJQueryAntonydevTech } from "/src/scripts/spa/spa-jquery-antonydev-tech.js";



/* 
    ----------------------------------------------
    -----  Registro del Service Worker (SW)  -----
    ----------------------------------------------
*/


/**
 * @description Registra el Service Worker y detecta nuevas versiones.
 * Si se detecta una nueva versión instalada, recarga la página automáticamente.
 */

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('/service-worker.js')

        .then(reg => {

            // Detecta cuando un nuevo SW está instalándose
            reg.addEventListener('updatefound', () => {

                const newSW = reg.installing;

                if (!newSW) {
                    console.error('No se encontró el nuevo Service Worker.');
                    return;
                }

                newSW.addEventListener('statechange', () => {

                    if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('Nueva versión disponible, recarga para actualizar');
                        // Opcional: recargar automáticamente
                        window.location.reload();
                    }

                });

            });

        })

        .catch(err => console.error('SW registration failed:', err));
}



/* 
    -----------------------------------------
    -----  Efecto Loading de la Página  -----
    -----------------------------------------
*/


document.addEventListener('DOMContentLoaded', () => {

    // ---------- Referencias a los elementos del DOM ----------

    /** - Elemento de Carga 
     * @type {HTMLDivElement|null}
     */
    const loader = document.querySelector('#loader');   // Elemento de carga

    /**
     * - Elemento de Layout Principal
     * @type {HTMLDivElement|null}
     */
    const layout = document.querySelector('#layout');   // Contenedor principal

    // ---------- Verificar existencia de elementos ----------
    if (!loader || !layout) {
        console.error("Loader o layout no encontrado en el DOM");
        return;
    }

    // ---------- Retrasar la animación para simular carga ----------
    setTimeout(() => {

        //  -----  Mostrar layout  -----
        layout.style.display = "flex";

        //  -----  Aplicar transición de fade-in al layout  -----
        requestAnimationFrame(() => {
            layout.classList.add("fade-in");
        });

        //  -----  Aplicar fade-out al loader  -----
        loader.classList.add("fade-out");

        //  -----  Una vez que termina la transición del loader, ocultarlo  -----
        loader.addEventListener("transitionend", () => {
            loader.style.display = "none";
        }, { once: true });

    }, 1000);

});



/* 
   ------------------------------
    -----  Carga de jQuery  -----
   ------------------------------
*/

/**
 * - Configuración del CDN de jQuery.
 * @import  {CDNJQuery} from './types/cdn-types.js';
 * @type {CDNJQuery}
  */
const cdnJQuery = cdnJQuery_4_0_0;

/**
 * - Ruta del archivo jQuery local a usar como fallback si el CDN falla.
 * @type {string}
 */
const localJQuery = "/src/libs/jquery/local/jquery-4.0.0-beta.min.js";



/* 
   ---------------------------------
    -----  Carga de jQuery UI  -----
   ---------------------------------
*/


/**
 * - Configuración del CDN de jQuery UI.
 * @import  {CDNJQueryUI} from './types/cdn-types.js';
 * @type {CDNJQueryUI}
 */
const cdnJQueryUI = cdnJQueryUI_1_14_1;

/**
 * - Ruta del archivo jQuery UI local a usar como fallback si el CDN falla.
 * @type {string}
 */
const localJQueryUI = "/src/libs/jquery-ui/local/jquery-ui-1.14.1.min.js";



/* 
    -----------------------------------------------------------
    -----  Ejecución de Promesas para Carga de Librerías  -----
    -----------------------------------------------------------
*/

console.log('\n');
console.warn("-----  Iniciando carga de jQuery y jQueryUI...  -----");
console.log('\n');


//  -----  Carga jQuery  -----
loadJQueryByCdnOLocal(cdnJQuery, localJQuery)

    .then(

        /**  @param {JQueryStatic} $ - Instancia de jQuery  */

        ($) => {

            console.warn("jQuery cargado correctamente - Versión:", $.fn.jquery);

            //  -----  Carga jQuery UI  -----
            return loadJQueryUIByCdnOLocal(cdnJQueryUI, localJQueryUI)

                .then(
                    
                    /**  @param {JQueryStatic} $ - Instancia de jQuery  */

                    ($) => {

                        
                        if (!$.ui) {
                            console.log('\n');
                            throw new Error("jQuery UI no se cargó correctamente.");
                        }

                        console.warn("jQuery UI cargado correctamente - Versión:", $.ui.version);

                        //  -----  Ejecuta plugin que carga el contenido dinámico  -----
                        spaWithMethodLoadFromJQueryPlugins();

                        //  -----  Ejecuta script principal del proyecto  -----
                        spaJQueryAntonydevTech();

                        //  ----- Limpia la consola después de 10 segundos  -----
                        setTimeout(() => console.clear(), 10000);

                });

        })


    .catch(

        /** @param {Error} err */
        err => console.error("Error al cargar jQuery o jQuery UI:", err));
