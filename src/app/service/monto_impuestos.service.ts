import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Monto} from '../models/monto_impuestos';
import {Global} from './global'; 

@Injectable()

export class MontoService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url=Global.urlmonto;
    }
    getMonto(id): Observable<any>{

        let headers=new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'obtener/'+id,{headers: headers});

    }
    deleteMonto(id): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.delete(this.url+'eliminar/'+id,{headers: headers});
    }
    updateMonto(monto_impuesto: Monto): Observable<any>{
        let params=JSON.stringify(monto_impuesto);

        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+'actualizar/'+monto_impuesto._id,params,{headers: headers});
    }
    registrarMonto(monto_impuesto: Monto): Observable<any>{
        let params=JSON.stringify(monto_impuesto);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'registro',params,{headers: headers});
    }

}
