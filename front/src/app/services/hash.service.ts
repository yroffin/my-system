import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HashService {

    /**
     * Build a unniq instance of each edge key
     * @param hash 
     * @param key 
     * @returns 
     */
    private computeInstance(hash: any, key: string): any {
        if (hash[key]) {
            hash[key].count++
        } else {
            hash[key] = {
                count: 1
            }
        }
        return hash[key]
    }

    /**
     * Build a unniq instance of each edge key, ignore 0 index
     * @param hash 
     * @param edge 
     * @returns 
     */
    buildId(hash: any, edge: any): string {
        let uniqInstance = this.computeInstance(hash, `${edge.source}:${edge.target}`)
        let labelInstance = ""
        if (uniqInstance.count > 1) {
            labelInstance = `@${uniqInstance.count - 1}`
        }
        return `${edge.source}:${edge.target}${labelInstance}`
    }
}
