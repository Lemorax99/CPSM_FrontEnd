export class Pagos{
	constructor(
		public _id:string,
		public id_cliente:string,
		public folio:string,
		public fecha_pago:string,
		public mes:string,
		public year:number,
		public cantidad:number,
		public pago_mes:number
		){}
}