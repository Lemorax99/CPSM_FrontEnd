import { Component, OnInit } from '@angular/core';
import {Params,ActivatedRoute,Router} from '@angular/router';
//Modelos
import {Clientes} from '../../models/clientes';
import {Impuestos} from '../../models/impuestos';
import {Monto} from '../../models/monto_impuestos';
import {Monto_mostrar} from '../../models/mostrar_impuestos';
import {Usuarios} from '../../models/usuarios';
//Servicios
import {ClienteService} from '../../service/clientes.service';
import {ImpuestoService} from '../../service/impuestos.service';
import {MontoService} from '../../service/monto_impuestos.service';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['./impuestos.component.css'],
  providers:[ClienteService,
            ImpuestoService,
            MontoService
            ]
})
export class ImpuestosComponent implements OnInit {
  public cliente :Clientes;
  public monto_impuestos : Monto;
  public mostrar:Monto_mostrar;
  public impuestos_totales :Monto_mostrar[];
  public impuestos:Impuestos[];
  public impuesto: Impuestos;
  public isr:boolean;
  public iva:boolean;
  public ieps:boolean;
  public ispt:boolean;
  public rtp:boolean;
  public ish:boolean;
  public isn:boolean;
  public imss:boolean;
  public sar:boolean;
  public infonavit:boolean;
  public impuestos_lista:Array<any>;
  public pagina:String;
  public cadena_impuestos:string;
  public contador:number;
  public usuarios:Usuarios;
  
  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _clienteService:ClienteService,
    private _impuestoService:ImpuestoService,
    private _monto_impuestoService:MontoService,
  ) {
    this.mostrar=new Monto_mostrar('','','','','',0,'');
    this.pagina='lista';
    this.cliente=new Clientes('','','','','','','','','','','','');
    this.monto_impuestos=new Monto('',0,0,0,0,0,0,0,0,0,0) ;
    this.impuesto=new Impuestos('','','','','','','',0);
    this.impuestos_lista=['isr','iva','ieps','ispt','rtp','ish','isn','imss','sar','infonavit'];
    this.impuestos_totales=[];

    this.isr=false;
    this.iva=false;
    this.ieps=false;
    this.ispt=false;
    this.rtp=false;
    this.ish=false;
    this.isn=false;
    this.imss=false;
    this.sar=false;
    this.infonavit=false;
    this.contador=0;
   }

  ngOnInit() {
      
    if(!JSON.parse(localStorage.getItem('usuario'))){
      this._router.navigate(['/']);
    }
    this._route.params.subscribe(params =>{
      let id = params.id;
      this.usuarios=JSON.parse(localStorage.getItem('usuario'));
      this.getCliente(id);
    });
  }
  getCliente(id){
    this.pagina='lista';
    console.log(id);
    this.impuestos_totales=[];
    this._clienteService.getCliente(id).subscribe(
      response=>{
        console.log(response['cliente']);
        this.cliente=JSON.parse(JSON.stringify(response['cliente']));
        this._impuestoService.getImpuesto(this.cliente['_id']).subscribe(
          response=>{
            this.impuesto['id_cliente']=JSON.parse(JSON.stringify(this.cliente['_id']));
            for (let impu in response['impuesto']){
              this.impuestos_false();
              this._monto_impuestoService.getMonto(response['impuesto'][impu]['tipo_impuesto']).subscribe(response_2=>{
                this.mostrar['fecha_pago']=response['impuesto'][impu]['fecha_pago'];
                this.mostrar['fecha_presentacion']=response['impuesto'][impu]['fecha_presentacion'];
                this.mostrar['folio_pago']=response['impuesto'][impu]['folio_pago'];
                this.mostrar['folio_presentacion']=response['impuesto'][impu]['folio_presentacion'];
                this.mostrar['cantidad']=response['impuesto'][impu]['cantidad'];
                this.mostrar['id']=response['impuesto'][impu]['_id'];
                this.activar_impuestos(response_2['monto_impuestos'][0]);
                this.mostrar['impuestos']=JSON.parse(JSON.stringify(this.creacion_impuesto()));
                this.impuestos_totales.push(JSON.parse(JSON.stringify(this.mostrar)));
                console.log(this.impuestos_totales);
                this.Burbuja();
                this.impuestos_false();
              },error=>{
                console.log(<any>error);
              });
            }
            
          },
          error=>{
            console.log(<any>error);
          }
        );
      },
      error=>{
        console.log(<any>error);
      }
      );
  }
  registrar(){
    console.log('Registracion');
    this.pagina='registro';
  }
  estatus_impuestos(imp){
    switch(imp){
      case "iva":{
        this.iva=this.cambiar_estado(this.iva);
        if(!this.iva){
          this.monto_impuestos['iva']=0;
        }
        break;
      }
      case 'isr':{
        this.isr=this.cambiar_estado(this.isr);
        if(!this.isr){
          this.monto_impuestos['isr']=0;
        }
        break;
      }
      case 'ieps':{
        this.ieps=this.cambiar_estado(this.ieps);
        if(!this.ieps){
          this.monto_impuestos['ieps']=0;
        }
        break;
      }
      case 'ispt': {
        this.ispt=this.cambiar_estado(this.ispt);
        if(!this.ispt){
          this.monto_impuestos['ispt']=0;
        }
        break;
      }
      case 'rtp': {
        this.rtp= this.cambiar_estado(this.rtp);
        if(!this.rtp){
          this.monto_impuestos['rtp']=0;
        }
        break;
      }
      case 'ish':{
        this.ish=this.cambiar_estado(this.ish);
        if(!this.ish){
          this.monto_impuestos['ish']=0;
        }
        break;
      }
      case 'isn':{
        this.isn=this.cambiar_estado(this.isn);
        if(!this.isn){
          this.monto_impuestos['isn']=0;
        }
        break;
      }
      case 'imss':{
        this.imss=this.cambiar_estado(this.imss);
        if(!this.imss){
          this.monto_impuestos['imss']=0;
        }
        break;
      }
      case 'sar':{
        this.sar=this.cambiar_estado(this.sar);
        if(!this.sar){
          this.monto_impuestos['sar']=0;
        }
        break;
      }
      default :{
        this.infonavit=this.cambiar_estado(this.infonavit);
        if(!this.infonavit){
          this.monto_impuestos['infonavit']=0;
        }
        break;
      }
    }
  }
  formulario_registro(form){
    this.creacion_impuesto()
    console.log(this.impuesto);
    if(this.iva || this.isr || this.ieps || this.ispt || this.ish || this.isn || this.rtp || this.imss || this.sar || this.infonavit){
      this.impuesto['cantidad']=this.monto_impuestos['iva']+this.monto_impuestos['isr']+this.monto_impuestos['ieps']+this.monto_impuestos['ispt']+this.monto_impuestos['ish']+this.monto_impuestos['isn']+this.monto_impuestos['rtp']+this.monto_impuestos['imss']+this.monto_impuestos['sar']+this.monto_impuestos['infonavit'];
      this.pagina='confirmacion';
    }else{
      alert('No se ha selecciono ningun tipo de impuesto');
    }

  }
  regresar_lista(){
    this.reiniciar();
    this.pagina='lista';
  }
  creacion_impuesto(){
    this.cadena_impuestos='';
    this.contador=0;
    if(this.iva){
      this.cadena_impuestos+='iva';
      this.contador+=1;
    }
    if(this.isr){
      if (this.contador!=0){
        this.cadena_impuestos+=', ';
      }
      this.cadena_impuestos+='isr';
      this.contador+=1;
    }
    if(this.ieps){
      if (this.contador!=0){
        this.cadena_impuestos+=', ';
      }
      this.cadena_impuestos+='ieps';
      this.contador+=1;
    }
    if(this.ispt){
      if (this.contador!=0){
        this.cadena_impuestos+=', ';
      }
      this.cadena_impuestos+='ispt';
      this.contador+=1;
    }
    if(this.rtp){
      if (this.contador!=0){
        this.cadena_impuestos+=', ';
      }
      this.cadena_impuestos+='rtp';
      this.contador+=1;
    }
    if(this.ish){
      if (this.contador!=0){
        this.cadena_impuestos+=', ';
      }
      this.cadena_impuestos+='ish';
      this.contador+=1;
    }
    if(this.isn){
      if (this.contador!=0){
        this.cadena_impuestos+=', ';
      }
      this.cadena_impuestos+='isn';
      this.contador+=1;
    }
    if(this.imss){
      if (this.contador!=0){
        this.cadena_impuestos+=', ';
      }
      this.cadena_impuestos+='imss';
      this.contador+=1;
    }
    if(this.sar){
      if (this.contador!=0){
        this.cadena_impuestos+=', ';
      }
      this.cadena_impuestos+='sar';
      this.contador+=1;
    }
    if(this.infonavit){
      if (this.contador!=0){
        this.cadena_impuestos+=', ';
      }
      this.cadena_impuestos+='infonavit';
      this.contador+=1;
    }
    console.log(this.cadena_impuestos);
    return this.cadena_impuestos;
  }
  cambiar_estado(imp){
    console.log(imp);
    if(imp){
      return false;
    }else{
      return true;
    }
  }
  agregar(){
    console.log(this.monto_impuestos);
    console.log(this.impuesto);
    this._monto_impuestoService.registrarMonto(this.monto_impuestos).subscribe(response=>{
      console.log(response);
      this.impuesto['tipo_impuesto']=response['monto_impuesto']['_id'];
      this._impuestoService.registrarImpuesto(this.impuesto).subscribe(response=>{
          console.log(response);
      },error=>{
        console.log(<any>error);
      });
    },error=>{
      console.log(<any>error);
    });
    this.pagina='lista';
    this.getCliente(this.impuesto['id_cliente']);
  }
  impuestos_false(){
    this.iva=false;
    this.isr=false;
    this.ieps=false;
    this.ispt=false;
    this.ish=false;
    this.isn=false;
    this.rtp=false;
    this.imss=false;
    this.sar=false;
    this.infonavit=false;
  }
  activar_impuestos(lista){
    if (lista['iva']!=0){
      this.iva=true;
    }
    if (lista['isr']!=0){
      this.isr=true;
    }
    if (lista['ieps']!=0){
      this.ieps=true;
    }
    if (lista['ispt']!=0){
      this.ispt=true;
    }
    if (lista['ish']!=0){
      this.ish=true;
    }
    if (lista['isn']!=0){
      this.isn=true;
    }
    if (lista['rtp']!=0){
      this.rtp=true;
    }
    if (lista['imss']!=0){
      this.imss=true;
    }
    if (lista['sar']!=0){
      this.sar=true;
    }
    if (lista['infonavit']!=0){
      this.infonavit=true;
    }

  }
  Burbuja(){
    for(let i=0;i<this.impuestos_totales.length;i++){
      for(let j=0;j<this.impuestos_totales.length-1;j++){
        if(parseInt(this.impuestos_totales[j]['fecha_pago'].substring(0,4)) < parseInt(this.impuestos_totales[j+1]['fecha_pago'].substring(0,4))){
          let aux = this.impuestos_totales[j];
          this.impuestos_totales[j]=this.impuestos_totales[j+1];
          this.impuestos_totales[j+1]=aux;
        }else{
          if(parseInt(this.impuestos_totales[j]['fecha_pago'].substring(0,4)) == parseInt(this.impuestos_totales[j+1]['fecha_pago'].substring(0,4))){
            if(parseInt(this.impuestos_totales[j]['fecha_pago'].substring(5,7)) < parseInt(this.impuestos_totales[j+1]['fecha_pago'].substring(5,7))){
              let aux = this.impuestos_totales[j];
              this.impuestos_totales[j]=this.impuestos_totales[j+1];
              this.impuestos_totales[j+1]=aux;
            }
          }
        }
      }
    }
  }
  prueba(id){
    console.log(id);
    this._impuestoService.getImpuesto_por_id(id).subscribe(response=>{
      this.pagina='pen';
      this.impuesto=response['impuesto'][0];
      console.log(this.impuesto);
    },error=>{
      console.log(<any>error);
    });
  }
  confirmar_pendiente(){
    this._impuestoService.updateImpuesto(this.impuesto).subscribe(response=>{
      console.log(response);
    },error=>{
      console.log(<any>error);
    });
    this.getCliente(this.cliente._id);
  }
  registro_pendiente(Form){
    this.pagina='confirmar';
  } 
  eliminar_impuesto(id,imp,opcion){
    this.impuesto=JSON.parse(JSON.stringify(imp));
    console.log(opcion);
    switch (opcion){
      case ('pendiente'):{
        console.log('entra');
        this.impuesto=imp;
        this.pagina='eliminar';
        break;
      }default:{
        this._impuestoService.deleteImpuesto(id).subscribe(response=>{
          console.log(response);
          this._monto_impuestoService.deleteMonto(response['impuesto']['tipo_impuesto']).subscribe(response=>{
            console.log(response);
            this.ngOnInit();
          },error=>{
            console.log(<any>error);
          });
        },error=>{
          console.log(<any>error);
        });
        break;
      }
    }
  }
  reiniciar(){
    this.isr=false;
    this.iva=false;
    this.ieps=false;
    this.ispt=false;
    this.rtp=false;
    this.ish=false;
    this.isn=false;
    this.imss=false;
    this.sar=false;
    this.infonavit=false;
    this.monto_impuestos.isr=0;
    this.monto_impuestos.iva=0;
    this.monto_impuestos.ieps=0;
    this.monto_impuestos.ispt=0;
    this.monto_impuestos.rtp=0;
    this.monto_impuestos.ish=0;
    this.monto_impuestos.isn=0;
    this.monto_impuestos.imss=0;
    this.monto_impuestos.sar=0;
    this.monto_impuestos.infonavit=0;
    this.impuesto.fecha_pago='';
    this.impuesto.fecha_presentacion='';
    this.impuesto.cantidad=0;
    this.impuesto.folio_pago='';
    this.impuesto.folio_presentacion='';
    this.impuesto.tipo_impuesto='';
    console.log("reinicia");
  }
}
