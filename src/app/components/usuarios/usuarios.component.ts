import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import {Global} from '../../service/global';
import {Usuarios} from '../../models/usuarios';

import {UsuarioService} from '../../service/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
  public usuarios:Usuarios[];
  public usuario:Usuarios;
  public pagina:String;
  public tipos_usuario:Array<any>;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _usuarioService:UsuarioService
  ) { 
  }

  ngOnInit() {
    this.getUsuarios()
    this.usuario=new Usuarios('','','','','');
    this.tipos_usuario=['Administrador','Empleado'];
    this.pagina='principal'
  }
  getUsuarios(){
    this._usuarioService.getUsuarios().subscribe(
      response=>{
        this.usuarios=response['usuarios'];
        console.log(this.usuarios);
        this.pagina='principal';
      },error=>{
        console.log(<any>error);
      });
  }
  onSubmit(Form){
    console.log(this.usuario);
    if(this.pagina=='registrar'){
      this.Registrar_usuario();
    }else{
      this.Actualizar_usuario();
    }
  }
  Registrar_usuario(){
    this._usuarioService.registrarUsuario(this.usuario).subscribe(response=>{
      console.log(response);
    },error=>{
      console.log(<any>error);
    });
    this.getUsuarios();
  }
  Actualizar_usuario(){
    this._usuarioService.actualizarUsuario(this.usuario).subscribe(response=>{
      console.log(response);
    },error=>{
      console.log(<any>error);
    });
    this.getUsuarios();
  }
  Eliminar_usuario(){
    this._usuarioService.deleteUsuario(this.usuario._id).subscribe(response=>{
      console.log(response);
    },error=>{
      console.log(<any>error);
    });
    this.getUsuarios();
  }
}
