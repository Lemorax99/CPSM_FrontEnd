import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Usuarios} from '../../models/usuarios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public usuario:Usuarios;
  constructor(
    private _route: ActivatedRoute,
  	private _router: Router
  ) {
   }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem('usuario'))){
      this._router.navigate(['/']);
    }else{
      this.usuario=JSON.parse(localStorage.getItem('usuario'));
    }
  }
  GoToUsers(pagina){
    this._router.navigate([pagina]);
  }

}

