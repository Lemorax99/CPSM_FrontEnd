import{Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Observable} from 'rxjs/Observable';
import {Clientes} from '../models/clientes';
import {Global} from './global';

@Injectable()

export class ClienteService{
	public url: string;
	constructor(
		private _http: HttpClient
		){
		this.url=Global.url;
	}
	getClientes(): Observable<any>{
		let headers= new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'clientes',{headers: headers});
	}
	getCliente(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'mostrar/'+id,{headers: headers});
	}
	registrarCliente(cliente: Clientes): Observable<any>{
		let params = JSON.stringify(cliente);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'registro',params,{headers: headers})
	}
	deleteCliente(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		
		return this._http.delete(this.url+'eliminar/'+id, {headers: headers});
	}
	updateCliente(cliente): Observable<any>{
		let params = JSON.stringify(cliente);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'actualizar/'+cliente._id,params,{headers: headers});
	}
}