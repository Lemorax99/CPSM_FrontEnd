import { Component, OnInit } from '@angular/core';
import {Pagos} from '../../models/pagos';
import {PagoService} from '../../service/pago.service';
import {Router,ActivatedRoute,Params} from '@angular/router';


@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css'],
  providers: [PagoService]
})
export class PagosComponent implements OnInit {
	public pagos: Pagos[];
	public id: String;

  constructor(
  	private _pagoService:PagoService,
  	private _route:ActivatedRoute,
  	private _router:Router
  	) { 
  }

  ngOnInit() {
	  
    if(!JSON.parse(localStorage.getItem('usuario'))){
      this._router.navigate(['/']);
    }
  	this._route.params.subscribe(params=>{
  		this.id = params.id;

  		this.getClientes();
  		})
  }
  getClientes(){
  	this._pagoService.getPago(this.id).subscribe(
  		response=>{
  			this.pagos=response.pago;
  		},error=>{
  			console.log(<any>error);
  		}
  		)
  }

}
