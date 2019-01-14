import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
	public usuario: Usuario;

	constructor() { }

	login ( user: Usuario ) {
	    return new Promise ( (resolve, reject) => {
			if(user.username.toString().toLowerCase() === 'admin' && user.password === '123456'){
				this.usuario = user;
				this.guardarStorage();
				resolve();
			} else {
				reject();
			}
	    });
	  }

	getUsuario() {
		let usuario = JSON.parse(localStorage.getItem('usuario'));
		
		if(usuario != 'undefined' && usuario != null){
			this.usuario = usuario;
		} else this.usuario = null;

		return this.usuario;
	}

	guardarStorage() {
		localStorage.setItem('usuario', JSON.stringify(this.usuario));
	}
}
