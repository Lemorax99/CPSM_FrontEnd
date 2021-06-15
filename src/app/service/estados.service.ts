import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Estados} from '../models/estados';
import {Global} from './global';

@Injectable()

export class EstadoService{
    public url: string;
    constructor(
		private _http: HttpClient
		){
		this.url=Global.urlestados;
	}
	getEstados(): Observable<any>{
		let headers= new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'estados',{headers: headers});
	}
	getEstado(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'mostrar/'+id,{headers: headers});
	}
	registrarEstado(estado: Estados): Observable<any>{
		let params = JSON.stringify(estado);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'registrar',params,{headers: headers});
	}
	deleteEstado(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		
		return this._http.delete(this.url+'eliminar/'+id, {headers: headers});
	}
	updateEstado(estado): Observable<any>{
		let params = JSON.stringify(estado);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'actualizar/'+estado._id,params,{headers: headers});
	}
}