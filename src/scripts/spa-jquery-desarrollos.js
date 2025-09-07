/*
    -----------------------------------------------
    ----------  /jquery.antonydev.tech/  ----------
    ----------  /src/  ----------------------------
    ----------  /scripts/  ------------------------
    ----------  /spa-jquery-desarrollos.js/  ------
    -----------------------------------------------
*/


import { routesJQueryDesarrollos } from "/src/routes/routes-jquery-desarrollos.js";


export const spaJQueryDesarrollos = ($) => {

    
    //  ----------  Documento Cargado  ----------
    console.log('\n');
    console.warn('-----  spa-jquery.js  -----');
       
    
    //  ----------  Arrays con la informacion del contenido a cargar de las rutas del proyecto ----------
    const allRoutes = [
        
        ...routesJQueryDesarrollos

    ];

  
    //  ----------  referencias al HTML  ----------
    const $layout = $('#layout');


    //  ----------  Opciones que le pasamos al plugins  ----------
    const configOptions = {
        routes: allRoutes,
        base: '',
        layoutHeader: '#layoutHeader',
        layoutNavbar: '#layoutNavbar',
        layoutMain: '#layoutMain',
        layoutFooter: '#layoutFooter',
        draggable: true
    }


    //  ----------  Invocamos el Plugins  --  jquery.spa-with-method-load-from-jquery.js  ----------
    $layout.spaWithMethodLoadFromJQuery(configOptions);

}
