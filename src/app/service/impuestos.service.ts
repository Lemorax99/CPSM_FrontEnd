import{Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Observable} from 'rxjs/Observable';
import {Impuestos} from '../models/impuestos';
import {Global} from './global';

@Injectable()

export class ImpuestoService{
	public url: string;

	constructor(
		private _http: HttpClient
		){
		this.url=Global.urlimpuestos;
	}
	getImpuesto_por_id(id):Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'mostrar_por_id/'+id,{headers: headers});
	}
	getImpuestos(): Observable<any>{
		let headers= new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'todos',{headers: headers});
	}
	getImpuesto(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'mostrar/'+id,{headers: headers});
	}
	registrarImpuesto(impuesto: Impuestos): Observable<any>{
		let params = JSON.stringify(impuesto);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'registrar',params,{headers: headers})
	}
	deleteImpuesto(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		
		return this._http.delete(this.url+'eliminar/'+id, {headers: headers});
	}
	updateImpuesto(impuesto): Observable<any>{
		let params = JSON.stringify(impuesto);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'actualizar/'+impuesto._id,params,{headers: headers});
	}
	getImpuestoxid(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'mostrar_por_id/'+id,{headers: headers});
	}
}