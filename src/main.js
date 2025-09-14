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


//  -----  Carga de jQuery  -----
const cdnJQuery = cdnJQuery_4_0_0;
const localJQuery = "/src/libs/jquery/local/jquery-4.0.0-beta.min.js";

//  -----  Carga de jQuery UI  -----
const cdnJQueryUI = '';
const localJQueryUI = "/src/libs/jquery-ui/local/jquery-ui-1.14.1-only-draggable.min.js";


//  -------------------------------------
//  -----  Ejecutamos las Promesas  -----
//  -------------------------------------

console.warn("Iniciando carga de jQuery y jQueryUI...");
console.log('\n')

loadJQueryByCdnOLocal( cdnJQuery, localJQuery )

    .then( $ => {
        
        console.warn("jQuery cargado correctamente - Version:", $.fn.jquery);
        
        //  -----  cargamos jQueryUI  -----
        loadJQueryUIByCdnOLocal( cdnJQueryUI, localJQueryUI )
        .then( $ => {
                    
            if (!$.ui) { 
                console.log('\n');
                throw new Error("jQuery UI no se cargó correctamente.");
            }
            
            console.warn("jQuery UI cargado correctamente - Version:", $.ui.version);
                
            //  -----  cargamos el plugin que carga el contenido  -----
            spaWithMethodLoadFromJQueryPlugins($);
            
            //  -----  cargamos el script principal del proyecto  -----
            spaJQueryDesarrollos($)
        })

    })

    .catch(err => console.error("Error al cargar jQuery o jQuery UI:", err));

