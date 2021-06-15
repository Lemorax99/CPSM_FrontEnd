import { Component, OnInit } from '@angular/core';
import {Clientes} from '../../models/clientes';
import {ClienteService} from '../../service/clientes.service';
import {Global} from '../../service/global';
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css'],
  providers:[ClienteService]
})
export class ActualizarComponent implements OnInit {

	public cliente:Clientes;
	public url:string;
	public save_cliente;
	public _id:string;
	public id:string;

  constructor(
  	private _clienteService:ClienteService,
  	private _route: ActivatedRoute,
  	private _router: Router
  	) {
  	this.url=Global.url;
  }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('usuario'))){
      this._router.navigate(['/']);
    }
  	this._route.params.subscribe(params=>{
  		this.id= params.id;
  		this.getCliente();
  		})
  }
  getCliente(){
  	this._clienteService.getCliente(this.id).subscribe(
  		response=>{
  			console.log(response.cliente);
  			this.cliente=response.cliente;
  		},error=>{
  			console.log(<any>error);
  			});
  }
  actualizar(form){
  	this._clienteService.updateCliente(this.cliente).subscribe(
  		response=>{
  				console.log(response.cliente);
  				this._router.navigate(['/proceso/'+this.cliente._id]);
  			},
  			error=>{
  				console.log(<any>error);
  			}
  		);
  }

}
