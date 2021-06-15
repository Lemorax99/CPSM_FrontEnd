import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import{ routing, appRoutingProviders} from './app.routing';

import { ListaComponent } from './components/lista/lista.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ProcesoComponent } from './components/proceso/proceso.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { PagarComponent } from './components/pagar/pagar.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { VolverComponent } from './components/volver/volver.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ImpuestosComponent } from './components/impuestos/impuestos.component';
import { HomeComponent } from './components/home/home.component';

/*Importar el hash location
import {HashLocationStrategy,LocationStrategy} from '@angular/common';*/

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    ProcesoComponent,
    RegistrarComponent,
    PagarComponent,
    ActualizarComponent,
    PagosComponent,
    VolverComponent,
    UsuariosComponent,
    ImpuestosComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
  	FormsModule
  ],
  providers: [
  appRoutingProviders
  /*{provide: LocationStrategy, useClass: HashLocationStrategy}*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
