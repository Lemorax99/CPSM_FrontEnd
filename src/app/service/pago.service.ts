import{Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Observable} from 'rxjs/Observable';
import {Pagos} from '../models/pagos';
import {Global} from './global';

@Injectable()

export class PagoService{
	public url: string;

	constructor(
		private _http: HttpClient
		){
		this.url=Global.urlpago;
	}
	getPagos(): Observable<any>{
		let headers= new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'pagos',{headers: headers});
	}
	getPago(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'mostrar/'+id,{headers: headers});
	}
	registrarPago(pago: Pagos): Observable<any>{
		let params = JSON.stringify(pago);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'guardar',params,{headers: headers})
	}
	deletePago(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		
		return this._http.delete(this.url+'eliminar/'+id, {headers: headers});
	}
	actualizarPago(pago): Observable<any>{
		let params = JSON.stringify(pago);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'actualizar/'+pago._id,params,{headers: headers});
	}
}