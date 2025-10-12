/*
    ------------------------------------------------------
    ----------  /jquery.antonydev.tech/  -----------------
    ----------  /src/scripts/spa/  -----------------------
    ----------  /spa-jquery-antonydev-tech.js/  ----------
    ------------------------------------------------------
*/



import { routesJQueryAntonydevTech } from "/src/routes/routes-jquery-antonydev-tech.js";


/**
 * @function spaJQueryAntonydevTech 
 * @param {typeof window.jQuery} $ - Instancia de jQuery ya cargada en el proyecto.
 *
 * Inicializa la lógica **SPA** (Single Page Application) para
 * la sección *jQuery.antonydev.tech* del proyecto.
 *
 * Esta función configura las rutas, opciones y elementos del
 * layout, y luego invoca el plugin `spaWithMethodLoadFromJQuery`
 * para manejar la navegación dinámica dentro de la aplicación.
 
 * @description
 *  1. Importa las rutas definidas en `routesJQueryAntonydevTech`.
 *  2. Combina las rutas en un array (`allRoutes`).
 *  3. Obtiene una referencia al contenedor principal (`#layout`).
 *  4. Configura las opciones necesarias para el plugin SPA,
 *     incluyendo las secciones del layout (header, navbar, main, footer).
 *  5. Invoca el plugin `spaWithMethodLoadFromJQuery` para activar
 *     la navegación en una sola página.
 */


export const spaJQueryAntonydevTech = ($) => {


    //  ----------  Documento Cargado  ----------
    console.log('\n');
    console.warn('-----  spa-jquery.js  -----');


    //  ----------  Arrays con la informacion del contenido a cargar de las rutas del proyecto ----------
    /**
     * @constant
     * @type {Array<Object>}
     */
    
    const allRoutes = [

        ...routesJQueryAntonydevTech,

    ];


    //  ----------  referencias al HTML  ----------

    /**
     * Elemento raíz de la aplicación SPA.
     * @constant
     * @type {jQuery<HTMLElement>}
     */
    const $layout = $('#layout');


    //  ----------  Opciones que le pasamos al plugins  ----------

    /**
     * Objeto de configuración que define cómo debe comportarse
     * el plugin `spaWithMethodLoadFromJQuery`.
     *
     * @constant
     * @typedef {Object} optionsPluginsSPA
     *
     * @property {Array<Object>} routes - Conjunto de rutas definidas para la SPA.
     * @property {string} base - Ruta base de la aplicación (se deja vacía si no se usa `history.pushState` o hash routing).
     * @property {string} layoutHeader - Selector CSS del contenedor de la cabecera.
     * @property {string} layoutNavbar - Selector CSS del contenedor de la barra de navegación.
     * @property {string} layoutMain - Selector CSS del contenedor principal donde se cargan las vistas.
     * @property {string} layoutFooter - Selector CSS del contenedor del pie de página.
     * @property {boolean} draggable - Indica si se habilitan funciones de arrastre dentro de la SPA.
    */
    
    const optionsPluginsSPA = {
        routes: allRoutes,
        base: '',
        layoutHeader: '#layoutHeader',
        layoutNavbar: '#layoutNavbar',
        layoutMain: '#layoutMain',
        layoutFooter: '#layoutFooter',
        draggable: true
    }


    //  ----------  Invocamos el Plugins  --  jquery.spa-with-method-load-from-jquery.js  ----------
    $layout.spaWithMethodLoadFromJQuery(optionsPluginsSPA);

}
