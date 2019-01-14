export class Persona {
	constructor(
		public id: number,
		public nombre: string,
		public apaterno: string,
		public amaterno: string,
		public nbcompleto: string,
		public telefono1: string,
		public telefono2: string,
		public calle: string,
		public colonia: string,
		public email: string,
		public tipo: string,
		public fhUltimoContacto: Date,
	) {}
}