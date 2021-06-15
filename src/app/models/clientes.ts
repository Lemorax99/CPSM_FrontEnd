export class Clientes{
	constructor(
		public _id:string,
		public name:string,
		public rfc:string,
		public curp:string,
		public domicilio:string,
		public telefono:string,
		public password:string,
		public actividad:string,
		public fecha_inicio:string,
		public correo:string,
		public contra_correo:string,
		public regimen:string
		){}
}