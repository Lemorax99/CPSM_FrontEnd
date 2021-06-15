import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Fiel} from '../models/fiel';
import {Global} from './global';


@Injectable()

export class FielService{
    public url:String;
    constructor(
        private _http: HttpClient
        ){
        this.url=Global.urlfiel;
    }
    getFiels(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'todos',{headers: headers});
    }
    getFiel(id):Observable<any>{
        let headers =new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url+'mostrar/'+id,{headers :headers});
    }
    registrarFiel(fiel : Fiel):Observable<any>{
        let params = JSON.stringify(fiel);

        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url+'registrar',params,{headers: headers});
    }
    deleteFiel(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.delete(this.url+'eliminar/'+id,{headers: headers});
    }
    updateFiel(fiel): Observable<any>{
        let params =JSON.stringify(fiel);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.put(this.url+'actualizar/'+fiel._id,params,{headers: headers});
    }

}
