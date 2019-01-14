import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PersonasService } from '../../services/personas.service';
import { Persona } from '../../models/persona';


@Component({
  selector: 'app-persona-new',
  templateUrl: './persona-new.component.html',
  styleUrls: ['./persona-new.component.css']
})
export class PersonaNewComponent implements OnInit {
	public persona: Persona;
	public EmailOk: Boolean;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _personaService: PersonasService
	) {
		this.persona = new Persona(1,null,null,null,null,null,null,null,null,null,"X",null);
		this.EmailOk = true;
	}

	ngOnInit() {
	}

	validaEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

	onSubmit(form){
		if (this.persona.email && this.persona.email.toString().trim().length > 0 && !this.validaEmail(this.persona.email)) {
			this.EmailOk = false;
            $('#email').focus();
            return false;
        } else
        	this.EmailOk = true;

        this._personaService.addPersonaStorage( this.persona ).then( 
        	() => {this._router.navigate(['/home']);}
        );
	}
}
