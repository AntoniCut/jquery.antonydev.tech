/*
    --------------------------------------------------------------------
    ----------  /jquery.spa-whith-method-load-from-jquery.js  ----------
    --------------------------------------------------------------------
*/

//@ts-nocheck



/**
 * - Envuelve el plugin en una función de modulos ES6 para facilitar su importación y uso en otros archivos.  
 * - Este plugin permite cargar contenido dinámico en una aplicación SPA utilizando jQuery.
 * @function spaWithMethodLoadFromJQueryPlugins
 */

export const spaWithMethodLoadFromJQueryPlugins = () => {


    //  -------------------------------------------------------------------------------------------
    //  ----------  Encapsulación del plugin por si lo implementamos fuera de un modulo  ----------
    //  -------------------------------------------------------------------------------------------

    
    (function ($) {


        /** - Configuración de las rutas de la aplicación SPA.
        * @typedef {Object} RouteConfig
        * @property {string} [id] - ID de la ruta.
        * @property {string} path - Ruta relativa.
        * @property {string} [headerTitle] - Título del encabezado.
        * @property {string} [pageTitle] - Título de la página.
        * @property {string} [favicon] - Ruta del favicon.
        * @property {string} [styles] - Hoja de estilos a cargar.
        * @property {string[]} [scripts] - Lista de scripts a cargar.
        * @property {string} [urlLayoutHeader] - URL del layout del header.
        * @property {string} [urlLayoutNavbar] - URL del layout del navbar.
        * @property {string} [urlLayoutMain] - URL del layout principal.
        * @property {string} [urlLayoutFooter] - URL del layout del footer.
        */

        /**
         * @typedef {Object} SpaPluginSettings
         * @property {RouteConfig[]} routes - Lista de rutas.
         * @property {string} base - Base URL de la aplicación.
         * @property {string} layoutHeader - Selector del header.
         * @property {string} layoutNavbar - Selector del navbar.
         * @property {string} layoutMain - Selector del contenido principal.
         * @property {string} layoutFooter - Selector del footer.
         * @property {boolean} draggable - Si los elementos son arrastrables.
         */


        /*
            ----------------------------------------------------------------------------------
            ----------  Plugins  -----  jquery.spa-with-method-load-from-jquery.js  ----------
            ----------------------------------------------------------------------------------
        */

        /**
         * @function external:"jQuery.fn.spaWithMethodLoadFromJQuery"
         * @memberof external:"jQuery.fn"
         * @description 
         *      Este plugin permite cargar contenido dinámico en una aplicación SPA utilizando jQuery.
         *      Plugin principal que gestiona rutas, carga de layouts y navegación SPA.
         * @param {Partial<SpaPluginSettings>} [options={}] - Configuración personalizada.
         * @returns {jQuery} Retorna el objeto jQuery para permitir el encadenamiento de métodos.
         */

        $.fn.spaWithMethodLoadFromJQuery = function (options) {


            //  ------------------------------------------------------------
            //  ----------  Configuración por defecto del plugin  ----------
            //  ------------------------------------------------------------

            /** - Configuracion del plugin SPA
             * @type {SpaPluginSettings} 
             */

            const settings = $.extend({

                routes: [],
                base: '',
                layoutHeader: '#layoutHeader',
                layoutNavbar: '#layoutNavbar',
                layoutMain: '#layoutMain',
                layoutFooter: '#layoutFooter',
                draggable: false

            }, options);



            //  -------------------------------------------
            //  ----------  referencias al HTML  ----------
            //  -------------------------------------------


            /**  - Referencia al contenedor del header
             * @type {JQuery<HTMLDivElement>}  
             */
            const $layoutHeader = $(settings.layoutHeader);

            /**  - Referencia al contenedor del navbar 
             * @type {JQuery<HTMLDivElement>} 
             */
            const $layoutNavbar = $(settings.layoutNavbar);
            
            /**  -  Referencia al contenedor del main 
             * @type {JQuery<HTMLDivElement>} */
            const $layoutMain = $(settings.layoutMain);

            /** - Referencia al contenedor del footer
             * @type {JQuery<HTMLDivElement>} 
             */
            const $layoutFooter = $(settings.layoutFooter);

            
            //  ------------------------------------------------------------------------------------
            //  ----------  función para la Carga del Contenido Inicial de la Aplicación  ----------
            //  ------------------------------------------------------------------------------------

            /** - Inicializa la aplicación y carga el contenido de la ruta inicial.
             * @function init
             */

            const init = () => {

                //  -----  Elimina barra final del pathname  -----
                const normalizedPath = window.location.pathname.replace(/\/$/, '').replace(settings.base, '');

                const initialRoute = settings.routes.find(route =>
                    route.path.replace(/\/$/, '') === normalizedPath
                );

                if (initialRoute) loadContent(initialRoute);

                history.replaceState({ path: window.location.pathname }, '', window.location.pathname);
            };

            

            //  --------------------------------------------------------------------
            //  ----------  función para mover componentes por la página  ----------
            //  --------------------------------------------------------------------

            /** - mover componentes por la página
             * @function draggableComponentsHtml
             */
            const draggableComponentsHtml = () => {

                //  ----------  Hacemos los menús arrastrables  ----------
                $layoutNavbar.draggable({
                    scroll: false
                });

            }


            //  ------------------------------------------------------------------
            //  ----------  Función para manejar la carga de contenido  ----------
            //  ------------------------------------------------------------------

            /**
             * - Maneja la carga de contenido para una ruta específica utilizando la API ViewTransition si está disponible,
             * o un método clásico si no lo está. 
             * - Determina el método de transición y delega la carga del contenido. 
             * @function loadContent
             * @param {RouteConfig} route - Objeto de configuración de la ruta a cargar.
             */

            const loadContent = route => {

                //  -----  Si el navegador no soporta ViewTransition, usa el método clásico  -----
                if (!document.startViewTransition)
                    return loadContentWithoutViewTransition(route);

                loadContentWithViewTransition(route);

            }



            //  -------------------------------------------------------------------------------------
            //  ----------  Función para manejar la carga de contenido con viewtransition  ----------
            //  -------------------------------------------------------------------------------------

            /**
             * @function loadContentWithViewTransition
             * @description Maneja la carga de contenido utilizando la API ViewTransition.
             * @param {RouteConfig} route - Objeto de configuración de la ruta a cargar.
             * @returns {void}
             */

            const loadContentWithViewTransition = route => {

                //  -----  Usamos la API ViewTransition para una transición suave  -----
                document.startViewTransition(() => {

                    return new Promise(resolve => {

                        loadTodoContentInHtml(route);
                        resolve();                  //  -----  finaliza la transición  -----
                    });
                });
            }



            //  -------------------------------------------------------------------------------------
            //  ----------  Función para manejar la carga de contenido sin viewtransition  ----------
            //  -------------------------------------------------------------------------------------

            /**
             * @function loadContentWithoutViewTransition
             * @description Maneja la carga de contenido sin utilizar la API ViewTransition.
             * @param {RouteConfig} route - Objeto de configuración de la ruta a cargar.
             * @returns {void}
             */

            const loadContentWithoutViewTransition = route => loadTodoContentInHtml(route);



            //  ----------------------------------------------------------------------
            //  ----------  Función que carga todo el contenido en el HTML  ----------
            //  ----------------------------------------------------------------------

            /**
             * @function loadTodoContentInHtml
             * @description Carga todo el contenido de la ruta especificada en el HTML.
             * @param {RouteConfig} route - Objeto de configuración de la ruta a cargar.
             */

            const loadTodoContentInHtml = route => {


                //  -----  carga el contenido de Layout Header  -----
                $layoutHeader.load(route.urlLayoutHeader, function (response, status, xhr) {

                    if (status === "error") {
                        console.error(`Error al cargar ${route.urlLayoutHeader}: ${xhr.statusText}`);
                        $layoutHeader.html('<p>Error 404: No se pudo cargar el contenido.</p>');
                        return resolve();
                    }

                    //  -----  Cargamos el navbar para que siempre este disponible  -----
                    $layoutNavbar.load(route.urlLayoutNavbar, (response, status, xhr) => {

                        if (status === "error") {
                            console.error(`Error al cargar ${route.urlLayoutNavbar}: ${xhr.statusText}`);
                            $layoutNavbar.html('<p>Error 404: No se pudo cargar el contenido.</p>');
                            return resolve();
                        }

                        actionsNavbar();

                        if (settings.draggable)
                            draggableComponentsHtml();

                    });

                    //  -----  Carga el Título del Header  -----
                    $('#headerTitle').html(route.headerTitle);

                });


                //  -----  Cargamos el Favicon  -----
                updateFavicon(route.favicon);


                //  -----  Cargamos el Título de la Pagina  -----
                document.title = route.pageTitle;


                //  -----  Actualizamos la URL de la Página  -----
                const newUrl = `${settings.base}${route.path}`;
                if (window.location.pathname !== newUrl) {
                    history.pushState({ path: newUrl }, '', newUrl);
                }


                //  -----  Cargamos los Estilos de la Página  -----
                if (route.styles)
                    loadStylesheet(route.styles);


                //  -----  Cargamos los Script de la Página Si Hay  -----
                if (route.scripts)
                    route.scripts.forEach(script => loadScriptsIfExists(script));


                //  -----  carga el contenido de Layout Main  -----
                $layoutMain.load(route.urlLayoutMain, function (response, status, xhr) {

                    if (status === "error") {
                        console.error(`Error al cargar ${route.urlLayoutMain}: ${xhr.statusText}`);
                        $layoutMain.html('<p>Error 404: No se pudo cargar el contenido.</p>');
                        return resolve();
                    }

                });


                //  -----  cargamos el footer  -----
                $layoutFooter.load(route.urlLayoutFooter, function (response, status, xhr) {
                    $('#footerTitle').html(route.headerTitle);
                });

            }



            //  --------------------------------------------------------
            //  ----------  Función que Actualiza el Favicon  ----------
            //  --------------------------------------------------------

            /**
             * @function updateFavicon
             * @description Actualiza el favicon de la página.
             * @param {string} favicon - La URL del nuevo favicon.
             * @returns {void}
             */

            const updateFavicon = favicon => {


                /**
                 * @type {JQuery<HTMLLinkElement>}  Selecciona el elemento link del favicon.
                 */
                let $favicon = $('link[rel~="icon"]');

                if ($favicon.length === 0)
                    $favicon = $('<link rel="icon" type="image/x-icon">').appendTo('head');

                $favicon.attr('href', `${favicon}?t=${new Date().getTime()}`);

            }



            //  ------------------------------------------------------------------
            //  ----------  Función que Carga los estilos de la página  ----------
            //  ------------------------------------------------------------------

            /**
             * @function loadStylesheet
             * @description Carga un archivo CSS en la página.
             * @param {string} cssFile - La URL del archivo CSS a cargar.
             * @returns {void}
             */

            const loadStylesheet = cssFile => {
                
                //  -----  Elimina los CSS de páginas anteriores,  -------- 
                //  -----  excepto layout-header.css (que es global)  -----

                
                $('link[data-page-style="true"]').remove();

                //  -----  Crea el nuevo link  -----
                $('<link>')
                    .attr({
                        rel: 'stylesheet',
                        href: `${cssFile}?t=${new Date().getTime()}`,
                        'data-page-style': 'true'
                    })
                    .appendTo('head');
           };



            //  ------------------------------------------------------------------
            //  ----------  Función que Carga un Script si este Existe  ----------
            //  ------------------------------------------------------------------

            /**
             * @function loadScriptsIfExists
             * @description Carga un script si este existe.
             * @param {string} scriptUrl - La URL del script a cargar.
             * @returns {void}
             */

            const loadScriptsIfExists = scriptUrl => {

                $.ajax({

                    url: scriptUrl,
                    type: 'HEAD',

                    success: function () {

                        $.getScript(scriptUrl)
                            .done(() => console.log(`Cargado: ${scriptUrl}`))
                            .fail((jqxhr, settings, exception) => console.error(`Error en ${scriptUrl}:`, exception));
                    },

                    error: function () {
                        console.warn(`No existe el script: ${scriptUrl}`);
                    }

                });

            }



            // ------------------------------------------------------
            // ----------  Función para acciones del menú  ----------
            // ------------------------------------------------------

            /**
             * @function actionsNavbar
             * @description Función para manejar las acciones del menú de navegación.
             * @returns {void}
             */

            const actionsNavbar = () => {


                const $layoutNavbar = $('#layoutNavbar .layout__navbar');

                //  -----  Ocultamos el navbar y el botón de cerrar al inicio  -----
                $layoutNavbar.hide();
                $('.navbar__btn-close').hide();


                //  -----  Evita múltiples bindings usando namespaces  -----
                $(document)

                    .off('mouseenter.navbar mouseleave.navbar click.navbar')

                    .on('mouseenter.navbar', '.layout__navbar', function () {
                        $(this).stop(true, true);
                    })

                    //  -----  Botón Abrir  -----
                    .on('click.navbar', '.navbar__btn-open', function (e) {
                        e.stopPropagation();

                        //  -----  Mostrar navbar  -----
                        $layoutNavbar.stop(true, true).slideToggle(1000);

                        // Cambiar botones
                        $(this).hide(); // oculto abrir
                        $('.navbar__btn-close').show(); // muestro cerrar
                    })


                    //  -----  Botón Cerrar  -----
                    .on('click.navbar', '.navbar__btn-close', function (e) {
                        e.stopPropagation();

                        //  -----  Ocultar navbar  -----
                        $layoutNavbar.stop(true, true).slideUp(1000);

                        //  -----  Cambiar botones  -----
                        $(this).hide();                     // oculto cerrar
                        $('.navbar__btn-open').show();      // muestro abrir
                    })

                    //  -----  Clic fuera  -----
                    .on('click.navbar', function () {
                        $layoutNavbar.stop(true, true).slideUp(1000);
                        $('.navbar__btn-close').hide();   // oculto cerrar
                        $('.navbar__btn-open').show();    // muestro abrir  
                    });
            };



            //  -----------------------------------------------------------
            //  ----------  Manejador de clics para los enlaces  ----------
            //  -----------------------------------------------------------

            /**
             * @event click
             * @description
             *  Manejador global para los clics en enlaces del menú principal que tienen el atributo `data-id`. 
             *  - Previene la navegación por defecto.
             *  - Obtiene el `data-id` del enlace clicado.
             *  - Busca en las rutas configuradas (`settings.routes`) la que coincide con ese ID.
             *  - Cierra el menú con un efecto `slideUp`.
             *  - Si existe la ruta encontrada, carga su contenido dinámicamente.
             * @param {JQuery.ClickEvent} event - Evento de clic generado por el navegador.
             * @returns {void}
             */

            $(document).on('click', 'a[data-id]', function (event) {

                event.preventDefault();

                //  -----  Obtener el ID del enlace clicado  -----
                /**
                 * @type {string}
                 * @description dataId - ID del enlace clicado.
                 */
                const dataId = $(this).data('id');

                //  -----  Buscar la ruta correspondiente al ID  -----
                const route = settings.routes.find(route => route.id === dataId);

                //  -----  Ocultamos la lista del menú efecto slideUp antes de cambiar el contenido  -----
                const $layoutNavbar = $('#layoutNavbar .layout__navbar');
                $layoutNavbar.slideUp(1000);

                //  -----  si hemos clicado en una seccion del menú  -----
                //  -----  cargamos el contenido de la sección  ----------
                if (route)
                    loadContent(route);

            });



            //  ----------------------------------------------------------
            //  ----------  Manejar retrocesos en el historial  ----------
            //  ----------------------------------------------------------

            /**
             * @event popstate
             * @description
             *  Manejador para el evento `popstate`, que se dispara cuando el usuario
             *  navega en el historial del navegador (botón "atrás" o "adelante").
             *  - Determina la ruta solicitada desde `event.state.path` o, si no existe,
             *    a partir de la URL actual.
             *  - Busca una coincidencia en `settings.routes`.
             *  - Si encuentra la ruta:
             *    - Llama a `loadContent(matchedRoute)` para renderizar la vista.
             *    - Si la ruta es la raíz (`'/'`), recarga también el menú de navegación (`$layoutNavbar`).
             *  - Si no encuentra coincidencia:
             *    - Ejecuta `loadInitialContent()` para mostrar el contenido por defecto.
             * 
             * @param {PopStateEvent} event - Evento del historial del navegador.
             */

            window.addEventListener('popstate', function (event) {


                /**
                 * @type {string} 
                 * @description normalizedPath - Ruta normalizada sin el prefijo `settings.base` y sin barra final.
                 */
                const normalizedPath = (event.state?.path || window.location.pathname)
                    .replace(settings.base, '')
                    .replace(/\/$/, '');

                /**
                 * @type {RouteConfig|undefined} 
                 * @description Busca en las rutas configuradas la que coincide con `normalizedPath`.
                 */
                const matchedRoute = settings.routes.find(route =>
                    route.path.replace(/\/$/, '') === normalizedPath
                );


                if (matchedRoute)
                    loadContent(matchedRoute);

            });



            //  ------------------------------------------------
            //  ----------  Punto Inicial del Plugin  ----------
            //  ------------------------------------------------

            console.log('\n');
            console.warn('----------------------------------------------------------------------------------------------------');
            console.warn('----------  pluging - jquery.spa-with-method-load-from-jquery.js - cargado correctamente  ----------');
            console.warn('----------------------------------------------------------------------------------------------------');
            console.log('\n');

            //  ----------  INICIO Aplicación  ----------
            init();


        };


    })(jQuery);


}
