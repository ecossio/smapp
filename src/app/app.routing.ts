import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioGuardService } from './guards/usuario-guard.service';
import { LoginGuardService } from './guards/login-guard.service';

//Componentes
import { DefaultComponent } from './components/default/default.component';//Home
import { LoginComponent } from './components/login/login.component';
import { PersonaNewComponent } from './components/persona-new/persona-new.component';
import { PersonaEditComponent } from './components/persona-edit/persona-edit.component';

const appRoutes: Routes = [
	//{path: '', component: DefaultComponent},
	{path: 'home', component: DefaultComponent, canActivate: [UsuarioGuardService]},
	{path: 'new', component: PersonaNewComponent, canActivate: [UsuarioGuardService]},
	{path: 'edit/:id', component: PersonaEditComponent, canActivate: [UsuarioGuardService]},
	{path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
	{path: 'logout/:sure', component: LoginComponent},
	{path: '**', component: DefaultComponent, canActivate: [UsuarioGuardService]} //Ruta por default si una ruta dada no existe
];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);