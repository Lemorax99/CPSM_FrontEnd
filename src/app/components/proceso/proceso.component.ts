import { Component, OnInit } from '@angular/core';
import{Clientes} from '../../models/clientes';
import{Pagos} from '../../models/pagos';
import {ClienteService} from '../../service/clientes.service';
import {PagoService} from '../../service/pago.service';
import { Global} from '../../service/global';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css'],
  providers: [ClienteService,
              PagoService]
})
export class ProcesoComponent implements OnInit {
  public url:string;
  public meses:Array<any>;
	public cliente:Clientes;
  public pago:Pagos;
  public urlpago:string;
  public estado:boolean;
  public ultimo_pago:Array<any>;
  public existe:boolean;
  public pago_usar:Pagos;
  public years:Array<any>;
  public usuario:Usuarios;

  constructor(
  	private _clienteService: ClienteService,
    private _pagoService:PagoService,
  	private _router: Router,
  	private _route: ActivatedRoute
  	) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.estado=false ;
  	this.url=Global.url;
    this.urlpago=Global.urlpago;
    this.ultimo_pago=[];
    this.pago_usar=new Pagos('','','','','',0,0,0);
    this.years=['2019','2020','2021','2022','2023','2024','2025'];
    this.meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('usuario'))){
      this._router.navigate(['/']);
    }
  	this._route.params.subscribe(params=>{
  		let _id = params.id;
  		this.mostrarCliente(_id);
  		})
  }
  mostrarCliente(id){
    console.log(this.usuario.tipo);
  	console.log(id);
  	this._clienteService.getCliente(id).subscribe(
  		response =>{
        console.log(response.cliente);
  			this.cliente = response.cliente;
        this._pagoService.getPago(this.cliente['_id']).subscribe(
          response =>{
              console.log(response.pago);
              if(response['pago'].length==0){
                this._pagoService.getPago(this.cliente['name']).subscribe(
                  response=>{
                    if(response['pago'].length==0){
                      this.existe=false;
                    }else{
                      //actualizar los pagos para que estos se manejen con el Id del cliente
                      for (let i of response['pago']){
                        i['id_cliente']=this.cliente['_id'];
                        this._pagoService.actualizarPago(i).subscribe(
                          response=>{
                            console.log(response['pago']);
                          },error=>{
                            console.log(<any>error);
                          }
                        );
                      }
                      this._pagoService.getPago(this.cliente._id).subscribe(
                        response=>{
                          this.existe=true;
                          console.log(response['pago']);
                          this.pago=response['pago'];
                          this.Sacar_ultimo(response['pago']);
                        }
                      );
                    }
                  },error =>{
                    console.log(<any>error);
                  }
                );
              }else{
                this.Sacar_ultimo(response['pago']);
                console.log(response['pago']);
                this.existe=true;
              }
            },
            error=>{
              console.log(<any>error);
            }
          );
  		},error =>{
  			console.log('Error');
  			console.log(<any>error);
  		}
  		)
  }
  deleteCliente(id){
    this._clienteService.deleteCliente(id).subscribe(
      response =>{
          if(response.cliente){
            console.log(response.cliente);
            this._pagoService.deletePago(response.cliente.name).subscribe(
              response=>{
                  console.log(response);
                },
                error=>{
                  console.log(<any>error);
                }
              )
            this._router.navigate(['/lista']);
          }
        },error => {
          console.log(error);
        }
      )
  }
  updateCliente(id){
    this._router.navigate(['/editar/'+id]);
  }
  aumentar(id){
    console.log(id);
    this.estado=true;
  }
  aumentar2(num){ 
    this._pagoService.actualizarPago(this.ultimo_pago).subscribe(
      response=>{
        console.log(response);
        this.ultimo_pago=response.pago;
        this.estado=false;
      },error=>{
        console.log(<any>error);
      }
      )
  }
  volver(){
    this.estado=false;
  }
  Sacar_ultimo(res){
    this.ultimo_pago=[];
    var bandera = false;
    for (let pago of res){
      if (this.ultimo_pago.length==0){
        this.ultimo_pago.push(pago);
      }else{
        var mes_verificar = this.sacar_mes(pago['mes']);
        var mes = this.sacar_mes(this.ultimo_pago[0]['mes']);
        if (pago['year']>this.ultimo_pago[0]['year']){
          this.ultimo_pago[0]=pago;
        }else{
          if (mes_verificar>mes){
            this.ultimo_pago[0]=pago;
          }
        }
      }
    }
    this.ultimo_pago=this.ultimo_pago[0];
  console.log('final',this.ultimo_pago);
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
  registrar_pago(form){
    this.pago_usar['id_cliente']=this.cliente['_id'];
    this._pagoService.registrarPago(this.pago_usar).subscribe(
      response=>{
        console.log(response['pago']);
        this.ultimo_pago=response['pago'];
      },
      error=>{
        console.log(<any>error);
      }
    );
    this.existe=true;
  }
}
