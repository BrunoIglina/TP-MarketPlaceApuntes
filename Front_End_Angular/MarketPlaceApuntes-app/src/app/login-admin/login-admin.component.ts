import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  loginData = { usuario: '', password: '' };

  constructor(private router: Router, private loginService: LoginService) {}

  validarInicio(): void {
    console.log('Datos de login enviados:', this.loginData);  // Verifica los datos antes de enviarlos al servicio

    this.loginService.loginAdmin(this.loginData.usuario, this.loginData.password).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);  // Verifica la respuesta exitosa del servidor
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('admin', JSON.stringify(response.admin));
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error en la autenticación:', error);  // Verifica el error si ocurre
        Swal.fire({
          title: 'CREDENCIALES DE ACCESO INCORRECTAS',
          text: "Ingresa usuario y contraseña nuevamente",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }

  navigateToUserLogin(): void {
    this.router.navigate(['/login']);
  }
}
