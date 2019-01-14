import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Usuario } from '../../models/usuario'
import { UsuarioService } from '../../services/usuario.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UsuarioService]
})
export class LoginComponent implements OnInit {
	public usuario: Usuario;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _usrService: UsuarioService
	) {
		this.usuario = new Usuario(1,null,null);
	}

	ngOnInit() {
		this.logout();

		/*==================================================================
	    [ Focus Contact2 ]*/
	    $('.input100').each(function(){
	        $(this).on('blur', function(){
	            if($(this).val().toString().trim() != "") {
	                $(this).addClass('has-val');
	            }
	            else {
	                $(this).removeClass('has-val');
	            }
	        })    
	    })

	    /*==================================================================
	    [ Validate ]*/
	    var input = $('.validate-input .input100');

	    $('.validate-form').on('submit',function(){
	        var check = true;

	        for(var i=0; i<input.length; i++) {
	            if(validate(input[i]) == false){
	                showValidate(input[i]);
	                check=false;
	            }
	        }

	        return check;
	    });

	    $('.validate-form .input100').each(function(){
	        $(this).focus(function(){
	           hideValidate(this);
	        });
	    });

	    function validate (input) {
	        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
	            if($(input).val().toString().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
	                return false;
	            }
	        }
	        else {
	            if($(input).val().toString().trim() == ''){
	                return false;
	            }
	        }
	    }

	    function showValidate(input) {
	        var thisAlert = $(input).parent();

	        $(thisAlert).addClass('alert-validate');
	    }

	    function hideValidate(input) {
	        var thisAlert = $(input).parent();

	        $(thisAlert).removeClass('alert-validate');
	    }
	}

	onSubmit(form){
		if((this.usuario.username != null && this.usuario.password != null) && (this.usuario.username != '' && this.usuario.password != '')){
			this._usrService.login( this.usuario ).then( 
	        	() => {this._router.navigate(['/home']);},
				() => {
					console.log("Usuario o contraseña incorrecta!");
					this.usuario = new Usuario(1,null,null);
				},
	        );
		} else{
			if(this.usuario.username == null || this.usuario.username == ''){
				$("#username").focus();
			} else if(this.usuario.password == null || this.usuario.password == ''){
				$("#pass").focus();
			}
		}
	}

	logout(){
		this._route.params.subscribe(params => {
			let logout = +params['sure'];
			if(logout == 1){
				localStorage.removeItem('usuario');
				//localStorage.removeItem('personas');
				
				//Redireccionar
				this._router.navigate(['login'])
			}
		});
	}
}
