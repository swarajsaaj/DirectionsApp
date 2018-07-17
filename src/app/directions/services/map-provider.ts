import { InjectionToken } from "@angular/core";

/**
 * Generic Interface of any map provider (e.g. Google maps,OpenMaps).
 */
export interface MapProvider {

    /**
     * Initialize map in given element.
     * @param element 
     */
    initMap(element:Element);

    /**
     * Plot directions 
     * @param latLngs 
     */
    plotDirections(latLngs:any[]);

}

//Injection token for map provider
export let MAP_PROVIDER = new InjectionToken<MapProvider>('MapProvider');