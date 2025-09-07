//  ---------- --------------------------------------------
//  ----------  /load-jquery-ui-by-cdn-local.js  ----------
//  ---------- --------------------------------------------


export function loadJQueryUIByCdnOLocal( cdnJQueryUI, localJQueryUI ) {
    
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
