import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class BackupService {
    private _dbKey:string = "db";

    constructor(private localStorage: LocalStorage) {
        
    }

    /**
     * write data to Localstorage
     * @param data 
     */
    public WriteToLocalStorage(data:any){
        this.localStorage.setItem(this._dbKey, data).subscribe(() => {});
    }

    /**
     * read data from local storage
     * @param key 
     */
    public ReadFromLocalStorage():Observable<any>{
        return this.localStorage.getItem(this._dbKey);
    }


    
}