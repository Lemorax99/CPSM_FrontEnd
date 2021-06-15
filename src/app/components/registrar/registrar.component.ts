import { Component, OnInit } from '@angular/core';
//importar modelos
import {Pagos} from '../../models/pagos';
import {Clientes} from '../../models/clientes';
import {Estados} from '../../models/estados';
import {Impuestos} from '../../models/impuestos';
import {Fiel} from '../../models/fiel';

//Importar servicios
import {ClienteService} from '../../service/clientes.service';
import {PagoService} from '../..//service/pago.service';
import {EstadoService} from '../../service/estados.service';
import {ImpuestoService} from '../../service/impuestos.service';
import {FielService} from '../../service/fiel.service';

import { Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
  providers: [ClienteService,
              PagoService,
              EstadoService,
              ImpuestoService,
              FielService
            ]
})
export class RegistrarComponent implements OnInit {
	public cliente: Clientes;
  public pago: Pagos;
  public estado_option: Estados;
  public FielyCsd: Fiel;
  public _isr: Impuestos;
  public _iva: Impuestos;
  public _ieps:Impuestos;
  public _ispt: Impuestos;
  public _rtp:Impuestos;
  public _ish:Impuestos;
  public _isn:Impuestos;
  public _imss:Impuestos;
  public _sar:Impuestos;
  public _infonavit:Impuestos;
  public meses:Array<any>;
  public regimenes:Array<any>;
  public years:Array<any>;
  public estados:Array<any>;
  public datos:Array<any>;
  public iva:Boolean;
  public ieps:Boolean;
  public ispt:Boolean;
  public rtp:Boolean;
  public ish:Boolean;
  public isn:Boolean;
  public imss:Boolean;
  public sar:Boolean;
  public isr:Boolean;
  public honorarios:Boolean;
  public infonavit:Boolean;
  public pagina:number;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
  	private _clienteService: ClienteService,
    private _pagoService:PagoService,
    private _estadoService:EstadoService,
    private _impuestoService:ImpuestoService,
    private _fielService:FielService
  	) {
  	this.cliente= new Clientes('','','','','','','','','','','','');
    this.pago=new Pagos('','','','','',0,0,0);
    this.FielyCsd=new Fiel('','','','','','','','','');
    this.estado_option=new Estados('','','');
    this._isr = new Impuestos('','','','','','','isr',0.0);
    this._iva = new Impuestos('','','','','','','iva',0.0);
    this._ieps = new Impuestos('','','','','','','ieps',0.0);
    this._ispt = new Impuestos('','','','','','','ispt',0.0);
    this._rtp = new Impuestos('','','','','','','rtp',0.0);
    this._ish = new Impuestos('','','','','','','ish',0.0);
    this._isn = new Impuestos('','','','','','','isn',0.0);
    this._imss = new Impuestos('','','','','','','imss',0.0);
    this._sar = new Impuestos('','','','','','','sar',0.0);
    this._infonavit = new Impuestos('','','','','','','infonavit',0.0);
    this.meses= ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    this.years=[2019,2020,2021,2022,2023,2024,2025,2026,2027];
    this.regimenes=['Actividad empresarial','Actividad empresarial y profesional','Actividad profesional','Arrendamiento','Regimen de incorporación fiscal','Trabajadores'];
    this.estados=['Activo','Suspendido','No cliente'];
    this.pagina=1;
  }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('usuario'))){
      this._router.navigate(['/']);
    }
  }
  onSubmit(form){
    this._clienteService.registrarCliente(this.cliente).subscribe(
      response =>{
        console.log(response);
        this.datos={...response.cliente};
        console.log(this.datos,'datos');
        //transforma objetos a cadenas de texto
        //stringify transforma cadenas de texto a aobjetos
        this.estado_option['id_cliente']=this.datos['_id'];
        this._estadoService.registrarEstado(this.estado_option).subscribe(
          response =>{
            console.log(response);
          },
          error=>{
            console.log(<any>error);
          }
        );
        if(this.honorarios){
          this.pago['id_cliente']=this.datos['_id'];
          this._pagoService.registrarPago(this.pago).subscribe(
            response =>{
              console.log(response);
            },
            error=>{
              console.log(<any>error);
            }
          );
        }
        if(this.isr){
          this._isr['id_cliente']=this.datos['_id'];
          this._impuestoService.registrarImpuesto(this._isr).subscribe(
            response=>{
              console.log(response);
            },
            error=>{
              console.log(<any>error);
            }
          );
        }
        if(this.iva){
          this._iva['id_cliente']=this.datos['_id'];
          this._impuestoService.registrarImpuesto(this._iva).subscribe(
            response=>{
              console.log(response);
            },
            error =>{
              console.log(<any>error);
            }
          );
        }
        if(this.ieps){
          this._ieps['id_cliente']=this.datos['_id'];
          this._impuestoService.registrarImpuesto(this._ieps).subscribe(
            response=>{
              console.log(response);
            },
            error =>{
              console.log(<any>error);
            }
          );
        }
        if(this.ispt){
          this._ispt['id_cliente']=this.datos['_id'];
          this._impuestoService.registrarImpuesto(this._ispt).subscribe(
            response=>{
              console.log(response);
            },
            error=>{
              console.log(<any>error);
            }
          );
        }
        if(this.rtp){
          this._rtp['id_cliente']=this.datos['_id'];
          this._impuestoService.registrarImpuesto(this._rtp).subscribe(
            response=>{
              console.log(response);
            },
            error=>{
              console.log(<any>error);
            }
          );
        }
        if(this.ish){
          this._ish['id_cliente']=this.datos['_id'];
          this._impuestoService.registrarImpuesto(this._ish).subscribe(
            response=>{
              console.log(response);
            },
            error=>{
              console.log(<any>error);
            }
          );
        }
        if(this.isn){
          this._isn['id_cliente']=this.datos['_id'];
          this._impuestoService.registrarImpuesto(this._isn).subscribe(
            response=>{
              console.log(response);
            },
            error=>{
              console.log(<any>error);
            }
          );
        }
        if(this.imss){
          this._imss['id_cliente']=this.datos['_id'];
          this._impuestoService.registrarImpuesto(this._imss).subscribe(
            response=>{
              console.log(response);
            },
            error=>{
              console.log(<any>error);
            }
          );
        }
        if(this.sar){
          this._sar['id_cliente']=this.datos['_id'];
          this._impuestoService.registrarImpuesto(this._sar).subscribe(
            response=>{
              console.log(response);
            },
            error=>{
              console.log(<any>error);
            }
          );
        }
        if(this.infonavit){
          this._infonavit['id_cliente']=this.datos['_id'];
          this._impuestoService.registrarImpuesto(this._infonavit).subscribe(
            response=>{
              console.log(response);
            },
            error=>{
              console.log(<any>error);
            }
          );
        }
        this.FielyCsd['id_cliente']=this.datos['_id'];
        this._fielService.registrarFiel(this.FielyCsd).subscribe(
          response=>{
            console.log(response);
          },
          error=>{
            console.log(<any>error);
          }
        )
        form.reset();
          },
          error=>{
            console.log(<any>error);
          }
        );
      this._router.navigate(['lista']);
    }
  funcion(impuesto){
    switch (impuesto){
      case 'isr':{
        if(this.isr!=true){
          this.isr=true;
        }else{
          this.isr=false;
        }
        console.log('isr :',this.isr);
        break;
      }
      case 'iva':{
        if(this.iva!=true){
          this.iva = true;
        }else{
          this.iva = false;
        }
        console.log('iva : ',this.iva);
        break;
      }
      case 'ieps':{
        if(this.ieps!=true){
          this.ieps = true;
        }else{
          this.ieps = false;
        }
        console.log('ieps : ',this.ieps);
        break;
      }
      case 'ispt':{
        if(this.ispt!=true){
          this.ispt = true;
        }else{
          this.ispt = false;
        }
        console.log('ispt : ',this.ispt);
        break;
      }
      case 'rtp':{
        if(this.rtp!=true){
          this.rtp = true;
        }else{
          this.rtp = false;
        }
        console.log('rtp : ',this.rtp);
        break;
      }
      case 'ish':{
        if(this.ish!=true){
          this.ish = true;
        }else{
          this.ish = false;
        }
        console.log('ish : ',this.ish);
        break;
      }
      case 'isn':{
        if(this.isn!=true){
          this.isn = true;
        }else{
          this.isn = false;
        }
        console.log('isn : ',this.isn);
        break;
      }
      case 'imss':{
        if(this.imss!=true){
          this.imss = true;
        }else{
          this.imss = false;
        }
        console.log('imss : ',this.imss);
        break;
      }
      case 'sar':{
        if(this.sar!=true){
          this.sar = true;
        }else{
          this.sar = false;
        }
        console.log('sar : ',this.sar);
        break;
      }
      case 'honorarios':{
        if(this.honorarios!=true){
          this.honorarios=true;
        }else{
          this.honorarios=false;
        }
        console.log('honorarios :',this.honorarios);
        break;
      }
      default:{
        if(this.infonavit!=true){
          this.infonavit = true;
        }else{
          this.infonavit = false;
        }
        console.log('infonavit : ',this.infonavit);
        break;
      }
    }
  }
  retroceder(){
    this.pagina-=1;
    console.log(this.pagina,'resta');
  }
  avanzar(){
    this.pagina+=1;
    console.log(this.pagina,'suma')
  }
}