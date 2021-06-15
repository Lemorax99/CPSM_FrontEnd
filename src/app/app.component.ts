import { Component,OnInit } from '@angular/core';
import {Usuarios} from './models/usuarios';
import {UsuarioService} from './service/usuarios.service';
import { Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioService]
})
export class AppComponent implements OnInit{
  title = 'Oficina';
  public login:boolean;
  public usuario:Usuarios;
  public save_usuario:Usuarios;
  public pagina:number;
  public password:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _usuarioService: UsuarioService
    ){
    this.login=false;
    
    this.usuario=new Usuarios('','','','','');
    this.save_usuario= new Usuarios('','','','','');
    this.pagina=1;
    this.password='';
  }
  ngOnInit(){
    //Borrar this.login=true; Para seguir trabajando-----------------------------------------------------------------
    //this.login=true;
    if (typeof(Storage)!=='undefined'){
      console.log("Local storage disponibles");
    }else{
      console.log("Local storage no disponible");
    }
  	if(JSON.parse(localStorage.getItem('usuario'))){
      localStorage.clear()    
    }
    this.buscar();
  }
  logear(form){
    console.log(this.usuario);
    this._usuarioService.logearUsuario(this.usuario).subscribe(
      response=>{
        this.save_usuario=response.usuario;
        localStorage.setItem('usuario',JSON.stringify(this.save_usuario));
        this.login=true;
        this._router.navigate(['/home']);
        },error=>{
          console.log(<any>error);
        }
    )
  }
  buscar(){
    this._usuarioService.getUsuarios().subscribe(
      response=>{
        console.log(response);
        if (response['usuarios'].length==0){
          this.pagina=2;
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  registrar(Form){
    this.usuario['tipo']='administrador';
    this._usuarioService.registrarUsuario(this.usuario).subscribe(
      response=>{
        console.log(response);
        this.pagina=0;
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
}
