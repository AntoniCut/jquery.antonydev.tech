/*
    --------------------------------------------------------------------
    ----------  /jquery.spa-whith-method-load-from-jquery.js  ----------
    --------------------------------------------------------------------
*/


/**
 * @function spaWithMethodLoadFromJQueryPlugins
 * @description Este plugin permite cargar contenido dinámico en una aplicación SPA utilizando jQuery.
 * @param {jQuery} $ - Instancia principal de jQuery.
 */

export const spaWithMethodLoadFromJQueryPlugins = ($) => {

    (function ($) {

        $.fn.spaWithMethodLoadFromJQuery = function (options) {

            const settings = $.extend({
                routes: [],
                base: '',
                layoutHeader: '#layoutHeader',
                layoutNavbar: '#layoutNavbar',
                layoutMain: '#layoutMain',
                layoutFooter: '#layoutFooter',
                draggable: false
            }, options);

            const $layoutHeader = $(settings.layoutHeader);
            const $layoutNavbar = $(settings.layoutNavbar);
            const $layoutMain = $(settings.layoutMain);
            const $layoutFooter = $(settings.layoutFooter);

            const init = () => {
                const initialPath = window.location.pathname.replace(settings.base, '');
                const initialRoute = settings.routes.find(route => route.path === initialPath);

                if (initialRoute) loadContent(initialRoute);

                history.replaceState({ path: window.location.pathname }, '', window.location.pathname);
            };

            const draggableComponentsHtml = () => {
                $layoutNavbar.draggable({
                    containment: 'parent',
                    scroll: false
                });
            };

            const loadContent = route => {
                if (!document.startViewTransition)
                    return loadContentWithoutViewTransition(route);

                loadContentWithViewTransition(route);
            };

            const loadContentWithViewTransition = route => {
                document.startViewTransition(() => {
                    return new Promise(resolve => {
                        loadTodoContentInHtml(route, resolve);
                    });
                });
            };

            const loadContentWithoutViewTransition = route => loadTodoContentInHtml(route);

            /**
             * @function loadTodoContentInHtml
             * @description Carga todo el contenido de la ruta especificada en el HTML y espera a que termine para resolver.
             * @param {RouteConfig} route - Ruta a cargar.
             * @param {Function} [resolve] - Callback para finalizar transición.
             */
            const loadTodoContentInHtml = (route, resolve) => {
                let pending = 3; // header, main, footer
                const checkDone = () => {
                    pending--;
                    if (pending === 0 && resolve) resolve();
                };

                // Header
                $layoutHeader.load(route.urlLayoutHeader, function (response, status, xhr) {
                    if (status === "error") {
                        console.error(`Error al cargar ${route.urlLayoutHeader}: ${xhr.statusText}`);
                        $layoutHeader.html('<p>Error 404: No se pudo cargar el contenido.</p>');
                    } else {
                        $layoutNavbar.load(route.urlLayoutNavbar, (response, status, xhr) => {
                            if (status === "error") {
                                console.error(`Error al cargar ${route.urlLayoutNavbar}: ${xhr.statusText}`);
                                $layoutNavbar.html('<p>Error 404: No se pudo cargar el contenido.</p>');
                            } else {
                                actionsNavbar();
                                if (settings.draggable) draggableComponentsHtml();
                            }
                        });
                        $('#headerTitle').html(route.headerTitle);
                    }
                    checkDone();
                });

                // Main
                $layoutMain.load(route.urlLayoutMain, function (response, status, xhr) {
                    if (status === "error") {
                        console.error(`Error al cargar ${route.urlLayoutMain}: ${xhr.statusText}`);
                        $layoutMain.html('<p>Error 404: No se pudo cargar el contenido.</p>');
                    }
                    checkDone();
                });

                // Footer
                $layoutFooter.load(route.urlLayoutFooter, function () {
                    $('#footerTitle').html(route.headerTitle);
                    checkDone();
                });

                // favicon, título, scripts y estilos los cargamos en paralelo
                updateFavicon(route.favicon);
                document.title = route.pageTitle;

                const newUrl = `${settings.base}${route.path}`;
                if (window.location.pathname !== newUrl) {
                    history.pushState({ path: newUrl }, '', newUrl);
                }

                if (route.styles) loadStylesheet(route.styles);
                if (route.scripts) route.scripts.forEach(script => loadScriptsIfExists(script));
            };

            const updateFavicon = favicon => {
                let $favicon = $('link[rel~="icon"]');
                if ($favicon.length === 0)
                    $favicon = $('<link rel="icon" type="image/x-icon">').appendTo('head');
                $favicon.attr('href', `${favicon}?t=${new Date().getTime()}`);
            };

            const loadStylesheet = cssFile => {
                let $stylesheet = $(`link[href*="${cssFile}"]`);
                if ($stylesheet.length === 0) {
                    $stylesheet = $('<link rel="stylesheet">').appendTo('head');
                }
                $stylesheet.attr('href', `${cssFile}?t=${new Date().getTime()}`);
            };

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
            };

            const actionsNavbar = () => {
                const $layoutNavbar = $('#layoutNavbar .layout__navbar');
                $layoutNavbar.hide();
                $('.navbar__btn-close').hide();

                $(document)
                    .off('mouseenter.navbar mouseleave.navbar click.navbar')
                    .on('mouseenter.navbar', '.layout__navbar', function () {
                        $(this).stop(true, true);
                    })
                    .on('click.navbar', '.navbar__btn-open', function (e) {
                        e.stopPropagation();
                        $layoutNavbar.stop(true, true).slideToggle();
                        $(this).hide();
                        $('.navbar__btn-close').show();
                    })
                    .on('click.navbar', '.navbar__btn-close', function (e) {
                        e.stopPropagation();
                        $layoutNavbar.stop(true, true).slideUp();
                        $(this).hide();
                        $('.navbar__btn-open').show();
                    })
                    .on('click.navbar', function () {
                        $layoutNavbar.stop(true, true).slideUp();
                        $('.navbar__btn-close').hide();
                        $('.navbar__btn-open').show();
                    });
            };

            $(document).on('click', 'a[data-id]', function (event) {
                event.preventDefault();
                const dataId = $(this).data('id');
                const route = settings.routes.find(route => route.id === dataId);
                const $layoutNavbar = $('#layoutNavbar .layout__navbar');
                $layoutNavbar.slideUp();
                if (route) loadContent(route);
            });

            window.addEventListener('popstate', function (event) {
                const matchedPath = event.state?.path
                    ? event.state.path.replace(settings.base, '')
                    : window.location.pathname.replace(settings.base, '');
                const matchedRoute = settings.routes.find(route => route.path === matchedPath);

                if (matchedRoute) loadContent(matchedRoute);
            });

            console.log('\n');
            console.warn('----------------------------------------------------------------------------------------------------');
            console.warn('----------  pluging - jquery.spa-with-method-load-from-jquery.js - cargado correctamente  ----------');
            console.warn('----------------------------------------------------------------------------------------------------');
            console.log('\n');

            init();
        };

    })(jQuery);

};
