import { Component, OnInit } from '@angular/core';
import {Impuestos} from '../../models/impuestos';
import {Clientes} from '../../models/clientes';
import {ImpuestoService} from '../../service/impuestos.service';
import {ClienteService} from '../../service/clientes.service';
import { Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-volver',
  templateUrl: './volver.component.html',
  styleUrls: ['./volver.component.css'],
  providers: [ImpuestoService,
  				ClienteService]
})
export class VolverComponent implements OnInit {
	public impuestos:Impuestos[];
	public clientes:Clientes[];

  constructor(
  	private _clienteService:ClienteService,
  	private _impuestoService:ImpuestoService,
  	private _router:Router,
  	private _route:ActivatedRoute
  	) { }

  ngOnInit() {
  	if(!JSON.parse(localStorage.getItem('usuario'))){
      this._router.navigate(['/']);
    }
  	this.getClientes();
  }
  getClientes(){
  	this._clienteService.getClientes().subscribe(
  		response=>{
  			if(response.clientes){
  				this.clientes=response.clientes;
  			}
  		},
  		error=>{
  			console.log('Error');
  			console.log(<any>error);
  		}
  	);
  }
}
