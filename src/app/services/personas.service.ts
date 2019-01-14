import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
	constructor() { }

	getPersona(id) {
		return new Promise ( (resolve, reject) => {
			let personas = this.getPersonas();
			var persona = personas.find(obj => {
			  return obj.id === id
			})
			resolve(persona as Persona);
	    });
	}

	getPersonas() {
		let personas = JSON.parse(localStorage.getItem('personas'));
		if(personas == 'undefined' || personas == null){
			personas = personas;
		}

		return personas as Array<Persona>;
	}

	getNextID() {
		let MaxID = 0;
		let personas = this.getPersonas();

		if(personas.length > 0){
			MaxID = Math.max.apply(Math,personas.map(function(o){return o.id;}))
		}
		MaxID++;
		return MaxID;
	}

	addPersonaStorage(persona:Persona) {
		return new Promise ( (resolve, reject) => {
			persona.id = this.getNextID();
			persona.nbcompleto = persona.nombre + " " + persona.apaterno;

			if(persona.amaterno)
				persona.nbcompleto += " " + persona.amaterno.toString();
			
			persona.nbcompleto = persona.nbcompleto.trim();
			let personas = this.getPersonas();

			personas.push(persona);
			localStorage.setItem('personas', JSON.stringify(personas));
			resolve();
	    });
	}

	editPersonaStorage(persona:Persona) {
		return new Promise ( (resolve, reject) => {
			var personas = this.getPersonas();
			personas.forEach(function (obj) {
			    if(obj.id === persona.id){
			    	obj.nombre = persona.nombre;
					obj.apaterno = persona.apaterno;
					obj.amaterno = persona.amaterno;
					obj.nbcompleto = persona.nombre + " " + persona.apaterno + " " + persona.amaterno;
					obj.nbcompleto = obj.nbcompleto.trim();
					obj.telefono1 = persona.telefono1;
					obj.telefono2 = persona.telefono2;
					obj.calle = persona.calle;
					obj.colonia = persona.colonia;
					obj.email = persona.email;
					obj.tipo = persona.tipo;
					obj.fhUltimoContacto = persona.fhUltimoContacto;
			    	return false;
			    }
			});
			localStorage.setItem('personas', JSON.stringify(personas));
			resolve();
	    });
	}
	
	deletePersonaStorage(id){
		return new Promise ( (resolve, reject) => {
			let personas = this.getPersonas();
		    for (var i = personas.length - 1; i >= 0; --i) {
			    if (personas[i].id == parseInt(id)) {
			        personas.splice(i,1);
			        break;
			    }
			}

			localStorage.setItem('personas', JSON.stringify(personas));
			resolve(this.getPersonas());
	    });
	}

	InicializarStoragePersonas() {
		localStorage.setItem('personas', JSON.stringify(environment.personas));
	}
}
