import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(
  private _usrService: UsuarioService,
  private route: Router) { }

  canActivate() {
    if ( this._usrService.getUsuario() ) {
      this.route.navigate(['/home']);
      return false;
    } else {      
      return true;
    }
  }
}
