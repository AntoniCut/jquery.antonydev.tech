/*
    --------------------------------------------------------
    ----------  /jquery.antonydev.tech/  -------------------
    ----------  /src/routes/  ------------------------------
    ----------  /routes-jquery-antonydev-tech.js  ----------
    --------------------------------------------------------
*/


/**
 * @typedef {Object} RouteConfig
 * @description
 * - Objeto que define la configuración de una ruta en la aplicación SPA jQuery.antonydev.tech.
 * @property {string} id - Identificador único de la ruta (usado en los enlaces `data-id`).
 * @property {string} path - Ruta relativa del navegador (usada en `history.pushState`).
 * @property {string} urlLayoutHeader - URL del archivo HTML del layout del encabezado.
 * @property {string} urlLayoutNavbar - URL del archivo HTML del layout del menú de navegación.
 * @property {string} urlLayoutMain - URL del archivo HTML principal que se carga dinámicamente.
 * @property {string} urlLayoutFooter - URL del archivo HTML del pie de página.
 * @property {string} favicon - Ruta del favicon que se mostrará en la pestaña del navegador.
 * @property {string} pageTitle - Título del documento (propiedad `document.title`).
 * @property {string} headerTitle - Texto mostrado en el encabezado principal de la vista.
 * @property {string} [styles] - Hoja de estilos asociada a la vista (opcional).
 * @property {string[]} [scripts] - Archivos JavaScript adicionales a cargar (opcional).
 */


/**
 * @type {RouteConfig[]}
 * @description
 * - Array de objetos `RouteConfig` que definen las rutas de la aplicación jQuery.antonydev.tech. 
 * - Cada ruta indica los archivos HTML que se cargarán dinámicamente en las diferentes secciones del layout (header, navbar, main y footer).
 */
export const routesJQueryAntonydevTech = [

    {
        id: 'home',
        urlLayoutHeader: '/src/components-layout/layout-header.html',
        urlLayoutNavbar: '/src/components-layout/layout-navbar.html',
        urlLayoutMain: '/src/pages/00-home.html',
        urlLayoutFooter: '/src/components-layout/layout-footer.html',
        favicon: '/assets/favicon/jquery-favicon.ico',
        pageTitle: 'jQuery Desarrollos by AntonyDev',
        path: '/',
        headerTitle: 'Bienvenido a mis desarrollos con jQuery',
        styles: '/src/styles.css',
        scripts: []
    },

    {
        id: 'udemy',
        urlLayoutHeader: '/src/components-layout/udemy/layout-header.html',
        urlLayoutNavbar: '/src/components-layout/udemy/layout-navbar.html',
        urlLayoutMain: '/src/pages/01-udemy.html',
        urlLayoutFooter: '/src/components-layout/udemy/layout-footer.html',
        favicon: '/assets/favicon/jquery-favicon.ico',
        pageTitle: 'Mis Cursos jQuery de Udemy',
        path: '/01-udemy/projects-jquery/',
        headerTitle: 'Mis cursos de jQuery de Udemy',
        styles: '',
        scripts: []
    },

    {
        id: 'youtube',
        urlLayoutHeader: '/src/components-layout/youtube/layout-header.html',
        urlLayoutNavbar: '/src/components-layout/youtube/layout-navbar.html',
        urlLayoutMain: '/src/pages/02-youtube.html',
        urlLayoutFooter: '/src/components-layout/youtube/layout-footer.html',
        favicon: '/assets/favicon/jquery-favicon.ico',
        pageTitle: 'Mis Cursos de jQuery de YouTube',
        path: '/02-youtube/projects-jquery/',
        headerTitle: 'Mis Cursos de jQuery de YouTube',
        styles: '',
        scripts: []
    },

    {
        id: 'desWebCom',
        urlLayoutHeader: '/src/components-layout/desarrolloweb.com/layout-header.html',
        urlLayoutNavbar: '/src/components-layout/desarrolloweb.com/layout-navbar.html',
        urlLayoutMain: '/src/pages/03-desarrolloweb.com.html',
        urlLayoutFooter: '/src/components-layout/desarrolloweb.com/layout-footer.html',
        favicon: '/assets/favicon/jquery-favicon.ico',
        pageTitle: 'Mis Cursos de jQuery de desarrolloweb.com',
        path: '/03-desarrolloweb.com/projects-jquery/',
        headerTitle: 'Mis Cursos de jQuery de desarrolloweb.com',
        styles: '',
        scripts: []
    },

    {
        id: 'escuelaIt',
        urlLayoutHeader: '/src/components-layout/escuela.it/layout-header.html',
        urlLayoutNavbar: '/src/components-layout/escuela.it/layout-navbar.html',
        urlLayoutMain: '/src/pages/04-escuela.it.html',
        urlLayoutFooter: '/src/components-layout/escuela.it/layout-footer.html',
        favicon: '/assets/favicon/jquery-favicon.ico',
        pageTitle: 'Mis Cursos de jQuery de Escuela IT',
        path: '/04-escuela.it/projects-jquery/',
        headerTitle: 'Mis Cursos de jQuery de Escuela IT',
        styles: '',
        scripts: []
    },

    {
        id: 'books',
        urlLayoutHeader: '/src/components-layout/books/layout-header.html',
        urlLayoutNavbar: '/src/components-layout/books/layout-navbar.html',
        urlLayoutMain: '/src/pages/05-books-jquery.html',
        urlLayoutFooter: '/src/components-layout/books/layout-footer.html',
        favicon: '/assets/favicon/jquery-favicon.ico',
        pageTitle: 'Mis Libros de jQuery',
        path: '/05-books/projects-jquery/',
        headerTitle: 'Mis Libros de jQuery',
        styles: '',
        scripts: []
    },

    {
        id: 'manuales',
        urlLayoutHeader: '/src/components-layout/manuales/layout-header.html',
        urlLayoutNavbar: '/src/components-layout/manuales/layout-navbar.html',
        urlLayoutMain: '/src/pages/06-manuales-jquery.html',
        urlLayoutFooter: '/src/components-layout/manuales/layout-footer.html',
        favicon: '/assets/favicon/jquery-favicon.ico',
        pageTitle: 'Mis Manuales de jQuery',
        path: '/06-manuales/projects-jquery/',
        headerTitle: 'Mis Manuales de jQuery',
        styles: '',
        scripts: []
    }

];
