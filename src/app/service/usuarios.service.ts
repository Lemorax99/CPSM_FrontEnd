import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Usuarios} from '../models/usuarios';
import {Global} from './global';

@Injectable()

export class UsuarioService{
	public url:string;

	constructor(
		private _http:HttpClient
		){
		this.url=Global.urllogin;
	}
	getUsuarios(): Observable<any>{
		let headers= new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'todos',{headers: headers});
	}
	getUsuario(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.get(this.url+'mostrar/'+id,{headers: headers});
	}
	registrarUsuario(usuario: Usuarios): Observable<any>{
		let params = JSON.stringify(usuario);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'registrar',params,{headers: headers})
	}
	deleteUsuario(id): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		
		return this._http.delete(this.url+'eliminar/'+id, {headers: headers});
	}
	actualizarUsuario(usuario): Observable<any>{
		let params = JSON.stringify(usuario);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.put(this.url+'actualizar/'+usuario._id,params,{headers: headers});
	}
	logearUsuario(usuario):Observable<any>{
		let params=JSON.stringify(usuario);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'logear',params,{headers: headers});
	}
}