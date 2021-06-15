export class Monto_mostrar{
    constructor(
        public folio_pago:string,
        public fecha_pago:string,
        public folio_presentacion:string,
        public fecha_presentacion:string,
        public impuestos:string,
        public cantidad:number,
        public id:string
    ){}
}