//  -------------------------------------------------------
//  ----------  /load-jquery-ui-by-cdn-local.js  ----------
//  -------------------------------------------------------



export function loadJQueryUIByCdnOLocal(cdnJQueryUI = null, localJQueryUI) {
    
    
    return new Promise((resolve, reject) => {
        
        console.log('\n');
        console.warn("Cargando jQuery UI...");
        
        
        //  -----  Si NO se pasó CDN, cargar directo desde local  -----
        if (!cdnJQueryUI || !cdnJQueryUI.srcCdn) {
            
            console.warn("No se definió CDN de jQuery UI, cargando desde local...");
            
            const localScript = document.createElement("script");
            localScript.src = localJQueryUI;

            localScript.onload = () => {
                
                if (window.jQuery && jQuery.ui) {
                    console.warn("jQuery UI cargado correctamente desde local");
                    resolve(jQuery);
                } else {
                    reject(new Error("jQuery UI no se cargó correctamente desde local"));
                }
            };

            localScript.onerror = () => reject(new Error("Error al cargar jQuery UI localmente"));
            document.head.appendChild(localScript);
            
            return;

        }


        
        //  -----  SI HAY CDN definido, intentar cargarlo  -----
        const { 
            srcCdn, 
            integrity, 
            crossOrigin, 
            referrerPolicy 
        } = cdnJQueryUI;

        const script = document.createElement("script");
        
        script.src = srcCdn;
        
        if (integrity) 
            script.integrity = integrity;

        if (crossOrigin) 
            script.crossOrigin = crossOrigin;

        if (referrerPolicy) 
            script.referrerPolicy = referrerPolicy;


        script.onload = () => {
            
            if (window.jQuery && jQuery.ui) {
                console.warn("jQuery UI cargado desde CDN");
                resolve(jQuery);
            } else {
                reject(new Error("jQuery UI no cargado correctamente desde CDN"));
            }

        };


        script.onerror = () => {
            
            console.error("Error al cargar jQuery UI desde CDN. Intentando cargar localmente...");
            
            const localScript = document.createElement("script");
            localScript.src = localJQueryUI;

            localScript.onload = () => {
                
                if (window.jQuery && jQuery.ui) {
                    console.warn("jQuery UI cargado desde local");
                    resolve(jQuery);
                } else {
                    reject(new Error("jQuery UI no se cargó correctamente desde local"));
                }

            };

            localScript.onerror = () => reject(new Error("Error al cargar jQuery UI localmente"));
            document.head.appendChild(localScript);
        };

        document.head.appendChild(script);

    });

}


/*
export function loadJQueryUIByCdnOLocal( cdnJQueryUI = null, localJQueryUI ) {
    
    const {
        srcCdn,
        integrity,
        crossOrigin,
        referrerPolicy
    } = cdnJQueryUI;


    return new Promise((resolve, reject) => {
        
        const script = document.createElement("script");
        script.src = srcCdn;
        script.integrity = integrity;
        script.crossOrigin = crossOrigin;
        script.referrerPolicy = referrerPolicy;
        
        script.onload = () => {
            
            if (window.jQuery && jQuery.ui) {
                console.log('\n');
                console.warn("jQuery UI cargado desde CDN");
                resolve(jQuery);
            }
                            
            else {
                console.log('\n');
                reject(new Error("jQuery UI no cargado desde CDN"));
            } 
                
            
        };
        
        script.onerror = () => {
            
            console.log('\n');
            console.error("Error al cargar jQuery UI desde CDN. Intentando cargar localmente...");
            
            const localScript = document.createElement("script");
            localScript.src = localJQueryUI;

            localScript.onload = () => {
                console.log('\n');
                console.warn("jQuery UI cargado desde local");
                resolve(jQuery);
            }
            
            localScript.onerror = () => reject(new Error("Error al cargar jQuery UI localmente"));
            
            document.head.appendChild(localScript);

        };
        
        document.head.appendChild(script);

    });
}
*/