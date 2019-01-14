import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { Persona } from '../../models/persona';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  public personas: Array<Persona>;
  public searchString: string;
  
  constructor(
  	private _personaService: PersonasService
  ) { }

  ngOnInit() {
    let personas = this._personaService.getPersonas();
    
  	if(personas == null || personas == undefined){
  		this._personaService.InicializarStoragePersonas();
      this.personas = this._personaService.getPersonas();
    } else{
      this.personas = personas;
    }
  }

  eliminar (persona:Persona){
    this._personaService.deletePersonaStorage( persona.id ).then( 
      (result) => {this.personas = result as Array<Persona>;/**/}
    );
  }
}
