'use strict'
import {ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import {AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ListaComponent} from './components/lista/lista.component';
import {RegistrarComponent} from './components/registrar/registrar.component';
import {ProcesoComponent} from './components/proceso/proceso.component';
import {PagarComponent} from './components/pagar/pagar.component';
import {ActualizarComponent} from './components/actualizar/actualizar.component';
import {PagosComponent} from './components/pagos/pagos.component';
import {VolverComponent} from './components/volver/volver.component';
import {ImpuestosComponent} from './components/impuestos/impuestos.component';
import {HomeComponent} from './components/home/home.component';
import {UsuariosComponent} from './components/usuarios/usuarios.component';


const appRoutes: Routes =[
	{path:'lista',component: ListaComponent},
	{path:'registrar',component: RegistrarComponent},
	{path:'proceso/:id',component:ProcesoComponent},
	{path:'pagar/:id',component:PagarComponent},
	{path:'editar/:id', component: ActualizarComponent},
	{path:'volver',component: VolverComponent},
	{path:'pagos/:id',component: PagosComponent},
	{path:'impuestos/:id',component: ImpuestosComponent},
	{path:'home',component: HomeComponent},
	{path:'usuarios',component: UsuariosComponent}
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
