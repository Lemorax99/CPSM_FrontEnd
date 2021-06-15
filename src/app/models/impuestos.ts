export class Impuestos{
	constructor(
		public _id:string,
		public id_cliente:string,
		public folio_presentacion:string,
		public fecha_presentacion:string,
		public fecha_pago:string,
		public folio_pago:string,
		public tipo_impuesto:string,
		public cantidad:number
		){}
}