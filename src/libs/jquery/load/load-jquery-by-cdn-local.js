//  ----------------------------------------------------
//  ----------  /load-jquery-by-cdn-local.js  ----------
//  ----------------------------------------------------


export function loadJQueryByCdnOLocal( cdnJQuery, localJQuery ) {
    
    const { 
        srcCdn, 
        integrity, 
        crossOrigin, 
        referrerPolicy
    } = cdnJQuery;

    return new Promise((resolve, reject) => {
        
        //  -----  Verifica si jQuery ya está cargado  -----
        if (window.jQuery) {
            console.warn("jQuery ya estaba cargado:", $.fn.jquery);
            return resolve(window.jQuery);
        }


        //  -----  Carga jQuery por Primera Vez  -----
        console.warn("Cargando jQuery desde CDN...");

        //  -----  Crea el script del CDN  -----
        const script = document.createElement("script");
        script.src = srcCdn;
        script.integrity = integrity;
        script.crossOrigin = crossOrigin;
        script.referrerPolicy = referrerPolicy;


        //  -----  Eventos de Carga  -----
        script.onload = () => {
            console.warn("jQuery cargado desde CDN - Versión:", $.fn.jquery);
            resolve(window.jQuery);
        };

        //  -----  Eventos de Error  -----
        script.onerror = () => {
            
            console.error("CDN falló. Cargando jQuery desde local...");

            //  -----  Si el CDN falla, carga jQuery localmente  -----
            const localScript = document.createElement("script");
            localScript.src = localJQuery;

            //  -----  Eventos de Carga  -----
            localScript.onload = () => {
                console.log('\n');
                console.warn("jQuery cargado desde local - Versión:", $.fn.jquery);
                resolve(window.jQuery);
            };

            //  -----  Eventos de Error  -----
            localScript.onerror = () => {
                console.error("Error al cargar jQuery local.");
                reject(new Error("No se pudo cargar jQuery"));
            };

            //  -----  Añadir script al head  -----
            document.head.appendChild(localScript);
        };

        
        //  -----  Añadir script al head  -----
        document.head.appendChild(script);

    });

}
