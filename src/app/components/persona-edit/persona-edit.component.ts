import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PersonasService } from '../../services/personas.service';
import { Persona } from '../../models/persona'

@Component({
  selector: 'app-persona-edit',
  templateUrl: '../persona-new/persona-new.component.html',
  styleUrls: ['./persona-edit.component.css']
})
export class PersonaEditComponent implements OnInit {
	public persona: Persona;
	public EmailOk: Boolean;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _personaService: PersonasService
	) {
		this.EmailOk = true;
	}

	ngOnInit() {
		//recoger lo que llega por la url
		this._route.params.subscribe(params => {
			let id = +params['id'];
			this.getPersona(id);
		});
	}

	getPersona(id){
		//Obtener la persona
		this._personaService.getPersona( id ).then( 
        	(result) => {
        		this.persona = result as Persona;
        	}
        );
	}

	validaEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

	onSubmit(form){
		if (this.persona.email.toString().trim().length > 0 && !this.validaEmail(this.persona.email)) {
			this.EmailOk = false;
            $('#email').focus();
            return false;
        } else
        	this.EmailOk = true;

		this._personaService.editPersonaStorage( this.persona ).then( 
        	() => {this._router.navigate(['/home']);}
        );
	}
}
