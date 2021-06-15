import { Component, OnInit } from '@angular/core';
//Modelos
import {Clientes} from '../../models/clientes';
import {Pagos} from '../../models/pagos';
//Servicios
import {PagoService} from '../../service/pago.service';
import {ClienteService} from '../../service/clientes.service';

import { Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css'],
  providers: [PagoService,
              ClienteService]
})
export class PagarComponent implements OnInit {
    public cliente:Clientes;
	  public meses:Array<any>;
  	public years:Array<any>;
    public pago:Pagos;
    public year:number;
    public mes:String;
    public num1:number;
    public num2:number;
    public opcion:String;
    public ultimo_pago:Array<any>;
    public id:String;
  constructor(
  	private _pagoService:PagoService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _clienteService:ClienteService
  	) { 
      this.ultimo_pago=[];
      this.cliente=new Clientes('','','','','','','','','','','','');
      this.pago=new Pagos('','','','','',0,0,0);
      this.meses= ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      this.years=[2018,2019,2020,2021,2022,2023,2024,2025];
      this.year=0;
      this.mes='';
      this.num1=0;
      this.num2=0;
      this.opcion='crear';
    }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('usuario'))){
      this._router.navigate(['/']);
    }
    this._route.params.subscribe(params=>{
        this.id = params.id;
        this.sacar();
      })
  }
  sacar(){
    this._pagoService.getPago(this.id).subscribe(
      response =>{
          console.log(response.pago);
          var mayor_anno=0;
          var mayor_mes=0;
          for (let pago of response.pago){
            if (pago.year>mayor_anno){
              mayor_anno=pago.year;
              mayor_mes=this.sacar_mes(pago.mes);
              this.pago=pago;
            }else{
              if(pago.year==mayor_anno){
                if(this.sacar_mes(pago.mes)>mayor_mes){
                  mayor_mes=this.sacar_mes(pago.mes);
                  this.pago=pago;
                }
              }
            }
          }
          this.year=this.pago.year;
          this.mes=this.pago.mes;
          this._clienteService.getCliente(this.pago.id_cliente).subscribe(
            response=>{
              console.log(response);
              this.cliente=response.cliente;
            },
            error=>{
              console.log(<any>error);
            }
          );
        },
        error =>{
          console.log(<any>error);
        }
      );
    }
  ingresar(form){
    if (this.pago.year>this.year){
      //Proceso directo
      var mes_ultimo = this.sacar_mes(this.pago.mes);
      var mes_nuevo = this.sacar_mes(this.mes);
      //Sacamos diferencia entre meses
      var cant_meses=(12-(mes_nuevo+1))+(mes_ultimo+1)
      if(this.pago.year-this.year>1){
        cant_meses+=(12*((this.pago.year-1)-this.year));
      }
      this.pago.cantidad=(cant_meses*this.pago.pago_mes);
      this.opcion='confirmar';
    }else{
      if(this.pago.year==this.year){
        //Comprobar meses
        var mes_nuevo = this.sacar_mes(this.pago.mes);
        var mes_ultimo = this.sacar_mes(this.mes);
        if(mes_nuevo>mes_ultimo){
          //Proceso directo
          var cant_meses = mes_nuevo-mes_ultimo;
          this.pago.cantidad=(cant_meses*this.pago.pago_mes);
          this.opcion='confirmar';
        }else{
          //Notificacion de error
          alert('Proceso erroneo por meses menores');
        }
      }else{
        //Notificacion de pago invalido
        alert('Proceso erroneo por años menores');
      }
    }
    /*if (this.pago.year>=this.year){
      if(this.pago.year==this.year){
          for(var i =0;i<12;i++){
            if(this.pago.mes==this.meses[i]){
              this.num1=i;
            }
            if(this.mes==this.meses[i]){
              this.num2=i;
            }
          }
        this.num1=this.num1-this.num2;
        }
      if (this.pago.year>this.year){
        for(var i =0;i<12;i++){
            if(this.pago.mes==this.meses[i]){
              this.num1=i;
            }
            if(this.mes==this.meses[i]){
              this.num2=i;
            }
          }
          console.log(this.pago.year);
          console.log(this.year);
          this.num1=((12*(this.pago.year-this.year))-this.num2)+this.num1
        }
      this.opcion='confirmar';
      console.log('Cantidad a pagar : ');
      console.log(this.num1*this.pago.pago_mes);
      if(this.num2==11){
        this.mes=this.meses[0]
      }else{
        this.mes=this.meses[this.num2+1];
      }
      this.pago.cantidad=this.num1*this.pago.pago_mes;
      }
    }
    /*
    this._pagoService.registrarPago(this.pago).subscribe(
          response =>{
            console.log(this.pago);
            this._router.navigate(['/lista']);
            },
            error=>{
              console.log(<any>error);
              }
            );
    */ 
            }
    realizar(){
      this._pagoService.registrarPago(this.pago).subscribe(
          response =>{
            console.log(this.pago);
            this._router.navigate(['/lista']);
            },
            error=>{
              console.log(<any>error);
            }
          );
    }
    sacar_mes(mes){
      let numero=0;
      for(let i=0;i<12;i++){
        if(this.meses[i]==mes){
          numero = i;
          return numero;
        }
      }
    }
    cancelar(){
      this.opcion='crear';
    }
}