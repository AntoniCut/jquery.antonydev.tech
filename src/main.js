/*
    -----------------------------------------------
    ----------  /jquery.antonydev.tech/  ----------
    ----------  /src/main.js  ---------------------
    -----------------------------------------------
*/


import { cdnJQuery_4_0_0 } from "/src/libs/jquery/cdn/cdn-jquery-4.0.0.js";
import { loadJQueryByCdnOLocal } from "/src/libs/jquery/load/load-jquery-by-cdn-local.js";

//import { cdnJQueryUI_1_14_1 } from "/src/libs/jquery-ui/cdn/cdn-jquery-ui-1.14.1.js";
import { loadJQueryUIByCdnOLocal } from "/src/libs/jquery-ui/load/load-jquery-ui-by-cdn-local.js";

import { spaWithMethodLoadFromJQueryPlugins } from "/src/plugins/spa-with-method-load-from-jquery/jquery.spa-with-method-load-from-jquery.js";
import { spaJQueryDesarrollos } from "/src/scripts/spa-jquery-desarrollos.js";



/* 
    ==============================================
    -----  Registro del Service Worker (SW)  -----
    ==============================================
*/

/**
 * Registra el Service Worker y detecta nuevas versiones.
 * Si se detecta una nueva versión instalada, recarga la página automáticamente.
 */
if ('serviceWorker' in navigator) {
    
    navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {

            // Detecta cuando un nuevo SW está instalándose
            reg.addEventListener('updatefound', () => {

                const newSW = reg.installing;

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
    =========================================
    -----  Efecto Loading de la Página  -----
    ========================================= 
*/

/**
 * Espera a que el DOM esté cargado.
 * Aplica efecto de fade-in al layout y fade-out al loader después de 1 segundo.
 */
document.addEventListener('DOMContentLoaded', () => {

    const loader = document.querySelector('#loader');
    const layout = document.querySelector('#layout');

    if (!loader || !layout) {
        console.error("Loader o layout no encontrado en el DOM");
        return;
    }

    setTimeout(() => {

        layout.style.display = "flex";

        // Aplicar transición de fade-in
        requestAnimationFrame(() => {
            layout.classList.add("fade-in");
        });

        // Aplicar fade-out al loader
        loader.classList.add("fade-out");

        loader.addEventListener("transitionend", () => {
            loader.style.display = "none";
        }, { once: true });

    }, 1000);

});


/* 
   ==========================================
    -----  Carga de jQuery y jQuery UI  -----
   ========================================== 
*/

/**
 * Configuración del CDN de jQuery.
 * Se importa desde /src/libs/jquery/cdn/cdn-jquery-4.0.0.js
 * @type {Object}
 * @property {string} srcCdn - URL del archivo jQuery en el CDN.
 * @property {string} [integrity] - Hash de integridad para seguridad (opcional).
 * @property {string} [crossOrigin] - Política CORS (opcional).
 * @property {string} [referrerPolicy] - Política de referer (opcional).
 */
const cdnJQuery = cdnJQuery_4_0_0;

/**
 * Ruta del archivo jQuery local a usar como fallback si el CDN falla.
 * @type {string}
 */
const localJQuery = "/src/libs/jquery/local/jquery-4.0.0-beta.min.js";


/**
 * Configuración del CDN de jQuery UI.
 * Se importa desde /src/libs/jquery-ui/cdn/cdn-jquery-ui-1.14.1.js
 * @type {Object}
 * @property {string} srcCdn - URL del archivo jQuery UI en el CDN.
 * @property {string} [integrity] - Hash de integridad para seguridad (opcional).
 * @property {string} [crossOrigin] - Política CORS (opcional).
 * @property {string} [referrerPolicy] - Política de referer (opcional).
 */
const cdnJQueryUI = '';
//const cdnJQueryUI = '/src/libs/jquery-ui/cdn/cdn-jquery-ui-1.14.1.js';


/**
 * Ruta del archivo jQuery UI local a usar como fallback si el CDN falla.
 * @type {string}
 */
const localJQueryUI = "/src/libs/jquery-ui/local/jquery-ui-1.14.1-only-draggable.min.js";


/* =========================================
   Ejecución de Promesas para Carga de Librerías
   ========================================= */

console.log('\n');
console.warn("-----  Iniciando carga de jQuery y jQueryUI...  -----");
console.log('\n');

/**
 * Carga jQuery desde CDN o fallback local.
 * Luego carga jQuery UI desde CDN o fallback local.
 * Después ejecuta los plugins principales del proyecto.
 */
loadJQueryByCdnOLocal(cdnJQuery, localJQuery)
    
    .then($ => {

        console.warn("jQuery cargado correctamente - Versión:", $.fn.jquery);

        //  -----  Carga jQuery UI  -----
        return loadJQueryUIByCdnOLocal(cdnJQueryUI, localJQueryUI)
            
        .then($ => {

                if (!$.ui) {
                    console.log('\n');
                    throw new Error("jQuery UI no se cargó correctamente.");
                }

                console.warn("jQuery UI cargado correctamente - Versión:", $.ui.version);

                //  -----  Ejecuta plugin que carga el contenido dinámico  -----
                spaWithMethodLoadFromJQueryPlugins($);

                //  -----  Ejecuta script principal del proyecto  -----
                spaJQueryDesarrollos($);

                //  ----- Limpia la consola después de 10 segundos  -----
                setTimeout(() => console.clear(), 10000);

            });

    })

    .catch(err => console.error("Error al cargar jQuery o jQuery UI:", err));
