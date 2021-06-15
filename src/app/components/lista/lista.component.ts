import { Component, OnInit } from '@angular/core';
//MOdelos
import {Clientes} from '../../models/clientes';
import {Estados} from '../../models/estados';
import {Pagos} from '../../models/pagos';
import {Mostrar} from '../../models/mostrar';

//Servicios
import {ClienteService} from '../../service/clientes.service';
import {EstadoService} from '../../service/estados.service';
import {PagoService} from '../../service/pago.service';

import { Router,ActivatedRoute,Params} from '@angular/router';


import {Global} from '../../service/global';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [ClienteService,
              EstadoService,
              PagoService
              ]
})
export class ListaComponent implements OnInit {
  public clientes:Clientes[];
  public filtro:Clientes[];
  public estados:Estados[];
  public pagos:Pagos[];
  public mostrar:Mostrar;
  public todos:Clientes[];
	public url:string;
  public texto:string;

  constructor(
    private _clienteService: ClienteService,
    private _estadoService: EstadoService,
    private _pagoService: PagoService,
    private _router: Router,
    private _route: ActivatedRoute
  	) { 
      this.url=Global.url;
      this.mostrar=new Mostrar('','','','','');
      this.todos=[];
  }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('usuario'))){
      this._router.navigate(['/']);
    }
  	this.getClientes();
  }

  getClientes(){
  	this._clienteService.getClientes().subscribe(
  		response=>{
        console.log(response);
        this.clientes=response.clientes;
        this.filtro=response.clientes;
        for (let cliente of this.clientes){
          this._estadoService.getEstado(cliente['_id']).subscribe(
            response =>{
              console.log(response);
              this.mostrar['id']=cliente['_id'];
              this.mostrar['name']=cliente['name'];
              this.mostrar['estado']=response['estado'][0]['estado'];
              this.todos.push(JSON.parse(JSON.stringify(this.mostrar)));
              this.clientes=this.todos;
            },
            error =>{
              console.log(response);
            }
          )
        }
  		},
  		error=>{
  			console.log('Error');
  			console.log(<any>error);
  		}
    );
  }
  filtrar(form){
    this.clientes=[];
    let palabra=this.texto.toLowerCase();
    for(let fil of this.todos){
      let nombre=fil['name'].toLowerCase();
      if(nombre.indexOf(palabra)!==-1){
          this.clientes.push(fil);
      }
    }
    console.log(this.clientes);
  }
}
