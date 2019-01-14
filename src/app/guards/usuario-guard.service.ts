import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuardService implements CanActivate {

  constructor(
  private _usrService: UsuarioService,
  private route: Router) { }

  canActivate() {
    if ( this._usrService.getUsuario() ) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
