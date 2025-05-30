import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  mensaje: string = '';
  mensajeColor: string = ''; 

  iniciarSesion() {
    if (this.loginForm.valid) {
      const correo = this.loginForm.value.correo;
      const contrasenia = this.loginForm.value.contrasenia;
  
      this.usuarioService.iniciarSesion(correo, contrasenia)
        .then(usuarioAutenticado => {
          if (!usuarioAutenticado) {
            this.mensaje = 'Credenciales incorrectas';
            this.mensajeColor = 'red'; 
          } else {
            this.mensaje = 'Usuario Iniciado';
            this.mensajeColor = 'green'; 
            this.router.navigate(['/buscar']); 
          }
        })
        .catch(error => {
          console.error('Error al iniciar usuario:', error);
          this.mensaje = 'Error al iniciar usuario';
          this.mensajeColor = 'red'; 
        });
    }
  }

  irRegistro() {
    this.router.navigate(['/registro']); 
  }
}